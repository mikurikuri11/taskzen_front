import { getServerSession } from 'next-auth/next'
import { nextAuthOptions } from '@/libs/next-auth/options'

export default async function Page() {
  const session = await getServerSession(nextAuthOptions)
  return <pre className='text-white'>{JSON.stringify(session, null, 2)}</pre>
}
