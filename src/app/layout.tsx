import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'

import { Suspense } from 'react'
import Loading from './loading'
import { Footer } from '@/components/base/Footer'
import { Header } from '@/components/base/Header'
import NextAuthProvider from '@/providers/NextAuth'
import { RecoilProvider } from '@/recoil/Provider'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Taskzen',
  description: 'This is a Taskzen app',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang='en'>
      <body className={inter.className}>
        <NextAuthProvider>
          <RecoilProvider>
            <Header />
              <Suspense fallback={<Loading />}>
                {children}
              </Suspense>
            <Footer />
          </RecoilProvider>
        </NextAuthProvider>
      </body>
    </html>
  )
}
