import { Database, Tables } from '@/types/db'
import { createClient } from '@supabase/supabase-js'
import { encrypt } from './enc'

const supabaseUrl = process.env.SUPABASE_URL ?? ''
const supabaseKey = process.env.SUPABASE_KEY ?? ''
const supabase = createClient<Database>(supabaseUrl, supabaseKey)

export type CandidateType = Tables<'candidates'>

export const getCandidates = async () => {
  const { data, error } = await supabase.from('candidates').select()
  return data
}

export const makeVote = async (
  enc: string,
  trusted: boolean,
  choice: string
) => {
  const { error } = await supabase
    .from('votings')
    .insert({ email_enc: enc, trusted, choice_id: choice })
  let message: string | undefined = undefined
  if (error?.code === '23505') message = 'Email sudah digunakan untuk voting.'
  else if (error) message = 'Terjadi kesalahan, silakan coba lagi.'

  return message
}

export const checkVoteExists = async (email: string) => {
  const enc = encrypt(email)
  const { data } = await supabase
    .from('votings')
    .select('id')
    .eq('email_enc', enc)
  return (data?.length ?? 0) > 0
}
