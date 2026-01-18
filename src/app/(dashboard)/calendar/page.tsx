// 'use client'

// import React, { useState } from 'react'
// import { Button } from '@/components/ui/button'
// import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
// import { Badge } from '@/components/ui/badge'
// import {  MapPin, User, Package, Clock, DollarSign, Clock3 } from 'lucide-react'
// import { Calendar, Calendar as CalendarComponent } from '@/components/ui/calendar'
// import { DateRange } from 'react-day-picker'
// import { useUserWiseOfferDateQuery } from '@/redux/feature/chatSlice'

// interface Task {
//     id: string
//     title: string
//     category: string
//     location: string
//     resource: string
//     materialsOrdered: boolean
//     estimatedTime: string
//     totalPrice: string
//     scheduledDate: string
//     completed: boolean
// }

// export default function Calendars() {


//     const [date, setDate] = useState<Date | undefined>(new Date())
//     const [range, setRange] = useState<DateRange | undefined>({
//         from: undefined,
//         to: undefined,
//     });

//         const {data}= useUserWiseOfferDateQuery(date);

//     const mockTasks: Task[] = [
//         {
//             id: '#1201',
//             title: 'Install Ceiling Fan',
//             category: 'Upcoming June-After July',
//             location: '34 Elm Street, NY',
//             resource: 'Esther Howard',
//             materialsOrdered: true,
//             estimatedTime: '1.5 hours',
//             totalPrice: '$200',
//             scheduledDate: '05-07-2026 10:00 (27-07-2026 16:00)',
//             completed: false,
//         },
//         {
//             id: '#1202',
//             title: 'Fix Plumbing',
//             category: 'Ongoing',
//             location: '45 Oak Avenue, NY',
//             resource: 'John Doe',
//             materialsOrdered: false,
//             estimatedTime: '2 hours',
//             totalPrice: '$150',
//             scheduledDate: '01-09-2025 09:00 (01-09-2025 11:00)',
//             completed: false,
//         },
//     ]

//     const handleViewOffer = (taskId: string) => {
//         console.log(`Viewing offer for task ${taskId}`)
//         // Add logic to view offer details
//     }

//     const handleCompleteTask = (taskId: string) => {
//         console.log(`Marking task ${taskId} as completed`)
//         // Add logic to mark task as completed
//     }

//     return (
//         <div className="min-h-screen     p-4 sm:p-6">
//             <div className="mx-auto container flex flex-col lg:flex-row justify-between gap-6">
//                 {/* Calendar Section */}
//                 <div className="w-full lg:w-2/5">
//                     <Card className="bg-white border-gray-200 shadow-sm">
//                         <CardContent className="p-4">
//                             <Calendar
//                                 mode="range"
//                                 selected={range}
//                                 onSelect={setRange}
//                                 numberOfMonths={2}
//                                 className="rounded-md border w-full bg-white shadow-sm"
//                             />
//                         </CardContent>
//                     </Card>

//                 </div>

//                 {/* Task List Section */}
//                 <div className="w-full lg:w-3/5 space-y-4">
//                     {mockTasks.map((task) => (
// <Card
//     key={task.id}
//     className="bg-white border-emerald-500 shadow-sm hover:shadow-md transition-shadow duration-300"
// >
//     <CardHeader className="pb-3">
//         <div className="flex flex-col sm:flex-row justify-between items-start gap-2">
//             <CardTitle className="text-lg sm:text-xl font-medium text-gray-700">
//                 Task {task.id} - {task.title}
//             </CardTitle>
//         </div>
//         <p className="text-sm flex items-center gap-2 text-gray-600">
//             <Clock3 className="text-emerald-600 w-4 h-4" />
//             Scheduled: {task.scheduledDate}
//         </p>
//     </CardHeader>

