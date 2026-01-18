
'use client';
import React, { useState } from 'react';
import TaskCard from './TaskCard';
import { Send } from 'lucide-react';
import { useAllOfferQuery } from '@/redux/feature/offerSlice';

export default function RunningOffer() {
    const [period, setPeriod] = useState<'today' | 'week' | 'month' | ''>('');

    const { data: sendData, isLoading, error } = useAllOfferQuery(
        { status: 'Accepted', period: period },
        { pollingInterval: 1000 }
    );

    if (error) {
        return (
            <div className="flex flex-col items-center justify-center py-12">
                <Send className="w-12 h-12 text-gray-400 mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-1">
                    Unable to load running offers
                </h3>
                <p className="text-sm text-gray-500">
                    Please check your connection and try again
                </p>
            </div>
        );
    }

    const tasks = sendData?.tasks || [];

    return (
        <div>
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-8 mb-6">
                <h1 className="text-2xl sm:text-3xl font-semibold text-[#4B5563]">
                    Running Offers
                </h1>
                {/* <h1>Today's Task</h1>
                <h1>Weekly Task</h1>
                <h1>Monthly Task</h1> */}

                {/* ✅ Date Filter */}
                <div className="flex flex-col items-start gap-1">
                    {/* <label className="text-sm font-medium text-gray-700">
                        Filter by Date
                    </label> */}

                    <select
                        value={period}
                        onChange={(e) => setPeriod(e.target.value as any)}
                        className="border border-gray-300 rounded-md px-3 py-2 w-48 focus:outline-none focus:ring-2 focus:ring-green-500"
                    >
                        <option value="" disabled>
                            Filter by Period
                        </option>
                        <option value="today">Today</option>
                        <option value="week">This Week</option>
                        <option value="month">This Month</option>
                    </select>

                </div>

            </div>

            {isLoading ? (
                <p className="text-center py-12">Loading...</p>
            ) : tasks.length === 0 ? (
                <div className="text-center py-12">
                    <Send className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 mb-1">
                        No running offers
                    </h3>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {tasks.map((task: any) => (
                        <TaskCard
                            key={task.id}
                            task={task}
                            status="Accepted"
                        />
                    ))}
                </div>
            )}
        </div>
    );
}
