import { Button } from '@mantine/core'
import { signIn } from 'next-auth/react'

export const GoogleLoginButton = () => {
  return (
    <Button
      onClick={() => signIn('google', { callbackUrl: '/todos' }, { prompt: 'login' })}
      fullWidth
      color='violet'
    >
      Login With Google
    </Button>
  )
}
