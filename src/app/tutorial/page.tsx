'use client'

import { Carousel } from '@mantine/carousel'
import { Button } from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'

import Image from 'next/image'
import Link from 'next/link'
import { useSession } from 'next-auth/react'

import { LoginModal } from '@/components/ui-elements/Modal/LoginModal'

export default function Home() {
  const { data: session, status } = useSession()
  const [opened, { open, close }] = useDisclosure(false)

  return (
    <div className='min-h-screen py-20 sm:py-30'>
      <div className='relative overflow-hidden'>
        <div className='mx-auto max-w-5xl px-6 lg:px-8 bg-white rounded-xl'>
          <Carousel withIndicators>
            <Carousel.Slide>
              <h2 className='text-xl mt-10 mb-5 text-center'>
                <span className='text-2xl'>『TaskZenn』</span>にようこそ
              </h2>
              <p className='mb-10 text-center mx-auto max-w-2xl'>
                このアプリは、
                <span className='font-bold'>自分にとって今最も重要なことだけを管理する</span>
                ためのToDoアプリです。
                <br />
                <br />
                「7つの習慣」の第3の習慣、「最優先事項を優先する」によると、
                緊急と重要のマトリックスにおいて、
                <span className='text-red-500'>緊急ではないが重要なこと</span>
                が最も重要だと言われています。（下図の第2領域）
                <br />
                このアプリは、第2領域にあるタスクに効果的にアプローチできるようにサポートします。
                <br />
              </p>
              <div className='flex justify-center items-center mb-10'>
                <Image
                  width={600}
                  height={600}
                  src='/matrix_diagram.png'
                  alt='ToDoの作成方法の画像'
                />
              </div>
              <p className='text-center mx-auto max-w-2xl lg:text-left mt-4 mb-10 text-gray-400'>
                参考：
                <Link
                  href='https://www.franklincovey.co.jp/habit-3'
                  target='_blank'
                  className='text-blue-500'
                >
                  7つの習慣®「第3の習慣：最優先事項を優先する」
                </Link>
              </p>
            </Carousel.Slide>
            <Carousel.Slide>
              <h2 className='text-2xl mt-10 mb-5 text-center'>ToDoの作成方法</h2>
              <p className='mb-8 text-center mx-auto max-w-2xl'>
                画面右上の<span className='font-bold'>「ToDoを作成する」</span>
                ボタンを押して、ToDoを作成します。
                <br />
                この際、ToDoのタイトルと領域を入力します。
                <br />
                領域とは、ToDoを緊急と重要のマトリックスよりどの領域に分類するかを指します。
                <br />
                このアプローチにより、作成したToDoが自分にとって今最も重要なことかどうかを判断することができます。
                <br />
              </p>
              <div className='flex justify-center items-center mb-10'>
                <Image
                  width={600}
                  height={500}
                  src='/taskzenn_matrix_diagram.png'
                  alt='ToDoの作成方法の画像'
                />
              </div>
            </Carousel.Slide>
            <Carousel.Slide>
              <h2 className='text-2xl mt-10 mb-5 text-center'>その後の機能</h2>
              <div className='mb-8 text-center mx-auto max-w-2xl'>
                ToDoを作成して、TaskZennの使い方に慣れてきたら、
                <br />
                <span className='font-bold'>レポート機能</span>や
                <span className='font-bold'>グラフ機能</span>を使ってみましょう。
                <br />
                振り返りをすることで、7つの習慣をより効果的に取り入れることができます。
                <br />
                TaskZennについて理解できたら、実際に使ってみましょう！
                <br />
                <div className='text-center mt-2'>
                  {status === 'authenticated' ? (
                    <Button component={Link} href='/todos' color='violet'>
                      ToDoを作成する
                    </Button>
                  ) : (
                    <>
                      <Button onClick={open} className='mb-1' color='violet'>
                        Login With Google
                      </Button>
                      <div className='text-gray-500 text-sm'>※ログインが必要です</div>
                    </>
                  )}
                </div>
              </div>
              <div className='flex justify-center items-center mb-10'>
                <Image width={600} height={500} src='/report.png' alt='ToDoの作成方法の画像' />
              </div>
            </Carousel.Slide>
          </Carousel>
          <LoginModal opened={opened} close={close} />
        </div>
      </div>
    </div>
  )
}
