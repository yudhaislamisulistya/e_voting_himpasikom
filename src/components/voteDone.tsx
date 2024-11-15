'use client'

import { signOut } from 'next-auth/react'

export default function VoteDone() {
  return (
    <div className='flex-1 flex flex-col justify-center items-center'>
      <div className='w-96 max-[540px]:w-64 flex flex-col p-8 shadow-lg rounded-lg gap-4'>
        <p className='text-sm font-semibold text-center leading-5'>
          Terima kasih atas partisipasinya dalam pemilihan Ketua Himpasikom UGM.
        </p>
        <span className='text-xs text-center leading-5 text-gray-500'>
          Apabila bukan anda yang melakukan voting, silahkan hubungi admin
        </span>
        <button
          className='px-4 py-2 bg-red-600 text-white rounded-md'
          onClick={() => signOut()}
        >
          Keluar
        </button>
      </div>
    </div>
  )
}