//     <CardContent className="space-y-3">
//         <div className="flex items-center gap-2">
//             {/* <Calendar className="text-emerald-600 w-4 h-4" /> */}
//             <span className="text-sm font-medium text-gray-700">Category:</span>
//             <span className="text-sm text-gray-600">{task.category}</span>
//         </div>
//         <div className="flex items-center gap-2">
//             <MapPin className="text-emerald-600 w-4 h-4" />
//             <span className="text-sm font-medium text-gray-700">Location:</span>
//             <span className="text-sm text-gray-600">{task.location}</span>
//         </div>
//         <div className="flex items-center gap-2">
//             <User className="text-emerald-600 w-4 h-4" />
//             <span className="text-sm font-medium text-gray-700">Resource:</span>
//             <span className="text-sm text-gray-600">{task.resource}</span>
//         </div>
//         <div className="flex items-center gap-2">
//             <Package className="text-emerald-600 w-4 h-4" />
//             <span className="text-sm font-medium text-gray-700">Materials Ordered:</span>
//             <Badge
//                 variant={task.materialsOrdered ? 'default' : 'secondary'}
//                 className="text-xs"
//             >
//                 {task.materialsOrdered ? 'Yes' : 'No'}
//             </Badge>
//         </div>
//         <div className="flex items-center gap-2">
//             <Clock className="text-emerald-600 w-4 h-4" />
//             <span className="text-sm font-medium text-gray-700">Estimated Time:</span>
//             <span className="text-sm text-gray-600">{task.estimatedTime}</span>
//         </div>
//         <div className="flex items-center gap-2">
//             <DollarSign className="text-emerald-600 w-4 h-4" />
//             <span className="text-sm font-medium text-gray-700">Total Price:</span>
//             <span className="text-sm text-gray-600">{task.totalPrice}</span>
//         </div>
//         <div className="flex flex-col sm:flex-row gap-3 pt-4">
//             <Button
//                 variant="ghost"
//                 size="sm"
//                 className="flex-1  text-emerald-700 font-semibold lg:py-6 py-4 bg-emerald-100 hover:text-white hover:bg-emerald-600 transition-colors"
//                 onClick={() => handleViewOffer(task.id)}
//             >
//                 View Offer
//             </Button>
//             <Button
//                 variant="ghost"
//                 size="sm"
//                 className="flex-1 text-white font-semibold lg:py-6 py-4 bg-emerald-600 hover:bg-emerald-700 transition-colors"
//                 onClick={() => handleCompleteTask(task.id)}
//             >
//                 <svg
//                     width="20"
//                     height="20"
//                     viewBox="0 0 25 24"
//                     fill="none"
//                     xmlns="http://www.w3.org/2000/svg"
//                     className="w-4 h-4 mr-2"
//                 >
//                     <path
//                         d="M2 12.5L6.07574 16.5757C6.31005 16.8101 6.68995 16.8101 6.92426 16.5757L9.5 14"
//                         stroke="white"
//                         strokeWidth="1.5"
//                         strokeLinecap="round"
//                     />
//                     <path
//                         d="M16.5 7L12.5 11"
//                         stroke="white"
//                         strokeWidth="1.5"
//                         strokeLinecap="round"
//                     />
//                     <path
//                         d="M7.5 12L12.0757 16.5757C12.3101 16.8101 12.6899 16.8101 12.9243 16.5757L22.5 7"
//                         stroke="white"
//                         strokeWidth="1.5"
//                         strokeLinecap="round"
//                     />
//                 </svg>
//                 Completed
//             </Button>
//         </div>
//     </CardContent>
// </Card>
//                     ))}
//                 </div>
//             </div>
//         </div>
//     )
// }
'use client'

