"use client";

import Image from 'next/image'
import ToggleButton from '@/components/ui/Button/ToggleButton'

export default function page () {
  return (
    <form>
      <div className='h-screen flex flex-col justify-center items-center gap-7'>
        <h2 className='text-3xl font-semibold text-white mb-14'>通知設定</h2>

        <div className='flex items-center'>
          <label className="block text-xl font-medium leading-6 text-white">
            通知ON
          </label>
          {/* <p className="mt-1 text-sm leading-6 text-gray-400">時刻を設定しない場合は、毎週日曜9時に送信されます。</p> */}
          <div className="mx-12 space-y-6">
            <div className="flex items-center gap-x-3">
              <ToggleButton />
            </div>
          </div>
        </div>

        <div className="flex items-center">
          <label htmlFor="location" className="block text-xl font-medium leading-6 text-white">
            通知時刻
          </label>
          <select
            id="location"
            name="location"
            className="bg-white/5 text-white mx-6 block rounded-md border-0 py-1.5 pl-3 pr-10 text-white-900 ring-1 ring-inset ring-white-300 sm:text-sm sm:leading-6"
            defaultValue="Canada"
          >
            <option>8:00</option>
            <option>10:00</option>
            <option>12:00</option>
            <option>15:00</option>
          </select>
        </div>


          <div>
            <div className='text-xl font-semibold text-white mt-8 mb-5'>
              LINE友達追加☟
            </div>
          </div>

          <div>
            <Image src='/line-bot.png' width={200} height={200} alt={''} />
          </div>
      </div>
    </form>
  )
}
