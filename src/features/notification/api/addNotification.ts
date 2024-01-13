import { Notification } from '../types/index'

type Props = {
  notification: Notification
  id: string
}

export const addNotification = async (props: Props): Promise<Notification> => {
  const { notification, id } = props
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/v1/line_notifications/update_or_create/${id}`,
    {
      method: 'PUT',
      body: JSON.stringify(notification),
      headers: {
        'Content-Type': 'application/json',
      },
    },
  )
  const data = await response.json()
  return data
}
