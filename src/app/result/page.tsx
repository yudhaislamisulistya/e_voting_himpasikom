import VoteResult from '@/components/voteResult'
import { getAllVotes, getCandidates } from '@/utils/db'
import { authOptions } from '../api/auth/[...nextauth]/config'
import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'

const TRUSTED_PERSON_LIST = ['waffiqmaaroja', 'fadillahsiva']

export default async function ResultPage() {
  const session = await getServerSession(authOptions)
  if (!session) {
    redirect('/')
  }

  const who = session.user.email.split('@')[0]
  console.log(who)
  if (!TRUSTED_PERSON_LIST.includes(who)) {
    redirect('/')
  }

  const candidates = (await getCandidates()) ?? []
  const votes = await getAllVotes()

  const voteData = candidates.map((c) => ({
    name: c.name,
    avatar: c.avatar_id,
    votes: votes.filter((v) => v.choice === c.id),
  }))

  return (
    <main className='min-h-screen flex flex-col'>
      <VoteResult result={voteData} />
    </main>
  )
}
