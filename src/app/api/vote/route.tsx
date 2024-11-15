import { makeVote } from '@/utils/db'
import { encrypt } from '@/utils/enc'
import { NextRequest, NextResponse } from 'next/server'

export const POST = async (req: NextRequest) => {
  const { email, trusted, choice } = await req.json()
  const encEmail = encrypt(email)
  const error = await makeVote(encEmail, trusted, choice)

  const response = NextResponse.json(JSON.stringify({ error }))
  return response
}
