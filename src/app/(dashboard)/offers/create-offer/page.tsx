
// 'use client';

// import { useState } from 'react'
// import { Button } from '@/components/ui/button'
// import { useGenerateOfferMutation, useGetResourceQuery } from '@/redux/feature/chatSlice';
// import { useUserProfileQuery } from '@/redux/feature/userSlice';
// import { toast } from 'sonner';
// import { useDispatch } from 'react-redux';
// import { aiResponse } from '@/redux/feature/authUISlice';
// import { useRouter } from 'next/navigation';

// export default function OfferForm() {
//   const router = useRouter();
//   const dispatch = useDispatch();
//   const { data } = useUserProfileQuery(undefined);
//   const [generateOffer] = useGenerateOfferMutation();

//   const userId = data?.data?.user?.user_id
//   console.log(userId)
//   const { data: resourceData } = useGetResourceQuery(userId);
//   console.log(resourceData, 'resources')

//   const [loading, setLoading] = useState(false);
//   const today = new Date().toISOString().split("T")[0];

//   const [formData, setFormData] = useState({
//     customerName: '',
//     phoneNumber: '',
//     email: '',
//     address: '',
//     explaination: '',
//     projectStart: today,  // default today
//     task: 'Windows/doors',
//     resource: resourceData?.[0]?.name || '',
//   });

//   // handle change
//   const handleChange = (
//     e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
//   ) => {
//     const { name, value } = e.target;

//     if (name === "projectStart" && value === "ASAP") {
//       // auto assign today's date if ASAP
//       setFormData((prev) => ({
//         ...prev,
//         projectStart: today
//       }));
//     } else {
//       setFormData((prev) => ({
//         ...prev,
//         [name]: value
//       }));
//     }
//   };

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setLoading(true);

//     try {
//       const res = await generateOffer({
//         customer_name: formData.customerName,
//         phone_number: formData.phoneNumber,
//         customer_email: formData.email,
//         address: formData.address,
//         project_start: formData.projectStart, 
//         select_task: formData.task,
//         explaination: formData.explaination,
//         message: formData.explaination,
//         user_id: data?.data?.user?.user_id.toString(),
//         timestamp: new Date().toISOString(),
//         resource: formData.resource,
//         // message: 'create an offer',
//       }).unwrap();

//       toast.success(res?.message || "Offer generated successfully!");
//       dispatch(aiResponse(formData));
//       // dispatch(aiResponse(res));
//       // router.push(`/offers/message?offer_id=${res.id}`);
//       router.push(`/offers/message?offer_id=${res.session_id}&message=${res.message}`);
//     } catch (error: any) {
//       toast.error(error?.data?.detail || "Failed to generate offer.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="p-4 sm:p-6 flex items-center justify-start">
//       <div className="w-full max-w-md">
//         <form onSubmit={handleSubmit} className="space-y-4">

//           {/* Customer Name */}
//           <div>
//             <label className="block text-sm font-medium text-gray-700">Customer Name</label>
//             <input
//               type="text"
//               name="customerName"
//               value={formData.customerName}
//               onChange={handleChange}
//               placeholder="Enter customer name"
//               className="mt-1 mt-1 w-full p-2 border rounded-lg bg-white bg-white"
//               required
//             />
//           </div>

//           {/* Phone Number */}
//           <div>
//             <label className="block text-sm font-medium text-gray-700">Phone Number</label>
//             <input
//               type="tel"
//               name="phoneNumber"
//               value={formData.phoneNumber}
//               onChange={handleChange}
//               placeholder="Enter phone number"
//               className="mt-1 mt-1 w-full p-2 border rounded-lg bg-white bg-white"
//               required
//             />
//           </div>
//           {/* email */}
//           <div>
//             <label className="block text-sm font-medium text-gray-700">Email</label>
//             <input
//               type="email"
//               name="email"
//               value={formData.email}
//               onChange={handleChange}
//               placeholder="Enter email"
//               className="mt-1 mt-1 w-full p-2 border rounded-lg bg-white bg-white"
//               required
//             />
//           </div>

//           {/* Address */}
//           <div>
//             <label className="block text-sm font-medium text-gray-700">Address</label>
//             <input
//               type="text"
//               name="address"
//               value={formData.address}
//               onChange={handleChange}
//               placeholder="Enter address"
//               className="mt-1 mt-1 w-full p-2 border rounded-lg bg-white bg-white"
//               required
//             />
//           </div>

//           {/* Explanation */}
//           <div>
//             <label className="block text-sm font-medium text-gray-700">Explanation</label>
//             <textarea
//               name="explaination"
//               value={formData.explaination}
//               onChange={handleChange}
//               placeholder="Enter explanation"
//               className="mt-1 mt-1 w-full p-2 border rounded-lg bg-white bg-white"
//               required
//             />
//           </div>

//           {/* Project Start → Date Picker */}
//           <div>
//             <label className="block text-sm font-medium text-gray-700">Project Start</label>
//             <input
//               type="date"
//               name="projectStart"
//               value={formData.projectStart}
//               onChange={handleChange}
//               className="mt-1 mt-1 w-full p-2 border rounded-lg bg-white bg-white"
//               required
//             />
//           </div>

//           {/* add resource */}
//           <div>
//             <label className="block text-sm font-medium text-gray-700">Select Resource</label>
//             <select
//               name="resource"
//               value={formData.resource}
//               onChange={handleChange}
//               className="mt-1 mt-1 w-full p-2 border rounded-lg bg-white bg-white"
//               required
//             >
//               {
//                 resourceData?.map((resource: any, index: number) => (
//                   <option key={index} value={resource.name}>
//                     {resource.name}
//                   </option>
//                 ))
//               }

