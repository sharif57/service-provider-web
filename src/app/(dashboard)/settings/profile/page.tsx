// 'use client';
// import { Button } from '@/components/ui/button';
// import { Input } from '@/components/ui/input';
// import { Label } from '@/components/ui/label';
// import { useUserProfileQuery } from '@/redux/feature/userSlice';
// import { Mail, Pencil, Upload } from 'lucide-react';
// import Image from 'next/image';
// import React, { useState, useRef } from 'react';

// export default function Profile() {
//   const [name, setName] = useState('');
//   const [email, setEmail] = useState();
//   const [companyName, setCompanyName] = useState('');
//   const [cvrNumber, setCvrNumber] = useState('');
//   const [bankName, setBankName] = useState('');
//   const [accountNumber, setAccountNumber] = useState('');
//   const [iban, setIban] = useState('');
//   const [swift, setSwift] = useState('');
//   const [loading, setLoading] = useState(false);
//   const [profileImage, setProfileImage] = useState('/image/profile.png');
//   const fileInputRef = useRef<HTMLInputElement>(null);
//   const { data } = useUserProfileQuery(undefined);
//   console.log(data?.data?.user)
//   const user = data?.data?.user;

//   // Handle image upload
//   const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const file = e.target.files?.[0];
//     if (file) {
//       // Validate file type and size
//       const validTypes = ['image/jpeg', 'image/png', 'image/jpg'];
//       if (!validTypes.includes(file.type)) {
//         alert('Please upload a valid image (JPEG, PNG, or JPG)');
//         return;
//       }


//       const reader = new FileReader();
//       reader.onload = () => {
//         setProfileImage(reader.result as string);
//       };
//       reader.readAsDataURL(file);
//     }
//   };

//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault();
//     setLoading(true);
//     // Add your form submission logic here
//     setTimeout(() => setLoading(false), 1000); // Simulate async operation
//   };

//   return (
//     <div className="min-h-screen w-full container mx-auto px-4 py-8 bg-white rounded-lg">
//       <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
//         {/* Image Upload Section */}
//         <div className="flex flex-col items-center gap-4 w-full h-[300px] p-6 rounded-lg lg:w-1/3 bg-[#ECFDF5]">
//           <div className="relative w-48 h-48 md:w-64 md:h-64 rounded-full overflow-hidden ">
//             <Image
//               src={profileImage}
//               alt="Profile"
//               fill
//               className="object-cover relative "
//               sizes="(max-width: 768px) 192px, 256px"
//             />
//           </div>
//           <Button
//             onClick={() => fileInputRef.current?.click()}
//             className="flex items-center gap-2 bg-emerald-600 absolute lg:top-[43%] cursor-pointer hover:bg-emerald-700"
//           >
//             <Pencil className="h-5 w-5" />
//           </Button>
//           <input
//             type="file"
//             ref={fileInputRef}
//             onChange={handleImageUpload}
//             accept="image/jpeg,image/png,image/jpg"
//             className="hidden"
//           />
//         </div>

//         {/* Form Section */}
//         <div className="w-full lg:w-2/3">
//           <form onSubmit={handleSubmit} className="space-y-6">
//             {/* Personal Information */}
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
//                     placeholder="Enter your Name"
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
//                     placeholder="Enter your email"
//                     value={email}
//                     onChange={(e) => setEmail(e.target.value)}
//                     className="pl-12 h-12 bg-gray-50 border-gray-300 rounded-lg text-gray-700 placeholder:text-gray-400 focus:bg-white focus:border-emerald-300 focus:ring-2 focus:ring-emerald-100 transition-all duration-200"
//                     required
//                   />
//                 </div>
//               </div>
//             </div>

//             {/* Company Information */}

//             <div className="space-y-2">
//               <Label htmlFor="companyName" className="text-lg font-semibold text-gray-700">
//                 Company Name
//               </Label>
//               <Input
//                 id="companyName"
//                 type="text"
//                 placeholder="The name of your business as registered"
//                 value={companyName}
//                 onChange={(e) => setCompanyName(e.target.value)}
//                 className="h-12 bg-gray-50 border-gray-300 rounded-lg text-gray-700 placeholder:text-gray-400 focus:bg-white focus:border-emerald-300 focus:ring-2 focus:ring-emerald-100 transition-all duration-200"
//                 required
//               />
//             </div>
//             <div className="space-y-2">
//               <Label htmlFor="cvrNumber" className="text-lg font-semibold text-gray-700">
//                 CVR Number
//               </Label>
//               <Input
//                 id="cvrNumber"
//                 type="text"
//                 placeholder="Company’s unique identification number"
//                 value={cvrNumber}
//                 onChange={(e) => setCvrNumber(e.target.value)}
//                 className="h-12 bg-gray-50 border-gray-300 rounded-lg text-gray-700 placeholder:text-gray-400 focus:bg-white focus:border-emerald-300 focus:ring-2 focus:ring-emerald-100 transition-all duration-200"
//                 required
//               />
//             </div>


