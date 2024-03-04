"use client";

import { AreaChart } from '@mantine/charts';
import { useSession } from 'next-auth/react'

import { useFilteredAchievements } from '../hooks/useFilteredAchievement'

export const AchievementManagement = () => {
  const { data: session, status } = useSession()
  const { filteredData } = useFilteredAchievements(session ? session.user.id : null)

  return (
    <div className='mx-auto max-w-screen-md flex justify-between my-10 flex-col items-center'>
      <h1 className='text-3xl font-semibold text-white mb-14'>月間レポート</h1>
      <AreaChart
        h={300}
        data={filteredData}
        dataKey="achievements_end_date"
        series={[
          { name: 'achievement_rate', color: 'indigo.6' },
          // { name: 'Oranges', color: 'blue.6' },
          // { name: 'Tomatoes', color: 'teal.6' },
        ]}
        curveType="linear"
        className="mt-12 mb-24"

      />
    </div>
  );
}