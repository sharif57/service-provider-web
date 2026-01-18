import Image from 'next/image'
import React from 'react'
import Ratting from './Ratting'
import Point from './Point'

export default function Excellent() {
  return (
    <div className='container mx-auto px-4 py-8 mb-24'>
      <div className='flex flex-col lg:flex-row items-center justify-between gap-6 text-center lg:text-left'>
        <h1 className='text-[#374151] text-3xl sm:text-4xl lg:text-5xl font-semibold'>
          Excellent
        </h1>
        
        <Ratting />

        <h1 className='text-[#4B5563] text-lg sm:text-xl lg:text-3xl font-medium'>
          4.8 out of 5 based on 5,096 reviews
        </h1>

        <Point />
      </div>
    </div>
  )
}
