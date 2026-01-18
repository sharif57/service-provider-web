'use client';

import { useOfferDetailsQuery } from '@/redux/feature/offerSlice';
import { useParams } from 'next/navigation';
import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';

// ----------------------
// INLINE TYPES (ONE PAGE)
// ----------------------
interface BillOfMaterial {
  unit: string;
  price: string;
  category: string;
  material: string;
  quantity: string;
  description: string;
}

interface OfferDetailsType {
  id: string;
  user_id: string;
  customer_name: string;
  phone_number: string;
  address: string;
  task_description: string;
  bill_of_materials: BillOfMaterial[];
  time: string;
  resource: string;
  status: string;
  materials_ordered: boolean;
  price: {
    Labor: number;
    Total: number;
    Materials: number;
  };
  timestamp: string;
  created_at: string;
  updated_at: string;
}

export default function OfferDetails() {
  const params = useParams();
  const id = params.id as string;

  const { data, isLoading, isError } = useOfferDetailsQuery(id);

  if (isLoading) return <p className="text-center py-10">Loading...</p>;
  if (isError) return <p className="text-center py-10 text-red-500">Error fetching data</p>;

  const offer = data as OfferDetailsType;

  return (
    <div className=" p-6 space-y-6">

      <Card>
        <CardHeader>
          <CardTitle className="text-2xl font-semibold">Offer Details</CardTitle>
        </CardHeader>

        <CardContent className="space-y-6">

          {/* Customer + Status */}
          <div className="flex justify-between items-center">
            <p className="text-lg font-medium">{offer.customer_name}</p>
            <Badge variant={offer.status === 'Pending' ? 'destructive' : 'default'}>
              {offer.status}
            </Badge>
          </div>

          <p><span className="font-semibold">Phone:</span> {offer.phone_number}</p>
          <p><span className="font-semibold">Address:</span> {offer.address}</p>

          <Separator />

          {/* Task Description */}
          <div>
            <h3 className="font-bold text-lg mb-1">Task Description</h3>
            <p className="text-gray-700">{offer.task_description}</p>
          </div>

          <Separator />

          {/* Resource + Time */}
          <div className="grid grid-cols-2 gap-4">
            <p><span className="font-semibold">Assigned Resource:</span> {offer.resource}</p>
            <p><span className="font-semibold">Estimated Time:</span> {offer.time}</p>
          </div>

          <Separator />

          {/* Bill of Materials */}
          <div>
            <h3 className="font-bold text-lg mb-2">Bill of Materials</h3>

            <div className="overflow-hidden border rounded-lg">
              <table className="w-full text-left">
                <thead className="bg-gray-100 border-b">
                  <tr>
                    <th className="p-3">Category</th>
                    <th className="p-3">Material</th>
                    <th className="p-3">Qty</th>
                    <th className="p-3">Unit</th>
                    <th className="p-3">Price</th>
                  </tr>
                </thead>

                <tbody>
                  {offer.bill_of_materials.map((item, i) => (
                    <tr key={i} className="border-b hover:bg-gray-50">
                      <td className="p-3">{item.category}</td>
                      <td className="p-3">{item.material}</td>
                      <td className="p-3">{item.quantity}</td>
                      <td className="p-3">{item.unit}</td>
                      <td className="p-3">{item.price}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <Separator />

          {/* Price Summary */}
          <div className="grid grid-cols-3 gap-4">
            <Card className="p-4 text-center">
              <p className="font-semibold">Materials</p>
              <p className="text-xl">${offer.price.Materials}</p>
            </Card>

            <Card className="p-4 text-center">
              <p className="font-semibold">Labor</p>
              <p className="text-xl">${offer.price.Labor}</p>
            </Card>

            <Card className="p-4 text-center bg-green-50 border-green-300">
              <p className="font-semibold">Total</p>
              <p className="text-2xl font-bold text-green-700">${offer.price.Total}</p>
            </Card>
          </div>

          <Separator />

          {/* Metadata */}
          <div className="text-sm text-gray-500">
            <p>Created: {new Date(offer.created_at).toLocaleString()}</p>
            <p>Updated: {new Date(offer.updated_at).toLocaleString()}</p>
          </div>

        </CardContent>
      </Card>

    </div>
  );
}
