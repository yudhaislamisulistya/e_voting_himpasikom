'use client'

import { signOut } from 'next-auth/react'

export default function Vote() {
  return (
    <div>
      <p className={'bg-green-600 text-sm'}>
        Silakan pilih salah satu kandidat berikut
      </p>
      <button onClick={() => signOut()}>SignOut</button>
    </div>
  )
}
