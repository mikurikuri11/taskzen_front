import { useSession } from 'next-auth/react'
import { CartesianGrid, Legend, Line, LineChart, Tooltip, XAxis, YAxis } from 'recharts'
import { useAchievement } from '../hooks/useAchievement'

export const AchievementChart = () => {
  const { data: session, status } = useSession()
  const { data, error, isLoading } = useAchievement(session ? session.user.id : null)

  if (session === null) return <div>loading...</div>
  console.log(data)

  return (
    <div className='container'>
    <LineChart
      width={1000}
      height={600}
      data={data}
      margin={{
        top: 10,
        right: 40,
        left: 5,
        bottom: 15,
      }}
    >
      <CartesianGrid stroke='#ccc' strokeDasharray='3 3' />
      <XAxis
        dataKey='achievements_end_date'
        interval={0}
        dx={-10}
        dy={20}
        tick={{
          fontSize: 12,
          fill: '#eadcdc',
        }}
      />
      <YAxis
        dataKey='achievement_rate'
        tickCount={5}
        />
      <Line
        type='monotone'
        dataKey='achievement_rate'
        stroke='#8884d8'
        strokeWidth={2}
        />
      <Legend
        verticalAlign='top'
        height={30}
        iconSize={20}
        />
    </LineChart>
  </div>
  )
}
