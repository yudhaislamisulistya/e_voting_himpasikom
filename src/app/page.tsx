import SignIn from '@/components/signIn'
import MyToast from '@/components/toast'
import Vote from '@/components/vote'
import { SearchParams } from '@/types/param'
import { getServerSession } from 'next-auth'
import { authOptions } from './api/auth/[...nextauth]/config'
import { CandidateType, checkVoteExists, getCandidates } from '@/utils/db'
import VoteDone from '@/components/voteDone'

export default async function Home({ searchParams }: SearchParams) {
  const session = await getServerSession(authOptions)

  const error = (await searchParams).error
  let candidates: CandidateType[] = []
  let isDone = false

  if (session) {
    candidates = (await getCandidates()) ?? []
    isDone = await checkVoteExists(session.user.email)
  }

  return (
    <main className='min-h-screen flex flex-col'>
      <MyToast error={Array.isArray(error) ? undefined : error} />
      <h1 className='bg-indigo-600 py-4 px-6 text-2xl font-bold text-white text-center'>
        Pemilihan Ketua HIMPASIKOM UGM Periode 2025/2025
      </h1>
      {!session && <SignIn />}
      {session && !isDone && (
        <Vote user={session.user} candidates={candidates} />
      )}
      {session && isDone && <VoteDone />}
    </main>
  )
}
