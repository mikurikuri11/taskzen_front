type Props = {
  id: string
}

export const getTodoCompleteRate = async (props: Props) => {
  const { id } = props
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/v1/todos/this_week_completion_rate/${id}`,
    {
      cache: 'no-store',
    },
  )
  const data = await res.json()
  return data.completion_rate
}
