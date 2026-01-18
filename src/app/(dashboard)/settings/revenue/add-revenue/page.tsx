
// 'use client';
// import { Button } from '@/components/ui/button';
// import { Checkbox } from '@/components/ui/checkbox';
// import { Input } from '@/components/ui/input';
// import { Label } from '@/components/ui/label';
// import { useCreateResourceMutation } from '@/redux/feature/resourceSlice';
// import { Mail, Plus } from 'lucide-react';
// import { useRouter } from 'next/navigation';
// import React, { useState } from 'react';

// export default function AddSupplier() {
//   const router = useRouter();
//   const [name, setName] = useState('');
//   const [email, setEmail] = useState('');
//   const [role, setRole] = useState('');
//   const [phoneNumber, setPhoneNumber] = useState('');
//   const [addToCalendar, setAddToCalendar] = useState(false);
//   const [startTime, setStartTime] = useState('');
//   const [endTime, setEndTime] = useState('');
//   const [availabilityDays, setAvailabilityDays] = useState<string[]>([]);
//   const [loading, setLoading] = useState(false);

//   const [createResource] = useCreateResourceMutation();

//   // Toggle availability days
//   const toggleDay = (day: string) => {
//     setAvailabilityDays((prev) =>
//       prev.includes(day) ? prev.filter((d) => d !== day) : [...prev, day]
//     );
//   };

//   // Handle form submission
//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault();
//     setLoading(true);
//     // Validate form
//     if (!name || !email || !role || !phoneNumber || !startTime || !endTime) {
//       alert('Please fill all required fields.');
//       setLoading(false);
//       return;
//     }
//     // Simulate API call
//     setTimeout(() => {
//       console.log({
//         name,
//         email,
//         role,
//         phoneNumber,
//         addToCalendar,
//         startTime,
//         endTime,
//         availabilityDays,
//       });
//       setLoading(false);
//       // Reset form and navigate back
//       setName('');
//       setEmail('');
//       setRole('');
//       setPhoneNumber('');
//       setAddToCalendar(false);
//       setStartTime('');
//       setEndTime('');
//       setAvailabilityDays([]);
//       router.back();
//     }, 1000);
//   };

//   const days = ['Sat', 'Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri'];

//   return (
//     <div className="  p-4 sm:p-6">
//       <div className="container mx-auto bg-white rounded-lg shadow-sm border border-gray-200">
//         <div className="p-4 sm:p-6">
//           <h2 className="text-lg sm:text-xl font-semibold text-gray-700 py-4 sm:py-6 bg-[#ECFDF5] px-4 rounded-t-lg mb-6 sm:mb-10">
//             Add New Resource
//           </h2>
//           <form onSubmit={handleSubmit} className="space-y-6">
//             <div className="space-y-4">

