import type { Metadata } from 'next'
import { Poppins } from 'next/font/google'
import { ReactNode } from 'react'
import './globals.css'
import 'react-toastify/dist/ReactToastify.css'

const poppins = Poppins({
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
  subsets: ['latin'],
})

export const metadata: Metadata = {
  title: 'Pemilihan Ketua HIMPASIKOM UGM',
  description:
    'Program kerja rutin tahunan untuk memilih Ketua HIMPASIKOM UGM ' +
    'yang baru menggunakan sistem e-voting via website',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode
}>) {
  return (
    <html lang='en'>
      <body className={`${poppins.className} antialiased`}>{children}</body>
    </html>
  )
}
