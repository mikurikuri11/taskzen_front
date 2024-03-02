import './globals.css'
import { ColorSchemeScript, MantineProvider } from '@mantine/core'
import '@mantine/core/styles.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'

import { Suspense } from 'react'
import Loading from './loading'
import { Footer } from '@/components/layouts/Footer'
import { Header } from '@/components/layouts/Header'
import NextAuthProvider from '@/providers/NextAuth'
import { RecoilProvider } from '@/recoil/Provider'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Taskzen',
  description: 'This is a Taskzen app',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang='ja'>
      <head>
        <ColorSchemeScript />
      </head>
      <body className={inter.className}>
        <NextAuthProvider>
          <RecoilProvider>
            <MantineProvider>
              <Header />
              <Suspense fallback={<Loading />}>{children}</Suspense>
              <Footer />
            </MantineProvider>
          </RecoilProvider>
        </NextAuthProvider>
      </body>
    </html>
  )
}
