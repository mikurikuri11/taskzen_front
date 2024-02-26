'use client'

import { AchievementChart } from './AchievementChart'

export const AchievementManagement = () => {
  return (
    <div className='mt-20 mb-32'>
      <div className='mx-auto max-w-screen-md flex justify-between my-10 flex-col items-center'>
        <h1 className='text-3xl font-semibold text-white mb-14'>月間レポート</h1>
        <div>
          <AchievementChart />
        </div>
      </div>
    </div>
  )
}
