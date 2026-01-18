import Image from 'next/image'
import React from 'react'

export default function Services() {

    const services = [
        {
            icon: '/image/icon1.png',
            title: 'Smart Offer Calculator',
            description: 'Create precise quotes using AI or manual input in minutes',
        },
        {
            icon: '/image/icon2.png',
            title: 'Task & Calendar Integration',
            description: 'Keep track of tasks with built-in scheduling and external calendar sync',
        },
        {
            icon: '/image/icon3.png',
            title: 'Custom Templates & Marginst',
            description: 'Save reusable templates, adjust margins, and stay profitable',
        }
    ]


    return (
        <div id='services' className='mt-24  p-4 container mx-auto'>
            <h1 className='text-6xl font-semibold text-[#4B5563] text-center'>Services</h1>

            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 mt-12 '>
                {
                    services.map((service) => (
                        <div key={service.title} title={service.title} className='bg-white flex lg:px-14 px-4  flex-col gap-4 justify-center items-center p-6 py-8 rounded-2xl hover:shadow-2xl hover:shadow-[#8ccfbc] hover:transform-3d duration-500 cursor-pointer text-center'>
                            <div className='bg-[#047857] size-20 p-4  rounded-lg flex justify-center items-center'>
                                <Image src={service.icon} width={100} height={100} alt={service.title} />
                            </div>
                            <h1 className='text-2xl font-semibold text-[#374151]'>{service.title}</h1>
                            <p className='text-xl font-normal text-[#6B7280]'>{service.description}</p>
                        </div>
                    ))
                }
            </div>
        </div>
    )
}
