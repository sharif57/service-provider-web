'use client';
import { useUserStatsQuery } from '@/redux/feature/userSlice'
import React from 'react'

interface Props {
    count: number,
    title: string
}

export default function AllActivity() {

  const {data} = useUserStatsQuery(undefined);


    const AllActivitys: Props[] = [
        {
            count: data?.active_users || 0,
            title: "All Activity"
        },
        {
            count: data?.offers_created || 0,
            title: "Offer Created"
        },
        {
            count: data?.online_users || 0,
            title: "Users Online Now"
        },
    ]
 

  return (
    <div className='container mx-auto p-4'>
      <div className='grid lg:grid-cols-3 grid-cols-1 gap-8 text-center '>
        {AllActivitys.map((allActivity) => (
            <div key={allActivity.title} className='bg-white p-4 py-8 space-y-4 rounded-lg cursor-copy' title={allActivity.title}>
                <h1 className='text-5xl font-semibold text-[#374151]'>{allActivity.count}</h1>
                <p className='text-xl font-medium text-[#374151]'>{allActivity.title}</p>
            </div>
        ))}
      </div>
    </div>
  )
}
