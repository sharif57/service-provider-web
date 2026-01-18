'use client';
import React from 'react'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import {
    DropdownMenu,
    DropdownMenuTrigger,
    DropdownMenuContent,
    DropdownMenuItem,
} from '@/components/ui/dropdown-menu'
import Link from 'next/link';

export default function Offers() {

    const [searchQuery, setSearchQuery] = useState('')
    const [selectedFilter, setSelectedFilter] = useState('Accepted Offers')

    // Sample filter options
    const filterOptions = ['Accepted Offers', 'Pending Offers', 'Rejected Offers']

    // Placeholder function for search (can be expanded with actual filtering logic)
    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchQuery(e.target.value)
        // Add filtering logic here if needed
        console.log('Searching for:', e.target.value)
    }

    return (
        <div>
            <head>
                <title>Offer Dashboard - Task Management</title>
                <meta name="description" content="Manage and create offers for tasks" />
            </head>
            <div className="  py-4 sm:p-6 flex items-start justify-start">
                <div className="w-full max-w-4xl">
                    {/* Header with Search and Filter */}
                    {/* <div className="flex flex-col sm:flex-row items-center gap-4 mb-6">
                        <input
                            type="text"
                            placeholder="Search by customer name, offer number, or task type..."
                            value={searchQuery}
                            onChange={handleSearch}
                            className="w-full sm:w-auto flex-1 p-2 sm:p-3 border border-gray-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-[#059669] text-sm sm:text-base"
                        />
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button
                                    variant="outline"
                                    className="w-full  sm:w-auto  bg-white border border-gray-300 text-[#059669] hover:bg-[#d1fae6] rounded-lg p-2 sm:p-6 text-sm sm:text-base flex items-center justify-between"
                                >
                                    {selectedFilter}
                                    <span className="ml-2">▼</span>
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent>
                                {filterOptions.map((option) => (
                                    <DropdownMenuItem
                                        key={option}
                                        onClick={() => setSelectedFilter(option)}
                                        className="cursor-pointer hover:bg-gray-100 "
                                    >
                                        {option}
                                    </DropdownMenuItem>
                                ))}
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div> */}

                    {/* Create New Offer Button */}
                    <div className="flex items-center justify-start">
                        <Link href={'/offers/create-offer'} className=''>
                            <Button
                                variant="ghost"
                                className="w-full sm:w-5xl max-w- sm:max-w-md bg-white border cursor-pointer text-[#059669] hover:bg-[#d1fae6] rounded-lg p-4 sm:p-36 border-[#059669] text-lg sm:text-xl font-semibold"
                                onClick={() => console.log('Create New Offer clicked')}
                            >
                                + Create New Offer
                            </Button></Link>
                    </div>
                </div>
            </div>
        </div>
    )
}