//             </select>
//           </div>

//           {/* Select Task */}
//           <div>
//             <label className="block text-sm font-medium text-gray-700">Select Task</label>
//             <select
//               name="task"
//               value={formData.task}
//               onChange={handleChange}
//               className="mt-1 mt-1 w-full p-2 border rounded-lg bg-white bg-white"
//               required
//             >
//               <option value="Windows/doors">Windows/doors</option>
//               <option value="Plumbing">Terrace</option>
//               <option value="Garage">Garage</option>
//               <option value="Isolation">Isolation</option>
//               <option value="Roofing">Roofing</option>
//               <option value="Flooring">Flooring</option>
//               <option value="House extension">House extension</option>
//               <option value="Kitchen">Kitchen</option>
//             </select>
//           </div>

//           {/* Submit */}
//           <Button
//             type="submit"
//             disabled={loading}
//             className="w-full bg-[#059669] text-white hover:bg-[#047857] p-2 rounded-lg font-semibold"
//           >
//             {loading ? "Generating Offer..." : "Generate Offer"}
//           </Button>

//         </form>
//       </div>
//     </div>
//   );
// }
'use client';

import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { useGenerateOfferMutation, useGetResourceQuery } from '@/redux/feature/chatSlice';
import { useUserProfileQuery } from '@/redux/feature/userSlice';
import { toast } from 'sonner';
import { useDispatch } from 'react-redux';
import { aiResponse } from '@/redux/feature/authUISlice';
import { useRouter } from 'next/navigation';

export default function OfferForm() {
  const router = useRouter();
  const dispatch = useDispatch();

  const { data: userData } = useUserProfileQuery(undefined);
  const userId = userData?.data?.user?.user_id;

  const { data: resourceData = [] } = useGetResourceQuery(userId);
  const [generateOffer] = useGenerateOfferMutation();

  const today = new Date().toISOString().split('T')[0];
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    customerName: '',
    phoneNumber: '',
    email: '',
    address: '',
    explaination: '',
    projectStart: today,
    task: 'Windows/doors',
    resource: '',
  });

  /* ✅ Auto select first resource when API data loads */
  useEffect(() => {
    if (resourceData.length > 0 && !formData.resource) {
      setFormData((prev) => ({
        ...prev,
        resource: resourceData[0].name,
      }));
    }
  }, [resourceData, formData.resource]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await generateOffer({
        customer_name: formData.customerName,
        phone_number: formData.phoneNumber,
        customer_email: formData.email,
        address: formData.address,
        project_start: formData.projectStart,
        select_task: formData.task,
        explaination: formData.explaination,
        message: formData.explaination,
        user_id: userId?.toString(),
        resource: formData.resource,
        timestamp: new Date().toISOString(),
      }).unwrap();

      toast.success(res?.message || 'Offer generated!');
      dispatch(aiResponse(formData));
      router.push(`/offers/message?offer_id=${res.session_id}&message=${res.message}`);
    } catch (error: any) {
      toast.error(error?.data?.detail || 'Failed to generate offer');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4 sm:p-6 flex justify-start">
      <div className="w-full max-w-md">
        <form onSubmit={handleSubmit} className="space-y-4">

          {/* Customer Name */}
          <input
            name="customerName"
            placeholder="Customer Name"
            className="mt-1 w-full p-2 border rounded-lg bg-white"
            onChange={handleChange}
            required
          />

          {/* Phone */}
          <input
            name="phoneNumber"
            placeholder="Phone Number"
            className="mt-1 w-full p-2 border rounded-lg bg-white"
            onChange={handleChange}
            required
          />

          {/* Email */}
          <input
            type="email"
            name="email"
            placeholder="Email"
            className="mt-1 w-full p-2 border rounded-lg bg-white"
            onChange={handleChange}
            required
          />

          {/* Address */}
          <input
            name="address"
            placeholder="Address"
            className="mt-1 w-full p-2 border rounded-lg bg-white"
            onChange={handleChange}
            required
          />

          {/* Explanation */}
          <textarea
            name="explaination"
            placeholder="Explanation"
            className="mt-1 w-full p-2 border rounded-lg bg-white"
            onChange={handleChange}
            required
          />

          {/* Project Start */}
          <input
            type="date"
            name="projectStart"
            value={formData.projectStart}
            className="mt-1 w-full p-2 border rounded-lg bg-white"
            onChange={handleChange}
          />

          {/* ✅ Resource (default auto-selected) */}
          <select
            name="resource"
            value={formData.resource}
            onChange={handleChange}
            className="mt-1 w-full p-2 border rounded-lg bg-white"
            required
          >
            {resourceData.map((res: any) => (
              <option key={res.id} value={res.name}>
                {res.name}
              </option>
            ))}
          </select>

          {/* ✅ Task (fixed values) */}
          <select
            name="task"
            value={formData.task}
            onChange={handleChange}
            className="mt-1 w-full p-2 border rounded-lg bg-white"
          >
            <option value="Windows/doors">Windows / Doors</option>
            <option value="Plumbing">Plumbing</option>
            <option value="Garage">Garage</option>
            <option value="Isolation">Isolation</option>
            <option value="Roofing">Roofing</option>
            <option value="Flooring">Flooring</option>
            <option value="House extension">House Extension</option>
            <option value="Kitchen">Kitchen</option>
          </select>

          <Button disabled={loading} className="w-full bg-emerald-600 hover:bg-emerald-700">
            {loading ? 'Generating...' : 'Generate Offer'}
          </Button>

        </form>
      </div>
    </div>
  );
}
