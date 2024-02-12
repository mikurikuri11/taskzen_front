import { getServerSession } from 'next-auth/next'
import { nextAuthOptions } from '@/libs/next-auth/options'

export async function getServerSideProps(context: any) {
  const session = await getServerSession(context.req, context.res, nextAuthOptions)

  if (!session) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    }
  }

  return {
    props: {
      session,
    },
  }
}
