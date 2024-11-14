import SignIn from '@/components/signIn'
import MyToast from '@/components/toast'
import Vote from '@/components/vote'
import { SearchParams } from '@/types/param'
import { getServerSession } from 'next-auth'
import { authOptions } from './api/auth/[...nextauth]/config'

export default async function Home({ searchParams }: SearchParams) {
  const session = await getServerSession(authOptions)
  console.log(session?.user)

  const error = (await searchParams).error

  return (
    <main className='min-h-screen flex flex-col'>
      <MyToast error={Array.isArray(error) ? undefined : error} />
      <h1 className='bg-indigo-600 py-4 px-6 text-2xl font-bold text-white text-center'>
        Pemilihan Ketua HIMPASIKOM UGM Periode 2025/2025
      </h1>
      {!session && <SignIn />}
      {session && <Vote />}
    </main>
  )
}
