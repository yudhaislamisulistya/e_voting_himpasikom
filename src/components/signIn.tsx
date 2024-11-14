'use client'
import { signIn } from 'next-auth/react'
import { MouseEventHandler, useRef } from 'react'
import { FcGoogle } from 'react-icons/fc'
import { FiLogIn } from 'react-icons/fi'

const messages = [
  <>
    Merupakan <b>mahasiswa aktif</b> MKOM UGM
  </>,
  <>
    Voting online hanya dapat di isi oleh mahasiswa MKOM UGM yang{' '}
    <b>tidak bisa hadir</b> di tempat pemilihan
  </>,
  <>
    <b>Satu email</b> (email UGM) hanya bisa melakukan <b>voting sekali</b>
  </>,
]

export default function SignIn() {
  const emailRef = useRef<HTMLInputElement>(null)

  const handleEmailSubmit: MouseEventHandler<HTMLButtonElement> = (e) => {
    e.preventDefault()
    const email = emailRef.current?.value
    if (!email || email.length <= 0) return
    signIn('credentials', {
      email: email + '@mail.ugm.ac.id',
      callbackUrl: '/',
    })
  }

  return (
    <div className='flex-1 flex flex-col justify-start'>
      <div className='flex bg-gray-100 px-16 max-sm:px-8 py-8 items-center justify-center'>
        <ul className='flex flex-col gap-3 text-justify leading-4 md:max-w-xl'>
          {messages.map((msg, i) => (
            <li
              key={i}
              className='font-[500] text-sm text-gray-500 flex flex-row gap-2'
            >
              <span>&#8227;</span>
              <span>{msg}</span>
            </li>
          ))}
        </ul>
      </div>
      <div className='flex-1 flex flex-row items-center justify-center gap-8 max-[840px]:flex-col'>
        <button
          className='h-10 px-4 text-sm flex flex-row items-center gap-3 border-2 rounded-md'
          onClick={() => signIn('google')}
        >
          <FcGoogle className='text-lg' />
          {/* <Image src='/images/mail.png' alt='mail' height={80} width={80} /> */}
          <span>Masuk dengan Google</span>
        </button>
        <span className='text-xs text-slate-600'>atau</span>
        <div className='flex flex-row gap-2 items-start'>
          <div className='flex flex-col gap-1'>
            <div className='relative h-10 w-80 max-[480px]:w-48 flex border-2 rounded-md text-sm'>
              <input
                type='text'
                placeholder='Email...'
                ref={emailRef}
                className='w-full px-2 text-right max-[480px]:text-left'
              />
              <div className='max-[480px]:hidden flex items-center justify-center bg-gray-200 text-gray-500 px-2'>
                @mail.ugm.ac.id
              </div>
            </div>
            <span className='text-xs italic text-slate-500 min-[480px]:hidden'>
              Tanpa @mail.ugm.ac.id
            </span>
          </div>

          <button
            className='flex h-10 w-10 items-center justify-center bg-green-600 rounded-md'
            onClick={handleEmailSubmit}
          >
            <FiLogIn className='text-white' />
          </button>
        </div>
      </div>
    </div>
  )
}
