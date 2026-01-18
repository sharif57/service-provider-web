// import React from 'react'

// export default function Notifications() {
//   return (
//     <div>

//     </div>
//   )
// }
'use client';
import { Bell } from 'lucide-react';
import React from 'react';

export default function NotificationList() {
    const notifications = [
        {
            category: 'Task Notifications',
            time: 'Fri, 12:30pm',
            active: true,
        },
        {
            category: 'Offer Notifications',
            time: 'Fri, 12:30pm',
            active: false,
        },
        {
            category: 'System Notifications',
            time: 'Fri, 12:30pm',
            active: false,
        },
        {
            category: 'Calendar Reminders',
            time: 'Fri, 12:30pm',
            active: false,
        },
    ];

    return (
        <div className="min-h-screen bg-[#F0FDF4] p-4 sm:p-6">
            <div className="container mx-auto bg-white rounded-lg">
                <div className="space-y-px">
                    {notifications.map((notification, index) => (
                        <div
                            key={index}
                            className={`flex items-center justify-between p-4 py-6 ${notification.active ? 'bg-[#D1FAE5]' : 'bg-white'
                                } border-b border-gray-100 last:border-b-0 hover:bg-green-50 transition-colors duration-200`}
                        >
                            <div className="flex items-center gap-3">
                                <div className='bg-white border p-3 rounded-full'>
                                    <Bell
                                        className={`h-5 w-5 ${notification.active ? 'text-green-700' : 'text-gray-400'
                                            }`}
                                    />
                                </div>
                                <div className='flex flex-col'>
                                    <span
                                        className={`text-sm sm:text-base font-medium ${notification.active ? 'text-green-700' : 'text-gray-700'
                                            }`}
                                    >
                                        {notification.category}

                                    </span>
                                    <span className="text-xs sm:text-sm text-gray-500">
                                        {notification.time}
                                    </span>
                                </div>
                            </div>

                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}