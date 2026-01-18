// 'use client'

// import React from 'react'
// import { ChevronRight } from 'lucide-react'
// import Link from 'next/link'

// export default function MenuItems() {
//     const menuItems = [
//         {
//             name: 'Account Information',
//             href: '/settings/profile',
//         },
//         {
//             name: 'Revenue Settings',
//             href: '/settings/revenue',
//         },
//         {
//             name: 'Suppliers',
//             href: '/settings/suppliers',
//         },
//         {
//             name: 'Change Password',
//             href: '/settings/password',
//         }
//         // 'Account Information',
//         // 'Revenue Settings',
//         // 'Suppliers',
//         // 'Change Password',
//     ]

//     return (
//         <div className=" p-4 sm:p-6">
//             <div className="container mx-auto">
//                 <div className=" p-0 sm:p-6 ">
// {menuItems.map((item, index) => (
//     <Link href={item.href}
//         key={index}
//         className="flex items-center justify-between cursor-pointer bg-[#D1FAE5] rounded-lg p-6 mb-3 last:mb-0 hover:bg-green-200 transition-colors duration-200"
//     >
//         <div className="text-green-700 text-base  sm:text-lg font-semibold">{item.name}</div>
//         <ChevronRight className="text-green-700 size-8" />
//     </Link>
// ))}
//                 </div>
//             </div>
//         </div>
//     )
// }

'use client';
import React from 'react';
import { ChevronRight } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import ChangePassword from '@/components/change-password';

export default function MenuItems() {
    const menuItems = [
        {
            name: 'Account Information',
            href: '/settings/profile',
        },
        {
            name: 'Resource',
            href: '/settings/revenue',
        },
        {
            name: 'Suppliers',
            href: '/settings/suppliers',
        },

    ];

    return (
        <div className="p-4 sm:p-6">
            <div className="container mx-auto">
                <div className="space-y-3 sm:space-y-4 p-0 sm:p-6">
                    {menuItems.map((item, index) => (
                        <Link href={item.href}
                            key={index}
                            className="flex items-center justify-between cursor-pointer bg-[#D1FAE5] rounded-lg p-6 mb-3 last:mb-0 hover:bg-green-200 transition-colors duration-200"
                        >
                            <div className="text-green-700 text-base  sm:text-lg font-semibold">{item.name}</div>
                            <ChevronRight className="text-green-700 size-8" />
                        </Link>
                    ))}

                    <ChangePassword
                        trigger={
                            <div className="flex items-center justify-between w-full bg-[#D1FAE5] rounded-lg p-4 sm:p-6 mb-3 sm:mb-4 last:mb-0 hover:bg-green-200 transition-colors duration-200 text-green-700 cursor-pointer">
                                <span className="text-base sm:text-lg font-semibold">
                                    Change Password
                                </span>
                                <ChevronRight className="size-6 sm:size-8" />
                            </div>
                        }
                    />

                </div>
            </div>
        </div>
    );
}