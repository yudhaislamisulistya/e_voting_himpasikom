'use client'
import { useEffect } from 'react'
import { ToastContainer, toast } from 'react-toastify'

interface MyToastProps {
  error?: string
}

export default function MyToast({ error }: MyToastProps) {
  useEffect(() => {
    if (error === 'AccessDenied') toast.error('Silahkan gunakan email UGM')
  }, [error])

  return <ToastContainer />
}
