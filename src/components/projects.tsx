
'use client';
import React, { useState } from 'react';
import { Button } from './ui/button';
import Project from './taps/project';
import Materials from './taps/materials';
import { useSearchParams } from 'next/navigation';
import { useGetOfferQuery } from '@/redux/feature/chatSlice';
import Quote from './taps/quote';

export default function TaskDashboards() {

    const params = useSearchParams();
    const id = params.get('offer_id')

    const { data } = useGetOfferQuery(id);
    const [isActive, setIsActive] = useState(1);

    // All tabs and Components
    const tabsAndComponents = [
        { id: 1, label: 'Project', content: <Project id={id} /> },
        { id: 2, label: 'Quote', content: <Quote id={id} /> },
        // { id: 4, label: 'Payment', content: <Payment /> },
        { id: 5, label: 'Materials', content: <Materials id={id} /> },
    ];

    return (
        <div className="bg-white p-4 md:p-6 rounded-lg shadow-md mx-auto container ">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                <h1 className="text-2xl md:text-3xl font-bold text-[#022C22]">
                    {data?.customer_name} - {data?.address}
                </h1>
                <Button className="bg-[#ecfdf5] rounded-full text-base md:text-lg font-normal px-4 md:px-8 py-2 md:py-5 text-[#10B981] border border-[#10B981] hover:bg-[#ecfdf5] cursor-pointer">
                    {data?.status}
                </Button>
            </div>
            <div className="mt-6">
                <ul className="flex flex-col md:flex-row items-center gap-2 md:gap-5 overflow-x-auto pb-2">
                    {tabsAndComponents.map((tab) => (
                        <li
                            key={tab.id}
                            className={`${isActive === tab.id && '!border-[#059669] !text-[#059669]'
                                } px-3 md:px-6 py-2 text-sm md:text-base border-b dark:text-[#abc2d3] text-[#424242] transition duration-300 border-transparent cursor-pointer whitespace-nowrap`}
                            onClick={() => setIsActive(tab.id)}
                        >
                            {tab.label}
                        </li>
                    ))}
                    {/* <li><Link href="/offers/message" className="p-4">Message</Link></li> */}
                </ul>
                <div className="mt-4 h-[calc(100%-120px)] overflow-y-auto">
                    {tabsAndComponents.find((tab) => tab.id === isActive)?.content}
                </div>
            </div>
        </div>
    );
}