//               <div className="space-y-2">
//                 <Label htmlFor="name" className="text-lg font-semibold text-gray-700">
//                   Name
//                 </Label>
//                 <div className="relative">
//                   <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 text-emerald-600 h-5 w-5" />
//                   <Input
//                     id="name"
//                     type="text"
//                     placeholder="Enter the name of the resource"
//                     value={name}
//                     onChange={(e) => setName(e.target.value)}
//                     className="pl-12 h-12 bg-gray-50 border-gray-300 rounded-lg text-gray-700 placeholder:text-gray-400 focus:bg-white focus:border-emerald-300 focus:ring-2 focus:ring-emerald-100 transition-all duration-200"
//                     required
//                   />
//                 </div>
//               </div>
//               <div className="space-y-2">
//                 <Label htmlFor="email" className="text-lg font-semibold text-gray-700">
//                   Email
//                 </Label>
//                 <div className="relative">
//                   <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 text-emerald-600 h-5 w-5" />
//                   <Input
//                     id="email"
//                     type="email"
//                     placeholder="Enter the email of the supplier"
//                     value={email}
//                     onChange={(e) => setEmail(e.target.value)}
//                     className="pl-12 h-12 bg-gray-50 border-gray-300 rounded-lg text-gray-700 placeholder:text-gray-400 focus:bg-white focus:border-emerald-300 focus:ring-2 focus:ring-emerald-100 transition-all duration-200"
//                     required
//                   />
//                 </div>
//               </div>
//               <div className="space-y-2">
//                 <Label htmlFor="role" className="text-lg font-semibold text-gray-700">
//                   Role
//                 </Label>
//                 <Input
//                   id="role"
//                   type="text"
//                   placeholder="Specify the role or type of resource"
//                   value={role}
//                   onChange={(e) => setRole(e.target.value)}
//                   className="pl-4 h-12 bg-gray-50 border-gray-300 rounded-lg text-gray-700 placeholder:text-gray-400 focus:bg-white focus:border-emerald-300 focus:ring-2 focus:ring-emerald-100 transition-all duration-200"
//                   required
//                 />
//               </div>
//               <div className="space-y-2">
//                 <Label htmlFor="phoneNumber" className="text-lg font-semibold text-gray-700">
//                   Phone Number
//                 </Label>
//                 <Input
//                   id="phoneNumber"
//                   type="tel"
//                   placeholder="Enter the resource's phone number"
//                   value={phoneNumber}
//                   onChange={(e) => setPhoneNumber(e.target.value)}
//                   className="pl-4 h-12 bg-gray-50 border-gray-300 rounded-lg text-gray-700 placeholder:text-gray-400 focus:bg-white focus:border-emerald-300 focus:ring-2 focus:ring-emerald-100 transition-all duration-200"
//                   required
//                 />
//               </div>
//               <div className="flex items-center gap-2">
//                 <Checkbox
//                   checked={addToCalendar}
//                   onCheckedChange={(checked) => setAddToCalendar(checked === true)}
//                 />
//                 <h1 className="text-lg font-semibold text-[#374151]">Add to Calendar</h1>
//               </div>
//               <div>
//                 <h1 className="text-lg font-semibold text-[#374151] mb-2">Availability</h1>
//               </div>
//               <div className="flex flex-col sm:flex-row items-center gap-4">
//                 <div className="flex items-center gap-4">
//                   <div className="flex flex-col space-y-2">
//                     <label htmlFor="start-time" className="text-sm text-gray-600">
//                       Start Time
//                     </label>
//                     <input
//                       type="time"
//                       id="start-time"
//                       value={startTime}
//                       onChange={(e) => setStartTime(e.target.value)}
//                       className="border border-[#9CA3AF] rounded-lg p-2 sm:p-3 w-full"
//                     />
//                   </div>
//                   <span className="mt-6 text-gray-700 font-medium">To</span>
//                   <div className="flex flex-col space-y-2">
//                     <label htmlFor="end-time" className="text-sm text-gray-600">
//                       End Time
//                     </label>
//                     <input
//                       type="time"
//                       id="end-time"
//                       value={endTime}
//                       onChange={(e) => setEndTime(e.target.value)}
//                       className="border border-[#9CA3AF] rounded-lg p-2 sm:p-3 w-full"
//                     />
//                   </div>
//                 </div>
//                 <div className="w-full sm:w-[400px] mt-8">
//                   <div className="flex justify-between gap-2 items-center bg-[#D1FAE5] rounded-md p-2">
//                     {days.map((day, index) => (
//                       <button
//                         key={index}
//                         className={`flex-1 text-center text-gray-700 text-sm sm:text-base font-medium py-1 sm:py- px-1 rounded-md hover:bg-green-200 transition-colors duration-200 ${availabilityDays.includes(day) ? ' border-2 border-[#059669]' : ''
//                           }`}
//                         onClick={() => toggleDay(day)}
//                       >
//                         {day}
//                       </button>
//                     ))}
//                   </div>
//                 </div>
//               </div>
//             </div>

//             <div className="flex justify-center gap-6 mt-8">
//               <Button
//                 type="button"
//                 onClick={() => {
//                   setName('');
//                   setEmail('');
//                   setRole('');
//                   setPhoneNumber('');
//                   setAddToCalendar(false);
//                   setStartTime('');
//                   setEndTime('');
//                   setAvailabilityDays([]);
//                   router.back();
//                 }}
//                 className="bg-[#D1FAE5] w-[180px] text-[#047857] py-3 sm:py-6 rounded-lg hover:bg-[#059669] hover:text-white transition-colors duration-200 flex items-center justify-center"
//               >
//                 Cancel
//               </Button>
//               <Button
//                 type="submit"
//                 disabled={loading}
//                 className="bg-[#059669] w-[180px] text-white py-3 sm:py-6 rounded-lg hover:bg-emerald-700 transition-colors duration-200 flex items-center justify-center gap-2"
//               >
//                 {loading ? 'Adding...' : 'Add Resource'}
//               </Button>
//             </div>
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// }

'use client';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useCreateResourceMutation } from '@/redux/feature/resourceSlice';
import { Mail, Plus } from 'lucide-react';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import { toast } from 'sonner'; // optional: for nice notifications

