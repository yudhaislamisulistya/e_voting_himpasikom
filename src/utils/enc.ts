import { createCipheriv, createDecipheriv } from 'crypto'

const KEY = Buffer.from(process.env.VOTE_SECRET ?? 'r4Ha5iiiA', 'hex')
const IV = Buffer.from(process.env.IV ?? '123456', 'hex')

export const encrypt = (value: string): string => {
  const cipher = createCipheriv('aes-256-cbc', KEY, IV)
  let encrypted = cipher.update(value, 'utf8', 'hex')
  encrypted += cipher.final('hex')
  return encrypted
}

export const decrypt = (value: string): string => {
  const decipher = createDecipheriv('aes-256-cbc', KEY, IV)
  let decrypted = decipher.update(value, 'hex', 'utf8')
  decrypted += decipher.final('utf8')
  return decrypted
}
