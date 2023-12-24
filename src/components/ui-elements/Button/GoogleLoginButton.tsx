import { useSession, signIn } from 'next-auth/react'

export const GoogleLoginButton = () => {
  const { data: session } = useSession()

  return (
    <button
      type='button'
      className='inline-flex w-full justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white hover:bg-indigo-500 '
      onClick={() => signIn('google', { callbackUrl: '/todos' }, { prompt: 'login' })}
    >
      Login With Google
    </button>
  )
}
