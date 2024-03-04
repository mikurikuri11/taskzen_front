'use client'

import { Modal, Button, TextInput } from '@mantine/core'

import { useRouter } from 'next/navigation'
import { useSession } from 'next-auth/react'
import { useForm, SubmitHandler } from 'react-hook-form'
import { addCategory } from '../../api/category/addCategory'
import { Category } from '@/types'

interface Props {
  opened: boolean
  close: () => void
}

export const CategoryModal = (props: Props) => {
  const { opened, close } = props
  const { data: session, status } = useSession()
  const router = useRouter()

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<Category>()

  const onSubmit: SubmitHandler<Category> = async (data) => {
    if (session?.user?.id) {
      try {
        await addCategory({ category: data, id: session.user.id })
        close()
        router.refresh()
        reset({ name: '' })
      } catch (error) {
        console.error(error)
      }
    }
  }
  return (
    <>
      <Modal opened={opened} onClose={close}>
        <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-6'>
          <div className='flex flex-col gap-4'>
            <TextInput
              {...register('name', { required: true })}
              label='カテゴリー名'
              withAsterisk
              placeholder='カテゴリー名を入力してください'
            />
            {errors.name && <span className='text-red-500'>タイトルは必須です</span>}
          </div>

          <Button onClick={handleSubmit(onSubmit)} fullWidth color='violet'>
            作成
          </Button>
        </form>
      </Modal>
    </>
  )
}
