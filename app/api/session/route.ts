import { getSession } from '@/utils/session'
import { NextResponse } from 'next/server'

export async function GET() {
  try {
    // Attempt to retrieve the session
    const session = await getSession()

    if (session) {
      // If session exists, return authenticated response
      return NextResponse.json({ isAuthenticated: true })
    } else {
      // If no session exists, return 401 Unauthorized
      return NextResponse.json({ isAuthenticated: false }, { status: 401 })
    }
  } catch (error) {
    // If there is an error during session retrieval, handle it
    console.error('Error retrieving session:', error)
    return NextResponse.json({ error: 'Failed to retrieve session' }, { status: 500 })
  }
}
