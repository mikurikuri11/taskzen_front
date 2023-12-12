'use client'

import {
  ArrowPathIcon,
  ChevronRightIcon,
  CloudArrowUpIcon,
  Cog6ToothIcon,
  FingerPrintIcon,
  LockClosedIcon,
  ServerIcon,
} from '@heroicons/react/20/solid'
import { BoltIcon, CalendarDaysIcon, UsersIcon } from '@heroicons/react/24/outline'
import Link from 'next/link'
import { useSession } from 'next-auth/react'
import { useRecoilState } from 'recoil'

import { LogoutButton } from '@/components/ui/Button/LogoutButton'
import { StyledButton } from '@/components/ui/Button/StyledButton'
import { LoginModal } from '@/components/ui/Modal/LoginModal'
import { showLoginModalAtom } from '@/recoil/atoms/showLoginModalAtom'

const primaryFeatures = [
  {
    name: '領域ごとのTodoを作成する',
    description:
      'Non quo aperiam repellendus quas est est. Eos aut dolore aut ut sit nesciunt. Ex tempora quia. Sit nobis consequatur dolores incidunt.',
    href: '#',
    icon: BoltIcon,
  },
  {
    name: 'Todoを振り返る',
    description:
      'Vero eum voluptatem aliquid nostrum voluptatem. Vitae esse natus. Earum nihil deserunt eos quasi cupiditate. A inventore et molestiae natus.',
    href: '#',
    icon: UsersIcon,
  },
  {
    name: '達成率を確認し、共有する',
    description:
      'Et quod quaerat dolorem quaerat architecto aliquam accusantium. Ex adipisci et doloremque autem quia quam. Quis eos molestiae at iure impedit.',
    href: '#',
    icon: CalendarDaysIcon,
  },
]

export default function Home() {
  const [showLoginModal, setShowLoginModal] = useRecoilState(showLoginModalAtom)
  const { data: session, status } = useSession()

  const openModal = () => {
    setShowLoginModal(true)
  }

  return (
    // <div className='h-screen flex flex-col justify-center items-center'>
    //   <div className='text-2xl font-semibold text-white mb-10'>
    //     あなたの日々の生活に７つの習慣を取り入れてみましょう。きっと生活が豊かになります。
    //   </div>
    //   <div className='flex'>
    //     {status !== 'authenticated' ? (
    //       <StyledButton buttonStyle='bg-indigo-500' onClick={openModal}>
    //         ログイン
    //       </StyledButton>
    //     ) : (
    //       <LogoutButton />
    //     )}
        // <Link
        //   href='/tutorial'
        //   passHref
        //   className='rounded-md px-3 text-lg font-semibold text-white hover:text-gray-300 pt-3 ml-4'
        // >
        //   学んでみる
        // </Link>
    //     <LoginModal open={showLoginModal} setOpen={setShowLoginModal} />
    //   </div>
    // </div>
      <div className="mx-auto mt-32 max-w-7xl px-6 sm:mt-56 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-base font-semibold leading-7 text-indigo-400">Deploy faster</h2>
          <p className="mt-2 text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Taskzen
          </p>
          <p className="mt-6 mb-8 text-lg leading-8 text-gray-300">
            あなたの日々の生活に７つの習慣を取り入れてみましょう。
            <br />
            きっと生活が豊かになります。
          </p>
          <Link
            className='bg-indigo-500 rounded-md text-lg font-semibold text-white hover:bg-indigo-300 px-3 py-4'
            href='/tutorial'>
            学んでみる
          </Link>
        </div>
        <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
          <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-3">
            {primaryFeatures.map((feature) => (
              <div key={feature.name} className="flex flex-col">
                <dt className="text-base font-semibold leading-7 text-white">
                  <div className="mb-6 flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-500">
                    <feature.icon className="h-6 w-6 text-white" aria-hidden="true" />
                  </div>
                  {feature.name}
                </dt>
                <dd className="mt-1 flex flex-auto flex-col text-base leading-7 text-gray-300">
                  <p className="flex-auto">{feature.description}</p>
                  <p className="mt-6">
                    <a href={feature.href} className="text-sm font-semibold leading-6 text-indigo-400">
                      Learn more <span aria-hidden="true">→</span>
                    </a>
                  </p>
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
  )
}
