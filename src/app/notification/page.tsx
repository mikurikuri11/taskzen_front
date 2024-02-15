import Image from 'next/image'
import { redirect } from 'next/navigation'
import { getServerSession } from 'next-auth'
import { NotificationForm } from '@/features/notification/components/NotificationForm'

import { nextAuthOptions } from '@/libs/next-auth/options'

export default async function Home() {
  const session = await getServerSession(nextAuthOptions)

  if (!session) {
    redirect('/')
  }

  return (
    <div className='h-screen flex flex-col justify-center items-center gap-7'>
      <NotificationForm />

      <div>
        <div className='text-xl font-semibold text-white mt-8 mb-5'>LINE友達追加☟</div>
      </div>

      <div>
        <Image src='/line-bot.png' width={200} height={200} alt={''} />
      </div>
    </div>
  )
}
