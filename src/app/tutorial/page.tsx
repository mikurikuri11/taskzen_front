"use client";

// import {
//   ArrowPathIcon,
//   CloudArrowUpIcon,
//   Cog6ToothIcon,
//   FingerPrintIcon,
//   LockClosedIcon,
//   ServerIcon,
// } from '@heroicons/react/20/solid'

import { Splide, SplideSlide } from "@splidejs/react-splide";
import '@splidejs/splide/css';
import Image from 'next/image';

// const features = [
//   {
//     name: 'Push to deploy.',
//     description: 'Lorem ipsum, dolor sit amet consectetur adipisicing elit aute id magna.',
//     icon: CloudArrowUpIcon,
//   },
//   {
//     name: 'SSL certificates.',
//     description: 'Anim aute id magna aliqua ad ad non deserunt sunt. Qui irure qui lorem cupidatat commodo.',
//     icon: LockClosedIcon,
//   },
//   {
//     name: 'Simple queues.',
//     description: 'Ac tincidunt sapien vehicula erat auctor pellentesque rhoncus.',
//     icon: ArrowPathIcon,
//   },
//   {
//     name: 'Advanced security.',
//     description: 'Lorem ipsum, dolor sit amet consectetur adipisicing elit aute id magna.',
//     icon: FingerPrintIcon,
//   },
//   {
//     name: 'Powerful API.',
//     description: 'Anim aute id magna aliqua ad ad non deserunt sunt. Qui irure qui lorem cupidatat commodo.',
//     icon: Cog6ToothIcon,
//   },
//   {
//     name: 'Database backups.',
//     description: 'Ac tincidunt sapien vehicula erat auctor pellentesque rhoncus. ',
//     icon: ServerIcon,
//   },
// ]

export default function Home() {
  return (
    <>
      <style>{`
          .img-slide {
            max-width: 100%;
            height: auto;
          }
        `}</style>
      <div className="bg-gray-900 py-24 sm:py-32">
        <div className="relative overflow-hidden pt-8">
          <div className="mx-auto max-w-5xl px-6 lg:px-8 bg-white rounded-xl">
            <Splide
              aria-label="私のお気に入りの画像集"
              options={{
                autoplay: true,
                interval: 3000,
              }}
            >
              <SplideSlide>
                <h2 className='text-2xl font-bold mt-10 mb-5 text-center'>TaskZennとは</h2>
                <p className='mb-10 text-center mx-auto max-w-2xl lg:text-left'>
                  自分にとって今最も重要なことだけを管理するToDoアプリです。<br />
                  自分にとって今最も重要なこととは、何でしょうか。<br />
                  「7つの習慣」の第3の習慣、「最優先事項を優先する」によると、
                  緊急と重要のマトリックスにおいて、<span className='text-red-500'>緊急ではないが重要なこと</span>が最も重要なことだと言われています。
                  下の図の第2領域にあたります。<br />
                  このアプリは、第2領域にあるタスクに効果的にアプローチできるようにサポートします。<br />
                </p>
                <Image
                  width={600}
                  height={600}
                  src='/matrix_diagram.png'
                  className="mx-auto text-center justify-center mb-4"
                  alt="ToDoの作成方法の画像"
                  style={{ width: '100%', height: 'auto', maxWidth: '600px' }}
                  />
                <p className='text-center mx-auto max-w-2xl lg:text-left mt-6 mb-10 text-gray-400'>
                  参考：<a href='https://www.franklincovey.co.jp/habit-3' className='text-blue-500'>7つの習慣®「第3の習慣：最優先事項を優先する」</a>
                </p>
              </SplideSlide>
              <SplideSlide>
                <h2 className='text-2xl font-bold mt-10 mb-5 text-center'>ToDoの作成方法</h2>
                  <p className='mb-10 text-center mx-auto max-w-2xl lg:text-left'>
                    ログイン後、画面右上の「ToDoを作成する」ボタンを押して、ToDoを作成します。<br />
                    この際、ToDoのタイトルと領域を入力します。<br />
                    領域とは、ToDoを緊急と重要のマトリックスよりどの領域に分類するかを指します。<br />
                    これにより、作成したToDoが自分にとって今最も重要なことかどうかを判断することができます。<br />
                  </p>
                  <Image
                    width={600}
                    height={600}
                    src='/taskzenn_matrix_diagram.png'
                    className="mx-auto text-center justify-center mb-4"
                    alt="ToDoの作成方法の画像"
                    style={{ width: '100%', height: 'auto', maxWidth: '600px' }}
                    />
              </SplideSlide>
              <SplideSlide>
                <h2 className='text-2xl font-bold mt-10 mb-5 text-center'>その後の機能</h2>
                  <p className='mb-10 text-center mx-auto max-w-2xl lg:text-left'>
                    ToDoを作成して、TaskZennの使い方に慣れてきたら、<br />
                    レポート機能や通知機能を使ってみましょう。<br />
                    振り返りをすることで、7つの習慣をより効果的に取り入れることができます。<br />
                    TaskZennについて理解できたら、実際に使ってみましょう！<br />
                    画面右上の<span className='font-bold'>「ログイン」を押して、ログインしてみてください。</span><br />
                  </p>
                  <Image
                    width={600}
                    height={600}
                    src='/report.png'
                    className="mx-auto text-center justify-center mb-4"
                    alt="ToDoの作成方法の画像"
                    style={{ width: '100%', height: 'auto', maxWidth: '600px' }}
                    />
              </SplideSlide>
            </Splide>
          </div>
        </div>
        {/* <div className="mx-auto mt-16 max-w-7xl px-6 sm:mt-20 md:mt-24 lg:px-8">
          <dl className="mx-auto grid max-w-2xl grid-cols-1 gap-x-6 gap-y-10 text-base leading-7 text-gray-300 sm:grid-cols-2 lg:mx-0 lg:max-w-none lg:grid-cols-3 lg:gap-x-8 lg:gap-y-16">
            {features.map((feature) => (
              <div key={feature.name} className="relative pl-9">
                <dt className="inline font-semibold text-white">
                  <feature.icon className="absolute left-1 top-1 h-5 w-5 text-indigo-500" aria-hidden="true" />
                  {feature.name}
                </dt>{' '}
                <dd className="inline">{feature.description}</dd>
              </div>
            ))}
          </dl>
        </div> */}
      </div>
    </>
  )
}
