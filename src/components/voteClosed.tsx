'use client'

import { signOut } from 'next-auth/react'
import Image from 'next/image'

interface VoteClosedProps {
  isLoggedIn: boolean
  closeStatus: number
  openTime?: Date
}

export default function VoteClosed({
  closeStatus,
  isLoggedIn,
  openTime,
}: VoteClosedProps) {
  return (
    <div className='flex-1 flex flex-col justify-center items-center'>
      <div className='w-96 max-[540px]:w-64 flex flex-col items-center p-8 shadow-lg rounded-lg gap-4'>
        <Image
          src='/assets/closed.jpg'
          alt='Vote ditutup'
          width={240}
          height={100}
          suppressHydrationWarning
        />
        <p className='text-sm font-semibold text-center leading-5'>
          {closeStatus < 0 ? 'Voting belum dibuka' : 'Voting telah berakhir'}
        </p>
        <span className='text-xs text-center leading-5 text-gray-500'>
          {closeStatus < 0 ? (
            <>
              Periode voting akan dibuka pada waktu{' '}
              {openTime?.toLocaleTimeString() ?? 'yang telah ditentukan'}.
              Silahkan kembali saat voting sudah dibuka. &#128522;
            </>
          ) : (
            <>
              Nantikan kegiatan HIMPASIKOM lainnya di waktu yang akan datang.
              &#128522;
            </>
          )}
        </span>
        {isLoggedIn && (
          <button
            className='px-4 py-2 bg-red-600 text-white rounded-md'
            onClick={() => signOut()}
          >
            Keluar
          </button>
        )}
      </div>
    </div>
  )
}
