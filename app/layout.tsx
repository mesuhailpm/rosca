
import type { Metadata } from 'next'
import { Poppins } from 'next/font/google'
import '@app/globals.css'
import Nav from '@components/Nav'
import Footer from '@components/Footer'
import { useStore } from '@src/store'

export const metadata: Metadata = {
  title: 'Nammude Kuri- നമ്മുടെ കുറി',
  description: 'നമ്മുടെ കുറി ആപ്പ്',
  manifest: '/manifest.json',
  icons: { apple: '/icon-192x192.png' },
  themeColor: '#FFFFFF'
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {


  return (
    <html lang="en">
      <head>
        <link //to access fontawesome resources used in the project
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css"
        />

      </head>
      <body className={`h-full min-h-screen flex flex-col`}>
        <Nav />
        {children}
        <Footer />
      </body>
    </html>
  )
}
