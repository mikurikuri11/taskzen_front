import { useSession, signIn } from 'next-auth/react'

export const LineLoginButton = () => {
  const { data: session } = useSession()

  return (
    <button
      type='button'
      className='inline-flex w-full justify-center rounded-md bg-green-600 px-3 py-2 text-sm font-semibold text-white hover:bg-green-500 '
      onClick={() => signIn('line', {
        callbackUrl: `/`,
      }, { prompt: 'login' })}
    >
      Login With LINE
    </button>
  )
}
