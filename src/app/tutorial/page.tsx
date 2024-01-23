'use client'

import { Splide, SplideSlide } from '@splidejs/react-splide'
import '@splidejs/splide/css'
import Image from 'next/image'
import Link from 'next/link'
import { useSession } from 'next-auth/react'
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
                autoplay: true,
                interval: 3000,
              }}
            >
              <SplideSlide>
                <h2 className='text-2xl font-bold mt-10 mb-5 text-center'>TaskZennとは</h2>
                <p className='mb-10 text-center mx-auto max-w-2xl lg:text-left'>
                  自分にとって今最も重要なことだけを管理するToDoアプリです。
                  <br />
                  自分にとって今最も重要なこととは、何でしょうか。
                  <br />
                  「7つの習慣」の第3の習慣、「最優先事項を優先する」によると、
                  緊急と重要のマトリックスにおいて、
                  <span className='text-red-500'>緊急ではないが重要なこと</span>
                  が最も重要なことだと言われています。 下の図の第2領域にあたります。
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
                <h2 className='text-2xl font-bold mt-10 mb-5 text-center'>ToDoの作成方法</h2>
                <p className='mb-8 text-center mx-auto max-w-2xl lg:text-left'>
                  画面右上の<span className='font-bold'>「ToDoを作成する」</span>
                  ボタンを押して、ToDoを作成します。
                  <br />
                  この際、ToDoのタイトルと領域を入力します。
                  <br />
                  領域とは、ToDoを緊急と重要のマトリックスよりどの領域に分類するかを指します。
                  <br />
                  これにより、作成したToDoが自分にとって今最も重要なことかどうかを判断することができます。
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
                <h2 className='text-2xl font-bold mt-10 mb-5 text-center'>その後の機能</h2>
                <div className='mb-8 text-center mx-auto max-w-2xl lg:text-left'>
                  ToDoを作成して、TaskZennの使い方に慣れてきたら、
                  <br />
                  <span className='font-bold'>レポート機能</span>や<span className='font-bold'>通知機能</span>を使ってみましょう。
                  <br />
                  振り返りをすることで、7つの習慣をより効果的に取り入れることができます。
                  <br />
                  TaskZennについて理解できたら、実際に使ってみましょう！
                  <br />
                  {status === 'authenticated' ? (
                    <button>
                      <Link
                        href='/todos'
                        className='font-bold text-indigo-500 hover:text-indigo-700'
                      >
                        ToDoを作成する
                      </Link>
                    </button>
                  ) : (
                    <>
                      <button
                        onClick={openModal}
                        className='font-bold text-indigo-500 hover:text-indigo-700'
                      >
                        使ってみる
                      </button>
                      <div className='text-gray-500 text-sm'>※ログインが必要です</div>
                    </>
                  )}
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
