import { useSession } from 'next-auth/react'
import { CartesianGrid, Legend, Line, LineChart, Tooltip, XAxis, YAxis } from 'recharts'
import { useFilteredAchievements } from '../hooks/useFilteredAchievement'

const pStyle = {
  color: '#cac8f3',
}

const divStyle = {
  background: 'linear-gradient(to right, #2c2b2b, #64616985)',
  fontWeight: 'bold',
  border: 'solid 1px',
}

export const AchievementChart = () => {
  const { data: session, status } = useSession()
  const { filteredData } = useFilteredAchievements(session ? session.user.id : null)
  console.log('filteredData', filteredData)

  if (session === null) return <div>loading...</div>

  if (filteredData.length === 0) return <div className='text-white text-3xl'>達成率のデータがありません</div>

  return (
    <div className='container'>
      <LineChart
        width={1000}
        height={600}
        data={filteredData}
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
        <YAxis dataKey='achievement_rate' tickCount={5} />
        <Line type='monotone' dataKey='achievement_rate' stroke='#cac8f3' strokeWidth={2} />
        <Legend verticalAlign='top' height={30} iconSize={20} />
        <Tooltip contentStyle={divStyle} labelStyle={pStyle} />
      </LineChart>
    </div>
  )
}
