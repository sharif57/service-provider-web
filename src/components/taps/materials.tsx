
import React, { useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import {
  useGetMaterialsOrderedUpdatedMutation,
  useGetOfferQuery,
} from '@/redux/feature/chatSlice';
import { Button } from '../ui/button';
import { toast } from 'sonner';
import SupplierEmailSend from '../supplier-email';


export default function Materials({ id }: any) {
  const [materialsOrdered, setMaterialsOrdered] = useState<boolean>(false);

  const { data } = useGetOfferQuery(id);
  const offerId = data?.id
  const [getMaterialsOrderedUpdated] = useGetMaterialsOrderedUpdatedMutation();

  const handleUpdateStatus = async () => {
    try {
      const res = await getMaterialsOrderedUpdated(id).unwrap();
      setMaterialsOrdered(res.materials_ordered);
      toast.success(res?.message || "Materials ordered updated successfully!");
    } catch (error: any) {
      toast.error(error?.data?.message || "Failed to update materials ordered. Please try again.");
    }
  };

  return (
    <div className=''>
      <div className='overflow-x-auto '>
        {/* Table */}
        <Table className="border ">
          <TableHeader>
            <TableRow>
              <TableHead className="text-[#000000] text-lg font-medium">Category</TableHead>
              <TableHead className="text-[#000000] text-lg font-medium">Material</TableHead>
              <TableHead className="text-[#000000] text-lg font-medium">Price</TableHead>
              <TableHead className="text-[#000000] text-lg font-medium">Description</TableHead>
              <TableHead className="text-[#000000] text-lg font-medium">Unit</TableHead>
              <TableHead className="text-[#000000] text-lg font-medium">Quantity</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data?.bill_of_materials?.map((item: any, index: number) => (
              <TableRow key={index}>
                <TableCell className="font-medium">{item.category}</TableCell>
                <TableCell>{item.material}</TableCell>
                <TableCell className="p-6">{item.price}</TableCell>
                <TableCell className="p-6">{item.description}</TableCell>
                <TableCell className="p-6">{item.unit}</TableCell>
                <TableCell className="p-6">{item.quantity}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        <div className="flex justify-center mt-4">
          
          <SupplierEmailSend offerId={offerId} />
        </div>
      </div>
    </div>
  );
}