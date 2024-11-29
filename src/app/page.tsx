import SignIn from '@/components/signIn'
import MyToast from '@/components/toast'
import Vote from '@/components/vote'
import { SearchParams } from '@/types/param'
import { getServerSession } from 'next-auth'
import { authOptions } from './api/auth/[...nextauth]/config'
import {
  CandidateType,
  checkVoteExists,
  getCandidates,
  getStartEndDate,
} from '@/utils/db'
import VoteDone from '@/components/voteDone'
import VoteClosed from '@/components/voteClosed'
import { isFuture, isPast } from '@/utils/date'

export default async function Home({ searchParams }: SearchParams) {
  const session = await getServerSession(authOptions)
  const { startDate, endDate } = await getStartEndDate()

  const isInPast = isPast(startDate)
  const isInFuture = isFuture(endDate)

  let closeStatus = 1
  if (!startDate && !endDate) closeStatus = 1
  else if (!endDate) closeStatus = isInPast ? 0 : -1
  else if (!startDate) closeStatus = isInFuture ? 0 : 1
  else {
    if (isInPast && isInFuture) closeStatus = 0
    else if (isInFuture) closeStatus = -1
    else closeStatus = 1
  }

  const error = (await searchParams).error
  let candidates: CandidateType[] = []
  let isDone = false
  const isClosed = closeStatus !== 0

  if (!isClosed && session) {
    candidates = (await getCandidates()) ?? []
    isDone = await checkVoteExists(session.user.email)
  }

  return (
    <main className='min-h-screen flex flex-col'>
      <MyToast error={Array.isArray(error) ? undefined : error} />
      <h1 className='bg-indigo-600 py-4 px-6 text-2xl font-bold text-white text-center'>
        Pemilihan Ketua HIMPASIKOM UGM Periode 2025/2025
      </h1>
      {isClosed && (
        <VoteClosed
          closeStatus={closeStatus}
          isLoggedIn={!!session}
          openTime={startDate}
        />
      )}
      {!isClosed && !session && <SignIn />}
      {!isClosed && session && !isDone && (
        <Vote user={session.user} candidates={candidates} />
      )}
      {!isClosed && session && isDone && <VoteDone />}
    </main>
  )
}
