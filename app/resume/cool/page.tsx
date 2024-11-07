import Navbar from '@/app/components/Navbar'
import React from 'react'

export default function page() {
  return (
    <>
      <Navbar />
      <div className='min-h-screen bg-gray-100 p-8 flex items-center'>
        <div className='max-w-4xl mx-auto'>
          <div className='flex items-center justify-between mb-6'>
            <h1 className='text-3xl font-bold'>Premium Resume Templates</h1>
            <span className='bg-yellow-500 text-white px-3 py-1 rounded-full text-sm font-semibold'>
              Premium
            </span>
          </div>
          <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
             ... Working on this  template cards ...
          </div>
        </div>
      </div>
    </>
  )
}