import React, { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { MapPin, User, Package, Clock, DollarSign, Clock3 } from 'lucide-react'
import { Calendar } from '@/components/ui/calendar'
import { DateRange } from 'react-day-picker'
import { useUserWiseOfferDateQuery } from '@/redux/feature/chatSlice'
import { useUserProfileQuery } from '@/redux/feature/userSlice'
import Link from 'next/link'

export default function Calendars() {

    const { data: userData, refetch } = useUserProfileQuery(undefined)
    const user_id = userData?.data?.user?.user_id


    const [range, setRange] = useState<DateRange | undefined>({
        from: new Date(),
        to: new Date(),
    });

    // Convert date → YYYY-MM-DD
    const formatDate = (d: Date | undefined) =>
        d ? d.toISOString().split("T")[0] : undefined;

    const queryData = {
        user_id: user_id,
        start_date: formatDate(range?.from),
        end_date: formatDate(range?.to),
    };

    const { data, isLoading } = useUserWiseOfferDateQuery(queryData, {
        skip: !range?.from || !range?.to,
    });

    useEffect(() => {
        console.log("API Response:", data);
    }, [data]);

    return (
        <div className="min-h-screen p-4 sm:p-6">
            <div className="mx-auto container flex flex-col lg:flex-row justify-between gap-6">

                {/* Calendar */}
                <div className="w-full lg:w-2/5">
                    <Card className="bg-white border-gray-200 shadow-sm">
                        <CardContent className="p-4">
                            <Calendar
                                mode="range"
                                selected={range}
                                onSelect={setRange}
                                numberOfMonths={2}
                                className="rounded-md border w-full bg-white shadow-sm"
                            />
                        </CardContent>
                    </Card>
                </div>

                {/* Results */}
                <div className="w-full lg:w-3/5 space-y-4">
                    <h2 className="text-xl font-bold">Tasks</h2>

                    {isLoading && <p>Loading offers...</p>}

                    {data?.length === 0 && (
                        <p className="text-gray-600">No tasks found for selected date range.</p>
                    )}

                    {data?.map((task: any) => (
                        // <Card key={task.id} className="bg-white border-emerald-500 shadow-sm">
                        //     <CardHeader>
                        //         <CardTitle>
                        // {task.customer_name} — {task.task_description?.slice(0, 30)}...
                        //         </CardTitle>
                        //     </CardHeader>

                        //     <CardContent>
                        //         <p><b>Phone:</b> {task.phone_number}</p>
                        //         <p><b>Address:</b> {task.address}</p>
                        //         <p><b>Resource:</b> {task.resource}</p>
                        //         <p><b>Start:</b> {task.project_start}</p>
                        //         <p><b>Status:</b> {task.status}</p>
                        //         <p><b>Total Price:</b> {task.price?.Total}</p>

                        //         <Link href={`/dashboard/${task.id}`}>
                        //             <Button className="mt-3 bg-emerald-600 text-white">
                        //                 View Offer
                        //             </Button>
                        //         </Link>
                        //     </CardContent>
                        // </Card>
                        <Card
                            key={task.id}
                            className="bg-white border-emerald-500 shadow-sm hover:shadow-md transition-shadow duration-300"
                        >
                            <CardHeader className="pb-3">
                                <div className="flex flex-col sm:flex-row justify-between items-start gap-2">
                                    <CardTitle className="text-lg sm:text-xl font-medium text-gray-700">
                                        Task {task.customer_name} — {task.task_description?.slice(0, 30)}...
                                    </CardTitle>
                                </div>
                                <p className="text-sm flex items-center gap-2 text-gray-600">
                                    <Clock3 className="text-emerald-600 w-4 h-4" />
                                    Scheduled: {task.project_start}
                                </p>
                            </CardHeader>

                            <CardContent className="space-y-3">
                                <div className="flex items-center gap-2">
                                    {/* <Calendar className="text-emerald-600 w-4 h-4" /> */}
                                    <span className="text-sm font-medium text-gray-700">Phone:</span>
                                    <span className="text-sm text-gray-600">{task.phone_number}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <MapPin className="text-emerald-600 w-4 h-4" />
                                    <span className="text-sm font-medium text-gray-700">Location:</span>
                                    <span className="text-sm text-gray-600">{task.address}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <User className="text-emerald-600 w-4 h-4" />
                                    <span className="text-sm font-medium text-gray-700">Resource:</span>
                                    <span className="text-sm text-gray-600">{task.resource}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Package className="text-emerald-600 w-4 h-4" />
                                    <span className="text-sm font-medium text-gray-700">Materials Ordered:</span>
                                    <Badge
                                        variant={task.materialsOrdered ? 'default' : 'secondary'}
                                        className="text-xs"
                                    >
                                        {task.materialsOrdered ? 'Yes' : 'No'}
                                    </Badge>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Clock className="text-emerald-600 w-4 h-4" />
                                    <span className="text-sm font-medium text-gray-700">Project Start:</span>
                                    <span className="text-sm text-gray-600">{task.project_start}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <DollarSign className="text-emerald-600 w-4 h-4" />
                                    <span className="text-sm font-medium text-gray-700">Total Price:</span>
                                    <span className="text-sm text-gray-600"> {task.price?.Total}</span>
                                </div>
                                <div className="flex flex-col sm:flex-row gap-3 pt-4">
                                    <Link href={`/offers/projects?offer_id=${task.id}`} className="w-full">
                                        {/* /offers/projects?offer_id=${task.id} */}
                                        <Button
                                            variant="ghost"
                                            size="sm"
                                            className="
        w-full
        py-4 lg:py-6
        bg-emerald-100 
        text-emerald-700 
        font-semibold 
        rounded-md
        hover:bg-emerald-600 
        hover:text-white 
        transition-colors 
        duration-200
        shadow-sm
      "
                                        >
                                            View Offer
                                        </Button>
                                    </Link>
                                </div>

                            </CardContent>
                        </Card>
                    ))}
                </div>

            </div>
        </div>
    )
}