//             {/* Bank Information */}
//             <h2 className="text-xl font-semibold text-gray-700 mt-6">Bank Information</h2>
//             <div className="space-y-2">
//               <Label htmlFor="bankName" className="text-lg font-semibold text-gray-700">
//                 Bank Name
//               </Label>
//               <Input
//                 id="bankName"
//                 type="text"
//                 placeholder="Bank of XYZ"
//                 value={bankName}
//                 onChange={(e) => setBankName(e.target.value)}
//                 className="h-12 bg-gray-50 border-gray-300 rounded-lg text-gray-700 placeholder:text-gray-400 focus:bg-white focus:border-emerald-300 focus:ring-2 focus:ring-emerald-100 transition-all duration-200"
//                 required
//               />
//             </div>
//             <div className="space-y-2">
//               <Label htmlFor="accountNumber" className="text-lg font-semibold text-gray-700">
//                 Account Number
//               </Label>
//               <Input
//                 id="accountNumber"
//                 type="text"
//                 placeholder="987654321"
//                 value={accountNumber}
//                 onChange={(e) => setAccountNumber(e.target.value)}
//                 className="h-12 bg-gray-50 border-gray-300 rounded-lg text-gray-700 placeholder:text-gray-400 focus:bg-white focus:border-emerald-300 focus:ring-2 focus:ring-emerald-100 transition-all duration-200"
//                 required
//               />
//             </div>
//             <div className="space-y-2">
//               <Label htmlFor="iban" className="text-lg font-semibold text-gray-700">
//                 IBAN
//               </Label>
//               <Input
//                 id="iban"
//                 type="text"
//                 placeholder="GB29XABC10161234567801"
//                 value={iban}
//                 onChange={(e) => setIban(e.target.value)}
//                 className="h-12 bg-gray-50 border-gray-300 rounded-lg text-gray-700 placeholder:text-gray-400 focus:bg-white focus:border-emerald-300 focus:ring-2 focus:ring-emerald-100 transition-all duration-200"
//                 required
//               />
//             </div>
//             <div className="space-y-2">
//               <Label htmlFor="swift" className="text-lg font-semibold text-gray-700">
//                 SWIFT/BIC
//               </Label>
//               <Input
//                 id="swift"
//                 type="text"
//                 placeholder="DEUTDEFF"
//                 value={swift}
//                 onChange={(e) => setSwift(e.target.value)}
//                 className="h-12 bg-gray-50 border-gray-300 rounded-lg text-gray-700 placeholder:text-gray-400 focus:bg-white focus:border-emerald-300 focus:ring-2 focus:ring-emerald-100 transition-all duration-200"
//                 required
//               />
//             </div>

//             {/* Submit Button */}
//             <Button
//               type="submit"
//               disabled={loading}
//               className="w-full h-12 bg-emerald-600 text-white text-lg font-semibold rounded-lg hover:bg-emerald-700 transition-all duration-200 shadow-lg hover:shadow-xl mt-6"
//             >
//               {loading ? 'Saving Changes...' : 'Save Changes'}
//             </Button>
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// }

'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useUpdateProfileMutation, useUserProfileQuery } from '@/redux/feature/userSlice';
import { Mail, Pencil } from 'lucide-react';
import React, { useState, useRef, useEffect } from 'react';
import { toast } from 'sonner';

