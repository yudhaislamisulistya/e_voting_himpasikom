'use client'
import Image from 'next/image'
import { useState } from 'react'

interface VoteResultProps {
  result: {
    name: string
    avatar: string
    votes: {
      choice: string
      email: string
    }[]
  }[]
}

const IMAGE_BASE_URL =
  (process.env.SUPABASE_URL ?? '') + '/storage/v1/object/public/avatars/'

export default function VoteResult({ result }: VoteResultProps) {
  const [list, setList] = useState<string[]>([])
  const [reveal, setReveal] = useState(false)

  return (
    <div className='w-full flex flex-col items-center py-4'>
      <button
        className={
          'text-white px-4 py-2 rounded-md ' +
          (reveal ? 'bg-red-600' : 'bg-green-600')
        }
        onClick={() => setReveal((r) => !r)}
      >
        {reveal ? 'Unreveal' : 'Reveal'}
      </button>
      <div className='flex flex-row justify-center flex-wrap  gap-6 m-6 lg:m-10'>
        {result.map((candidate) => (
          <div
            key={candidate.name}
            className='w-40 h-80 flex flex-col items-center justify-between px-4 py-6 shadow-lg rounded-lg transition-all cursor-pointer'
            onClick={() => setList(candidate.votes.map((v) => v.email))}
          >
            <div className='flex flex-col items-center'>
              <Image
                src={IMAGE_BASE_URL + candidate.avatar}
                alt={candidate.name}
                width={100}
                height={100}
                className='rounded-full'
                suppressHydrationWarning
              />
              <div className='mt-5 text-center'>
                <span className='font-medium text-sm'>{candidate.name}</span>
              </div>
            </div>
            <div className='flex flex-col items-center'>
              <h3 className='font-bold text-4xl text-blue-700'>
                {reveal ? candidate.votes.length.toString() : '??'}
              </h3>
              <span className='text-sm text-slate-500'>suara</span>
            </div>
          </div>
        ))}
      </div>
      <div className='flex flex-row gap-6 px-12 max-w-96 flex-wrap'>
        {list.map((v) => (
          <span key={v}>{v}</span>
        ))}
      </div>
    </div>
  )
}
