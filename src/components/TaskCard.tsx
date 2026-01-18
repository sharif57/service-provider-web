// components/TaskCard.tsx
'use client';
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
    Calendar,
    MapPin,
    User,
    Package,
    Clock,
    DollarSign,
    Clock3,
    FileText
} from 'lucide-react';
import Link from 'next/link';
import { Task } from './types/task';
import { useToggleOfferStatusMutation } from '@/redux/feature/chatSlice';
import { toast } from 'sonner';
import { useAllOfferQuery } from '@/redux/feature/offerSlice';

interface TaskCardProps {
    task: Task;
    status: string;
}

export default function TaskCard({ task, status }: TaskCardProps) {
    const formatPrice = (price: number) => `$${price.toLocaleString()}`;
    const { data, refetch } = useAllOfferQuery(status);

    const [toggleOfferStatus] = useToggleOfferStatusMutation();

    
    const handleToggleOfferStatus = async (taskId: string, currentStatus: string) => {
        try {
            const updatedStatus = currentStatus === "Pending"
                ? "Accepted"
                : "Done";

            const res = await toggleOfferStatus({
                offer_id: taskId,
                status: updatedStatus
            }).unwrap();
            await refetch();
            console.log(res);
            toast.success(res?.message || "Offer status updated successfully!");
        } catch (error: any) {
            toast.error(error?.data?.message || "Failed to update offer status.");
            console.error('Error updating offer status:', error);
        }
    };


    return (
        <Card className="bg-card border-[#059669] shadow-sm hover:shadow-md transition-shadow hover:duration-300 cursor-pointer">
            <CardHeader className="pb-3">
                <div className="flex justify-between items-start gap-2">
                    <CardTitle className="text-lg sm:text-xl font-medium text-[#4B5563] max-w-[70%] line-clamp-2">
                        {task.task_description.length > 80
                            ? `${task.task_description.substring(0, 80)}...`
                            : task.task_description
                        }
                    </CardTitle>
                    <Badge variant="default" className="bg-[#059669] text-white text-xs">
                        {task.status}
                    </Badge>
                </div>
                <p className="text-sm sm:text-base flex items-center gap-2 text-[#4B5563] font-normal">
                    <Clock3 className="text-[#059669] w-4 h-4 sm:w-5 sm:h-5" />
                    <span className="truncate">{task.time}</span>
                </p>
            </CardHeader>
            <CardContent className="space-y-3">
                <div className="flex items-center gap-2">
                    <User className="text-[#059669] w-4 h-4 sm:w-5 sm:h-5" />
                    <span className="text-base sm:text-lg font-medium text-[#6B7280] truncate">
                        Customer:
                    </span>
                    <span className="text-sm sm:text-base font-normal text-muted-foreground truncate max-w-[120px]">
                        {task.customer_name}
                    </span>
                </div>
                <div className="flex items-center gap-2">
                    <MapPin className="text-[#059669] w-4 h-4 sm:w-5 sm:h-5" />
                    <span className="text-base sm:text-lg font-medium text-[#6B7280] truncate">
                        Location:
                    </span>
                    <span className="text-sm sm:text-base font-normal text-muted-foreground truncate max-w-[120px]">
                        {task.address}
                    </span>
                </div>
                <div className="flex items-center gap-2">
                    <User className="text-[#059669] w-4 h-4 sm:w-5 sm:h-5" />
                    <span className="text-base sm:text-lg font-medium text-[#6B7280]">
                        Resource:
                    </span>
                    <span className="text-sm sm:text-base font-normal text-muted-foreground">
                        {task.resource}
                    </span>
                </div>
                <div className="flex items-center gap-2">
                    <Package className="text-[#059669] w-4 h-4 sm:w-5 sm:h-5" />
                    <span className="text-base sm:text-lg font-medium text-[#6B7280]">
                        Materials ordered:
                    </span>
                    <Badge
                        variant={task.materials_ordered ? 'default' : 'secondary'}
                        className="text-xs ml-1"
                    >
                        {task.materials_ordered ? 'Yes' : 'No'}
                    </Badge>
                </div>
                <div className="flex items-center gap-2">
                    <Clock className="text-[#059669] w-4 h-4 sm:w-5 sm:h-5" />
                    <span className="text-base sm:text-lg font-medium text-[#6B7280]">
                        Estimated Time:
                    </span>
                    <span className="text-sm sm:text-base font-normal text-muted-foreground">
                        {task.time}
                    </span>
                </div>
                <div className="grid grid-cols-2 gap-4">
                    <div className="flex items-center gap-2">
                        <DollarSign className="text-[#059669] w-4 h-4 sm:w-5 sm:h-5" />
                        <span className="text-sm font-medium text-[#6B7280]">
                            Total:
                        </span>
                        <span className="text-sm font-semibold text-[#059669]">
                            {formatPrice(task.price.Total)}
                        </span>
                    </div>
                    <div className="flex items-center gap-2">
                        <DollarSign className="text-[#059669] w-4 h-4 sm:w-5 sm:h-5" />
                        <span className="text-sm font-medium text-[#6B7280]">
                            Labor:
                        </span>
                        <span className="text-sm font-semibold text-[#059669]">
                            {formatPrice(task.price.Labor)}
                        </span>
                    </div>
                </div>
                <div className="flex flex-col sm:flex-row gap-4 pt-4">
                    <Link href={`/offers/projects?offer_id=${task.id}`} className="flex-1">
                        {/* router.push(`/offers/projects?offer_id=${offerId}`); */}
                        <Button
                            variant="ghost"
                            size="sm"
                            className="w-full gap-2 text-[#047857] font-semibold py-4 sm:py-6 bg-[#D1FAE5] hover:text-white hover:bg-[#047857] transition-all"
                        >
                            <FileText className="w-4 h-4" />
                            View Details
                        </Button>
                    </Link>
                    {/* {status === 'Pending' || status === 'Accepted' && (
                        <Button
                            onClick={() => handleToggleOfferStatus(task.id)}
                            size="sm"
                            className="flex-1 gap-2 text-white font-semibold py-4 sm:py-6 bg-[#059669] hover:bg-[#047857] transition-all"
                        >

                            Accept Offer
                        </Button>
                    )} */}
                    {/* {(status === "Pending" || status === "Accepted") && (
                        <Button
                            onClick={() => handleToggleOfferStatus(task.id)}
                            size="sm"
                            className="flex-1 gap-2 text-white font-semibold py-4 sm:py-6 bg-[#059669] hover:bg-[#047857] transition-all"
                        >
                            Accept Offer
                        </Button>
                    )} */}

                    {(status === "Pending" || status === "Accepted") && (
                        <Button
                            onClick={() => handleToggleOfferStatus(task.id, status)}
                            size="sm"
                            className="flex-1 gap-2 text-white font-semibold py-4 sm:py-6 bg-[#059669] hover:bg-[#047857] transition-all"
                        >
                            {status === "Pending" ? "Accept Offer" : "Complete"}
                        </Button>
                    )}


                </div>
            </CardContent>
        </Card>
    );
}