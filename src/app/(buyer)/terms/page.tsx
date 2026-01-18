'use client';
import { useGetTermsAndConditionsQuery } from '@/redux/feature/settingSlice'
import React from 'react'

export default function Terms() {
  const { data } = useGetTermsAndConditionsQuery(undefined);
  console.log(data)
  return (
    <div className='container mx-auto my-20 px-4 sm:px-6 lg:px-8 space-y-6'>
      <h1 className='lg:text-[60px] text-[30px] lg:font-semibold font-normal text-[#047857] text-center'>Terms and Conditions</h1>
      <p className='lg:text-2xl font-normal text-wrap' dangerouslySetInnerHTML={{ __html: data?.data?.description }}></p>
    </div>
  )
}
