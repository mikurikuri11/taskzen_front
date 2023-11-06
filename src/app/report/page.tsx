"use client";

import { BlueButton } from "@/components/ui/Button/BlueButton";
import { PurpleButton } from "@/components/ui/Button/PurpleButton";

export default function Home() {
  const hello = () => {
    console.log('hello')
  }

  return (
    <div className='h-screen flex flex-col justify-center items-center'>
      <div className='text-3xl font-semibold text-white mb-10'>
        週間レポート
      </div>
      <div>
        <div className='text-2xl font-semibold text-white mb-10'>
          今週の達成率（全体） 67  %
        </div>
      </div>
      <div>
        <div className='text-2xl font-semibold text-white mb-10'>
          今週の達成率（第2領域） 100 %
        </div>
      </div>
      <div>
        <p className='text-1xl font-semibold text-white mb-10'>
          達成率（第2領域）が100%です。<br />
          大切なことに時間を使えています。<br />
          この調子で頑張りましょう！
        </p>
      </div>
      <div className='flex gap-5'>
        <PurpleButton
          onClick={() => hello()}
        >
          もっと見る
        </PurpleButton>
        <BlueButton
          onClick={() => hello()}
        >
          共有する
        </BlueButton>
      </div>
    </div>
  )
}
