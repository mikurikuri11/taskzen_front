"use client";

import { useState } from 'react';
import { Sidebar } from '@/components/base/Sidebar'

const page = () => {
  const [open, setOpen] = useState(true)
  return (
    <div>
      <button
        className='bg-white text-red-400'
        onClick={() => setOpen(!open)}
      >
        サイドバー
      </button>
      <Sidebar open={open} setOpen={setOpen} />
    </div>
  )
}

export default page