export default function AddResource() {
  const router = useRouter();
  const [createResource, { isLoading }] = useCreateResourceMutation();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [role, setRole] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [addToCalendar, setAddToCalendar] = useState(false);
  const [startTime, setStartTime] = useState('09:00'); // default or leave empty
  const [endTime, setEndTime] = useState('17:00');
  const [availabilityDays, setAvailabilityDays] = useState<string[]>([]);

 const days = [
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
  'Sunday'
];


  const toggleDay = (day: string) => {
    setAvailabilityDays(prev =>
      prev.includes(day) ? prev.filter(d => d !== day) : [...prev, day]
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!name || !email || !role || !phoneNumber || !startTime || !endTime) {
      toast.error('Please fill all required fields');
      return;
    }

    // You can change this base date or make it dynamic
    const baseDate = '2025-12-01'; // or use current date

 const payload = {
  name,
  email,
  phone_number: phoneNumber,
  role,
  add_to_calender: addToCalendar,
  start_time: `${startTime}:00`,   // "09:00:00"
  end_time: `${endTime}:00`,       // "17:00:00"
  days: availabilityDays.length > 0 ? availabilityDays : undefined,
};


    console.log('Sending payload:', payload);

    try {
      await createResource(payload).unwrap();
      toast.success('Resource added successfully!');

      // Reset form
      setName('');
      setEmail('');
      setRole('');
      setPhoneNumber('');
      setAddToCalendar(false);
      setStartTime('');
      setEndTime('');
      setAvailabilityDays([]);

      router.back();
    } catch (error: any) {
      console.error('Failed to create resource:', error);
      toast.error(error?.data?.message || 'Failed to add resource');
    }
  };

  return (
    <div className="p-4 sm:p-6">
      <div className="container mx-auto bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="p-4 sm:p-6">
          <h2 className="text-lg sm:text-xl font-semibold text-gray-700 py-6 bg-[#ECFDF5] px-4 rounded-t-lg mb-10">
            Add New Resource
          </h2>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Name */}
            <div className="space-y-2">
              <Label htmlFor="name" className="text-lg font-semibold text-gray-700">
                Name
              </Label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-emerald-600 h-5 w-5" />
                <Input
                  id="name"
                  type="text"
                  placeholder="Enter full name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="pl-12 h-12"
                  required
                />
              </div>
            </div>

            {/* Email */}
            <div className="space-y-2">
              <Label htmlFor="email" className="text-lg font-semibold text-gray-700">
                Email
              </Label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-emerald-600 h-5 w-5" />
                <Input
                  id="email"
                  type="email"
                  placeholder="john@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="pl-12 h-12"
                  required
                />
              </div>
            </div>

            {/* Role */}
            <div className="space-y-2">
              <Label htmlFor="role" className="text-lg font-semibold text-gray-700">
                Role
              </Label>
              <Input
                id="role"
                type="text"
                placeholder="e.g. Electrician, Plumber, Foreman"
                value={role}
                onChange={(e) => setRole(e.target.value)}
                className="h-12"
                required
              />
            </div>

            {/* Phone Number */}
            <div className="space-y-2">
              <Label htmlFor="phone" className="text-lg font-semibold text-gray-700">
                Phone Number
              </Label>
              <Input
                id="phone"
                type="tel"
                placeholder="01885950111"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                className="h-12"
                required
              />
            </div>

            {/* Add to Calendar Checkbox */}
            <div className="flex items-center space-x-3">
              <Checkbox
                checked={addToCalendar}
                onCheckedChange={(checked) => setAddToCalendar(checked === true)}
              />
              <Label className="text-lg font-medium cursor-pointer">
                Add to Calendar
              </Label>
            </div>

            {/* Availability Time & Days */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-700">Availability</h3>

              <div className="flex flex-col sm:flex-row gap-6 items-end">
                <div className="flex items-center gap-4">
                  <div>
                    <label className="block text-sm text-gray-600 mb-1">Start Time</label>
                    <input
                      type="time"
                      value={startTime}
                      onChange={(e) => setStartTime(e.target.value)}
                      className="border border-gray-300 rounded-lg px-4 py-3 w-full"
                      required
                    />
                  </div>
                  <span className="text-gray-600 font-medium">to</span>
                  <div>
                    <label className="block text-sm text-gray-600 mb-1">End Time</label>
                    <input
                      type="time"
                      value={endTime}
                      onChange={(e) => setEndTime(e.target.value)}
                      className="border border-gray-300 rounded-lg px-4 py-3 w-full"
                      required
                    />
                  </div>
                </div>

                {/* Days Selection */}
                <div className="flex flex-wrap gap-2 bg-[#D1FAE5] rounded-lg p-3">
                  {days.map((day) => (
                    <button
                      key={day}
                      type="button"
                      onClick={() => toggleDay(day)}
                      className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${
                        availabilityDays.includes(day)
                          ? 'bg-white text-emerald-700 border-2 border-emerald-500 shadow-sm'
                          : 'text-gray-700 hover:bg-emerald-200'
                      }`}
                    >
                      {day}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Submit Buttons */}
            <div className="flex justify-center gap-6 mt-10">
              <Button
                type="button"
                variant="outline"
                className="w-[180px] py-6"
                onClick={() => router.back()}
              >
                Cancel
              </Button>

              <Button
                type="submit"
                disabled={isLoading}
                className="bg-emerald-600 hover:bg-emerald-700 text-white w-[180px] py-6 flex items-center gap-2"
              >
                <Plus className="h-5 w-5" />
                {isLoading ? 'Adding...' : 'Add Resource'}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}