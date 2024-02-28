'use client'

import { Splide, SplideSlide } from '@splidejs/react-splide'
import '@splidejs/splide/css'
import Image from 'next/image'
import Link from 'next/link'
import { signIn, useSession } from 'next-auth/react'
import { useRecoilState } from 'recoil'

import { LoginModal } from '@/components/ui-elements/Modal/LoginModal'
import { showLoginModalAtom } from '@/recoil/atoms/showLoginModalAtom'

export default function Home() {
  const { data: session, status } = useSession()
  const [showLoginModal, setShowLoginModal] = useRecoilState(showLoginModalAtom)

  const openModal = () => {
    setShowLoginModal(true)
  }

  return (
    <>
      <style>{`
          .img-slide {
            max-width: 100%;
            height: auto;
          }
        `}</style>
      <div className='bg-gray-900 py-20 sm:py-30'>
        <div className='relative overflow-hidden'>
          <div className='mx-auto max-w-5xl px-6 lg:px-8 bg-white rounded-xl'>
            <Splide
              aria-label='私のお気に入りの画像集'
              options={{
                autoplay: false,
                // interval: 3000,
              }}
            >
              <SplideSlide>
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
                <Image
                  width={600}
                  height={600}
                  src='/matrix_diagram.png'
                  className='mx-auto text-center justify-center border-2 border-gray-200'
                  alt='ToDoの作成方法の画像'
                  style={{ width: '100%', height: '500px', maxWidth: '600px' }}
                />
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
              </SplideSlide>
              <SplideSlide>
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
                <Image
                  width={600}
                  height={600}
                  src='/taskzenn_matrix_diagram.png'
                  className='mx-auto text-center justify-center border-2 border-gray-200'
                  alt='ToDoの作成方法の画像'
                  style={{ width: '100%', height: '500px', maxWidth: '600px' }}
                />
              </SplideSlide>
              <SplideSlide>
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
                      <button
                        className='
                        rounded-md
                        bg-indigo-500
                        hover:bg-indigo-400
                        px-3
                        py-2
                        mt-4
                        text-md
                        font-semibold
                        text-white
                        shadow-sm'
                      >
                        <Link href='/todos'>ToDoを作成する</Link>
                      </button>
                    ) : (
                      <>
                        <button
                          type='button'
                          className='my-2 inline-flex justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white hover:bg-indigo-500 '
                          onClick={() =>
                            signIn('google', { callbackUrl: '/todos' }, { prompt: 'login' })
                          }
                        >
                          Login With Google
                        </button>
                        <div className='text-gray-500 text-sm'>※ログインが必要です</div>
                      </>
                    )}
                  </div>
                </div>
                <Image
                  width={600}
                  height={600}
                  src='/report.png'
                  className='mx-auto text-center justify-center border-2 border-gray-200'
                  alt='ToDoの作成方法の画像'
                  style={{ width: '100%', height: '500px', maxWidth: '600px' }}
                />
              </SplideSlide>
            </Splide>
          </div>
        </div>
      </div>
      <LoginModal open={showLoginModal} setOpen={setShowLoginModal} />
    </>
  )
}