export default function Profile() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [cvrNumber, setCvrNumber] = useState('');
  const [bankName, setBankName] = useState('');
  const [accountNumber, setAccountNumber] = useState('');
  const [iban, setIban] = useState('');
  const [swift, setSwift] = useState('');
  const [profileImage, setProfileImage] = useState('/image/profile.png');
  const [loading, setLoading] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const { data } = useUserProfileQuery(undefined);
  const user = data?.data?.user;

  const [updateProfile] = useUpdateProfileMutation();

  // Auto-fill form when API data is loaded
  useEffect(() => {
    if (user) {
      setName(user.full_name || '');
      setEmail(user.email || '');
      setCompanyName(user.company_name || '');
      setCvrNumber(user.cvr_number?.toString() || '');
      setBankName(user.bank_name || '');
      setAccountNumber(user.account_number?.toString() || '');
      setIban(user.iban || '');
      setSwift(user.swift_ibc || '');

      // Profile image from API
      if (user.profile_pic) {
        setProfileImage(`${process.env.NEXT_PUBLIC_API_URL}${user.profile_pic}`);
      }
    }
  }, [user]);

  // Handle image upload and instant preview
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const validTypes = ['image/jpeg', 'image/png', 'image/jpg'];
      if (!validTypes.includes(file.type)) {
        alert('Please upload a JPEG, PNG, or JPG image');
        return;
      }

      const reader = new FileReader();
      reader.onload = () => {
        setProfileImage(reader.result as string); // Show preview
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append('full_name', name);
      formData.append('email', email);
      formData.append('company_name', companyName);
      formData.append('cvr_number', cvrNumber);
      formData.append('bank_name', bankName);
      formData.append('account_number', accountNumber);
      formData.append('iban', iban);
      formData.append('swift_ibc', swift);

      if (fileInputRef.current?.files?.[0]) {
        formData.append('profile_pic', fileInputRef.current.files[0]);
      }
      const res = await updateProfile(formData).unwrap();
      toast.success(res?.message || 'Profile updated successfully!');

    } catch (error: any) {
      toast.error(error?.data?.message || 'Failed to update profile. Please try again.');
    }

    // TODO: Add your API update logic here (FormData for image upload if needed)
    

    setTimeout(() => setLoading(false), 1000); // Simulate async
  };

  return (
    <div className="min-h-screen w-full container mx-auto px-4 py-8 bg-white rounded-lg">
      <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
        {/* Image Upload Section */}
        <div className="flex flex-col items-center gap-4 w-full h-[300px] p-6 rounded-lg lg:w-1/3 bg-[#ECFDF5] relative">
          <div className="relative w-48 h-48 md:w-64 md:h-64 rounded-full overflow-hidden">
            <img
              src={profileImage}
              alt="Profile"
              className="object-cover w-full h-full"
            />
          </div>

          <Button
            onClick={() => fileInputRef.current?.click()}
            className="flex items-center gap-2 bg-emerald-600 absolute lg:top-[43%] cursor-pointer hover:bg-emerald-700"
          >
            <Pencil className="h-5 w-5" />
          </Button>

          <input
            type="file"
            ref={fileInputRef}
            onChange={handleImageUpload}
            accept="image/jpeg,image/png,image/jpg"
            className="hidden"
          />
        </div>

        {/* Form Section */}
        <div className="w-full lg:w-2/3">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Name */}
            <div className="space-y-2">
              <Label>Name</Label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-emerald-600 h-5 w-5" />
                <Input
                  placeholder="Full Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="pl-12 h-12"
                />
              </div>
            </div>

            {/* Email */}
            <div className="space-y-2">
              <Label>Email</Label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-emerald-600 h-5 w-5" />
                <Input
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="pl-12 h-12"
                />
              </div>
            </div>

            {/* Company Name */}
            <div className="space-y-2">
              <Label>Company Name</Label>
              <Input
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
                className="h-12"
              />
            </div>

            {/* CVR Number */}
            <div className="space-y-2">
              <Label>CVR Number</Label>
              <Input
                value={cvrNumber}
                onChange={(e) => setCvrNumber(e.target.value)}
                className="h-12"
              />
            </div>

            {/* Bank Information */}
            <h2 className="text-xl font-semibold mt-6">Bank Information</h2>
            <div className="space-y-2">
              <Label>Bank Name</Label>
              <Input
                value={bankName}
                onChange={(e) => setBankName(e.target.value)}
                className="h-12"
              />
            </div>
            <div className="space-y-2">
              <Label>Account Number</Label>
              <Input
                value={accountNumber}
                onChange={(e) => setAccountNumber(e.target.value)}
                className="h-12"
              />
            </div>
            <div className="space-y-2">
              <Label>IBAN</Label>
              <Input
                value={iban}
                onChange={(e) => setIban(e.target.value)}
                className="h-12"
              />
            </div>
            <div className="space-y-2">
              <Label>SWIFT/BIC</Label>
              <Input
                value={swift}
                onChange={(e) => setSwift(e.target.value)}
                className="h-12"
              />
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              disabled={loading}
              className="w-full h-12 bg-emerald-600 hover:bg-emerald-700"
            >
              {loading ? 'Saving...' : 'Save Changes'}
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}
