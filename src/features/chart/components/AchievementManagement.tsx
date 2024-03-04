"use client";

import { AreaChart } from '@mantine/charts';
import { useSession } from 'next-auth/react'

import { useFilteredAchievements } from '../hooks/useFilteredAchievement'

export const AchievementManagement = () => {
  const { data: session, status } = useSession()
  const { filteredData } = useFilteredAchievements(session ? session.user.id : null)

  console.log(filteredData)

  return (
    <div className='mx-auto max-w-screen-md flex justify-between mt-10 flex-col items-center'>
      <h1 className='text-3xl font-semibold text-white mb-14'>週間レポート</h1>
      <AreaChart
        h={300}
        data={filteredData}
        dataKey="achievement_date"
        series={[
          { name: 'achievement_rate', color: 'indigo.6' },
          // { name: 'Oranges', color: 'blue.6' },
          // { name: 'Tomatoes', color: 'teal.6' },
        ]}
        curveType="bump"
        tickLine="xy"
        gridAxis="xy"
        className="mt-20 mb-24"
      />
    </div>
  );
}