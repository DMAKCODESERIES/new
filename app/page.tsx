// 'use client'


import TelegramAuth from '@/components/telegramAuth';
import { getSession } from '@/utils/session';
import WebApp from '@twa-dev/sdk'
// import { useEffect, useState } from 'react'

// Define the interface for user data
interface UserData {
  id: number;
  first_name: string;
  last_name?: string;
  username?: string;
  language_code: string;
  is_premium?: boolean;
}

export default async function Home() {
  const session = await getSession()
  // const [userData, setUserData] = useState<UserData | null>(null)

  // useEffect(() => {
  //   if (WebApp.initDataUnsafe.user) {
  //     setUserData(WebApp.initDataUnsafe.user as UserData)
  //   }
  // }, [])

  return (
    <main className="p-4 items-center bg-red">
          <h1 className="text-4xl font-bold mb-8">Jwt Authentication for Telegram Mini Apps</h1>
      <pre>{JSON.stringify(session, null, 2)}</pre>
      <TelegramAuth/>
      {/* {userData ? (
        <>
          <h1 className="text-2xl font-bold mb-4">User Data</h1>
          <ul>
            <li>ID: {userData.id}</li>
            <li>First Name: {userData.first_name}</li>
            <li>Last Name: {userData.last_name || 'N/A'}</li>
            <li>Username: {userData.username || 'N/A'}</li>
            <li>Language Code: {userData.language_code}</li>
            <li>Is Premium: {userData.is_premium ? 'Yes' : 'No'}</li>
          </ul>
        </>
      ) : (
        <div>Loading...</div>
      )} */}
    </main>
  )
}
