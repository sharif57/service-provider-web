'use client';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Plus, Trash2 } from 'lucide-react';
import React, { useState } from 'react';
import Link from 'next/link';
import { useAllSupplierQuery, useDeleteSupplierMutation } from '@/redux/feature/supplierSlice';
import { toast } from 'sonner';

interface Supplier {
    id: number;
    supplier_name: string;
    image: string;
}

export default function SupplierList() {


    const { data } = useAllSupplierQuery(undefined);
    // console.log(data?.data,'supplier')
    const [deleteSupplier] = useDeleteSupplierMutation();

    const handleDelete = async (id: number) => {
        try {
            const res = await deleteSupplier(id).unwrap();
            console.log(res);
            toast.success(res?.message || "Supplier deleted successfully!");
        } catch (error: any) {
            console.log(error)
            toast.error(error?.data?.message || "Failed to delete supplier. Please try again.");
        }
    };



    return (
        <div className=" bg-white rounded-lg pb-8">
            <div className="container  mx-auto  p-4 md:p-6 ">
                <h2 className="text-lg md:text-xl font-semibold text-gray-700 py-6  bg-[#ECFDF5] px-4 rounded-t-lg mb-10">Suppliers</h2>
                <div className="space-y-2 lg:w-1/4">
                    {data?.data?.map((supplier: Supplier) => (
                        <div
                            key={supplier.id}
                            className="flex items-center justify-between p-4 bg-[#D1FAE5] cursor-pointer rounded-lg hover:bg-green-100 transition-colors duration-200"
                        >
                            <div>
                                {/* <Image
                                    src={supplier?.image}
                                    alt={supplier?.supplier_name}
                                    width={40}
                                    height={40}
                                    className="rounded-full mr-3"
                                /> */}
                                <span className="text-gray-800 font-medium">{supplier?.supplier_name}</span>
                            </div>
                            <div>
                                <Trash2 onClick={() => handleDelete(supplier.id)} className='size-4 hover:text-red-400' />
                            </div>
                        </div>
                    ))}
                </div>

                <div className='flex justify-end mt-10'>
                    <Link href={'/settings/suppliers/add-supplier'}>
                        <Button
                            type="submit"
                            className="bg-[#059669] text-white cursor-pointer  py-6 rounded-lg hover:bg-[#059669] transition-colors duration-200 flex items-center gap-2"
                        >
                            <Plus className="h-5 w-5" />
                            Add Supplier
                        </Button>
                    </Link>
                </div>
            </div>
        </div>
    );
}