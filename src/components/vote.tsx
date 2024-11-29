'use client'
import { MyUser } from '@/types/next-auth'
import { CandidateType } from '@/utils/db'
import Image from 'next/image'
import { redirect } from 'next/navigation'
import { useState } from 'react'
import { toast } from 'react-toastify'
import CandidateDesc from './candidateDesc'

const IMAGE_BASE_URL =
  (process.env.SUPABASE_URL ?? '') + '/storage/v1/object/public/avatars/'

interface VoteProps {
  user: MyUser
  candidates: CandidateType[]
}

export default function Vote({ user, candidates }: VoteProps) {
  const [selectedId, setSelectedId] = useState<string | null>()
  const isSelected = selectedId !== undefined
  const selected = candidates.find((c) => c.id === selectedId)

  const selectedName = selected?.name
  const selectedVisi = selected?.vision
  const selectedMisi = selected?.mission

  const handleSubmitVote = async () => {
    if (!selectedId) {
      toast.error('Silakan pilih salah satu kandidat sebelum submit.')
      return
    }
    const response = await fetch('/api/vote', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ ...user, choice: selectedId }),
    })
    const json = await response.json()
    const { error } = JSON.parse(json)

    if (error) toast.error(error)
    else {
      toast.success('Vote berhasil disubmit')
      redirect('/')
    }
  }

  return (
    <div className='flex-1 flex flex-col justify-start items-center'>
      <p
        className={
          'w-screen px-16 text-sm max-sm:px-8 py-4 text-center transition-all ' +
          (isSelected ? 'bg-green-600 text-white' : 'bg-gray-200')
        }
      >
        {isSelected ? (
          <>
            Anda telah memilih <span className='italic'>{selectedName}</span>.{' '}
            <button
              className='font-semibold underline'
              onClick={handleSubmitVote}
            >
              Submit?
            </button>
          </>
        ) : (
          <>Silakan pilih salah satu kandidat berikut</>
        )}
      </p>
      <div className='flex flex-row justify-center flex-wrap max-w-3xl xl:max-w-5xl gap-6 m-6 lg:m-10'>
        {candidates.map((candidate) => (
          <div
            key={candidate.id}
            className={
              'w-40 flex flex-col items-center px-4 py-6 shadow-lg rounded-lg transition-all cursor-pointer ' +
              (selectedId === candidate.id
                ? 'bg-indigo-600 text-white'
                : 'hover:shadow-none hover:border-2 hover:border-indigo-600')
            }
            onClick={() => setSelectedId(candidate.id)}
          >
            <Image
              src={IMAGE_BASE_URL + candidate.avatar_id}
              alt={candidate.name}
              width={100}
              height={100}
              className='rounded-full'
              suppressHydrationWarning
            />
            <div className='mt-5 text-center'>
              <span className='font-medium'>{candidate.name}</span>
            </div>
          </div>
        ))}
      </div>
      <CandidateDesc visi={selectedVisi} misi={selectedMisi as string[]} />
    </div>
  )
}
