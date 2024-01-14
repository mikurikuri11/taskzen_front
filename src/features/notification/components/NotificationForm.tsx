'use client'

import { useSession } from 'next-auth/react'
import { useState } from 'react'
import toast, { Toaster } from 'react-hot-toast'
import { StyledSubmitButton } from '@/components/ui-elements/Button/StyledSubmitButton'
import ToggleButton from '@/components/ui-elements/Button/ToggleButton'
import { addNotification } from '@/features/notification/api/addNotification'
import { Notification } from '@/features/notification/types'

export const NotificationForm = () => {
  const { data: session, status } = useSession()
  const [enabled, setEnabled] = useState<boolean>(false)
  const [time, setTime] = useState<number>(1)

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const data: Notification = {
      active: enabled,
      notification_time: time,
    }
    if (session?.user?.id) {
      await addNotification({ notification: data, id: session.user.id })
    }
  }

  const notify = () =>
    toast.success('通知設定を保存しました', {
      duration: 1000,
      style: {
        borderRadius: '10px',
        background: '#1bbc31',
        color: '#fff',
      },
    })

  return (
    <form onSubmit={onSubmit} className='flex flex-col justify-center items-center gap-7 mb-6'>
      <h2 className='text-3xl font-semibold text-white mb-14'>通知設定</h2>

      <div className='flex items-center'>
        <label className='block text-xl font-medium leading-6 text-white'>通知ON</label>
        <div className='mx-12 space-y-6'>
          <div className='flex items-center gap-x-3'>
            <ToggleButton enabled={enabled} setEnabled={setEnabled} />
          </div>
        </div>
      </div>

      <div className='flex items-center'>
        <label htmlFor='location' className='block text-xl font-medium leading-6 text-white'>
          通知時刻
        </label>
        <select
          id='notification_time'
          name='notification_time'
          className='bg-white/5 text-white mx-6 block rounded-md border-0 py-1.5 pl-3 pr-10 text-white-900 ring-1 ring-inset ring-white-300 sm:text-sm sm:leading-6'
          defaultValue='1'
          onChange={(e) => setTime(Number(e.target.value))}
        >
          <option value={1}>8:00</option>
          <option value={2}>10:00</option>
          <option value={3}>12:00</option>
          <option value={4}>15:00</option>
        </select>
      </div>

      <StyledSubmitButton className='bg-indigo-500 text-lg hover:bg-indigo-300' onClick={notify}>
        保存
      </StyledSubmitButton>
      <Toaster position='top-center' reverseOrder={false} />
    </form>
  )
}
