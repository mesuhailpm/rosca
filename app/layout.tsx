import type { Metadata } from 'next'
import { Poppins } from 'next/font/google'
import './globals.css'
import Nav from '@components/Nav'

const poppins = Poppins({ weight: '400', preload: false })

export const metadata: Metadata = {
  title: 'Nammude Kuri- നമ്മുടെ കുറി',
  description: 'നമ്മുടെ കുറി ആപ്പ്',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css"
        />

      </head>
      <body className={poppins.className}>
        <Nav />
        {children}
      </body>
    </html>
  )
}
