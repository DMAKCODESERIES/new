import { jwtVerify, SignJWT } from 'jose'
import { cookies } from 'next/headers'
import { NextRequest, NextResponse } from 'next/server'

const key = new TextEncoder().encode(process.env.JWT_SECRET)

export const SESSION_DURATION = 60 * 60 * 1000 // 1 hour

// Function to create a new JWT
export async function encrypt(payload: any) {
    try {
        return await new SignJWT(payload)
            .setProtectedHeader({ alg: "HS256" })
            .setIssuedAt()
            .setExpirationTime("1 hour")
            .sign(key)
    } catch (error) {
        console.error("Error encrypting payload", error)
        throw new Error("Could not encrypt session")
    }
}

// Function to decrypt the JWT
export async function decrypt(input: string): Promise<any> {
    try {
        const { payload } = await jwtVerify(input, key, {
            algorithms: ["HS256"],
        })
        return payload
    } catch (error) {
        console.error("Error decrypting JWT", error)
        throw new Error("Invalid or expired session")
    }
}

// Function to get the current session
export async function getSession() {
    try {
        const session = cookies().get("session")?.value
        console.log("Session value in getSession", session)
        if (!session) return null
        return await decrypt(session)
    } catch (error) {
        console.error("Error getting session", error)
        return null
    }
}

// Function to update the session (refresh the expiry time)
export async function updateSession(request: NextRequest) {
    try {
        const session = request.cookies.get("session")?.value
        if (!session) return NextResponse.next()

        // Decrypt and parse the current session
        const parsed = await decrypt(session)
        
        // Update the session expiry time
        parsed.expires = new Date(Date.now() + SESSION_DURATION)

        // Create a response object to set the updated session cookie
        const res = NextResponse.next()
        res.cookies.set({
            name: "session",
            value: await encrypt(parsed),
            httpOnly: true,
            expires: parsed.expires,
        })

        return res
    } catch (error) {
        console.error("Error updating session", error)
        return NextResponse.next() // Proceed with the request, but don't update the session
    }
}
