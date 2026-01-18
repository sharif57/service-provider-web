// 'use client';
// import React, { useState } from 'react';
// import { Button } from '@/components/ui/button';
// import { Input } from '@/components/ui/input';
// import { Textarea } from '@/components/ui/textarea';
// import { Label } from '@/components/ui/label';
// import { User, Mail } from 'lucide-react';
// import { useCreateQueryMutation } from '@/redux/feature/querySlice';

// interface FormData {
//     name: string;
//     email: string;
//     message: string;
// }


// export default function Support() {

//     const [createQuery] = useCreateQueryMutation();


//     const [formData, setFormData] = useState<FormData>({
//         name: '',
//         email: '',
//         message: '',
//     });

//     const [isSubmitting, setIsSubmitting] = useState(false);

//     const handleInputChange = (field: keyof FormData, value: string) => {
//         setFormData((prev) => ({
//             ...prev,
//             [field]: value,
//         }));
//     };

//     const handleSubmit = async (e: React.FormEvent) => {
//         e.preventDefault();
//         setIsSubmitting(true);

//         // Simulate API call
//         await new Promise((resolve) => setTimeout(resolve, 1000));

//         // Reset form
//         setFormData({
//             name: '',
//             email: '',
//             message: '',
//         });
//         setIsSubmitting(false);
//     };

//     const handleCancel = () => {
//         setFormData({
//             name: '',
//             email: '',
//             message: '',
//         });
//     };


//     return (
//         <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 lg:py-12">
//             <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 lg:gap-[400px]">
//                 {/* Text Section */}
//                 <div className="w-full lg:w-1/2 space-y-4">
//                     <h1 className="text-3xl sm:text-4xl lg:text-5xl font-semibold text-[#059669]">
//                         Get Assistance
//                     </h1>
//                     <p className="text-base sm:text-lg lg:text-xl font-medium text-[#4B5563]">
//                         For any questions, issues, or feedback, feel free to reach out. Our team is available 24/7 to support you.
//                     </p>
//                 </div>

//                 {/* Form Section */}
//                 <div className="w-full lg:w-1/2">
//                     <div className="bg-white rounded-2xl shadow-xl p-6 sm:p-8 transition-shadow hover:shadow-2xl">
//                         <div className="text-center mb-6">
//                             <h2 className="text-xl sm:text-2xl lg:text-3xl font-semibold text-gray-800 mb-2">
//                                 Submit Your Query
//                             </h2>
//                             <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
//                                 Fill out the form below and we’ll get back to you as soon as possible.
//                             </p>
//                         </div>

//                         <form onSubmit={handleSubmit} className="space-y-5" aria-describedby="form-description">
//                             {/* Name Field */}
//                             <div className="space-y-2">
//                                 <Label htmlFor="name" className="text-sm font-medium text-gray-700">
//                                     Name
//                                 </Label>
//                                 <div className="relative">
//                                     <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
//                                     <Input
//                                         id="name"
//                                         type="text"
//                                         placeholder="Enter your full name"
//                                         value={formData.name}
//                                         onChange={(e) => handleInputChange('name', e.target.value)}
//                                         className="pl-10 h-12 border-gray-200 focus:border-emerald-500 focus:ring-emerald-500 rounded-lg"
//                                         required
//                                         aria-required="true"
//                                     />
//                                 </div>
//                             </div>

//                             {/* Email Field */}
//                             <div className="space-y-2">
//                                 <Label htmlFor="email" className="text-sm font-medium text-gray-700">
//                                     Email
//                                 </Label>
//                                 <div className="relative">
//                                     <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
//                                     <Input
//                                         id="email comunidade@grupomaxximus.com.br"
//                                         type="email"
//                                         placeholder="Enter your email"
//                                         value={formData.email}
//                                         onChange={(e) => handleInputChange('email', e.target.value)}
//                                         className="pl-10 h-12 border-gray-200 focus:border-emerald-500 focus:ring-emerald-500 rounded-lg"
//                                         required
//                                         aria-required="true"
//                                     />
//                                 </div>
//                             </div>

//                             {/* Message Field */}
//                             <div className="space-y-2">
//                                 <Label htmlFor="message" className="text-sm font-medium text-gray-700">
//                                     Message
//                                 </Label>
//                                 <Textarea
//                                     id="message"
//                                     placeholder="Let us know how we can assist you"
//                                     value={formData.message}
//                                     onChange={(e) => handleInputChange('message', e.target.value)}
//                                     className="min-h-[120px] resize-none border-gray-200 focus:border-emerald-500 focus:ring-emerald-500 rounded-lg"
//                                     required
//                                     aria-required="true"
//                                 />
//                             </div>

//                             {/* Action Buttons */}
//                             <div className="flex space-x-3 pt-4">
//                                 <Button
//                                     type="button"
//                                     variant="outline"
//                                     onClick={handleCancel}
//                                     className="flex-1 h-12 bg-emerald-50 border-emerald-200 text-emerald-700 hover:bg-emerald-100 hover:border-emerald-300 rounded-lg font-medium"
//                                 >
//                                     Cancel
//                                 </Button>
//                                 <Button
//                                     type="submit"
//                                     disabled={isSubmitting}
//                                     className="flex-1 h-12 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg font-medium disabled:opacity-50"
//                                 >
//                                     {isSubmitting ? 'Submitting...' : 'Submit Query'}
//                                 </Button>
//                             </div>
//                         </form>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// }

'use client';
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { User, Mail } from 'lucide-react';
import { useCreateQueryMutation } from '@/redux/feature/querySlice';
import { toast } from 'sonner';

interface FormData {
    name: string;
    email: string;
    message: string;
}

export default function Support() {
    const [createQuery] = useCreateQueryMutation();

    const [formData, setFormData] = useState<FormData>({
        name: '',
        email: '',
        message: '',
    });

    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleInputChange = (field: keyof FormData, value: string) => {
        setFormData((prev) => ({
            ...prev,
            [field]: value,
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            // Call the RTK Query mutation
            const result = await createQuery(formData).unwrap();
            console.log('Query submitted:', result);
            toast.success(result?.message || 'Your query has been submitted successfully!');

            // Reset the form
            setFormData({
                name: '',
                email: '',
                message: '',
            });
        } catch (error : any) {
            console.error('Error submitting query:', error);
            toast.error(error?.data?.message || 'Failed to submit the query. Please try again.');
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleCancel = () => {
        setFormData({
            name: '',
            email: '',
            message: '',
        });
    };

    return (
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 lg:py-12">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 lg:gap-[400px]">
                {/* Text Section */}
                <div className="w-full lg:w-1/2 space-y-4">
                    <h1 className="text-3xl sm:text-4xl lg:text-5xl font-semibold text-[#059669]">
                        Get Assistance
                    </h1>
                    <p className="text-base sm:text-lg lg:text-xl font-medium text-[#4B5563]">
                        For any questions, issues, or feedback, feel free to reach out. Our team is available 24/7 to support you.
                    </p>
                </div>

                {/* Form Section */}
                <div className="w-full lg:w-1/2">
                    <div className="bg-white rounded-2xl shadow-xl p-6 sm:p-8 transition-shadow hover:shadow-2xl">
                        <div className="text-center mb-6">
                            <h2 className="text-xl sm:text-2xl lg:text-3xl font-semibold text-gray-800 mb-2">
                                Submit Your Query
                            </h2>
                            <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                                Fill out the form below and we’ll get back to you as soon as possible.
                            </p>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-5">
                            {/* Name Field */}
                            <div className="space-y-2">
                                <Label htmlFor="name" className="text-sm font-medium text-gray-700">
                                    Name
                                </Label>
                                <div className="relative">
                                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                                    <Input
                                        id="name"
                                        type="text"
                                        placeholder="Enter your full name"
                                        value={formData.name}
                                        onChange={(e) => handleInputChange('name', e.target.value)}
                                        className="pl-10 h-12 border-gray-200 focus:border-emerald-500 focus:ring-emerald-500 rounded-lg"
                                        required
                                    />
                                </div>
                            </div>

                            {/* Email Field */}
                            <div className="space-y-2">
                                <Label htmlFor="email" className="text-sm font-medium text-gray-700">
                                    Email
                                </Label>
                                <div className="relative">
                                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                                    <Input
                                        id="email"
                                        type="email"
                                        placeholder="Enter your email"
                                        value={formData.email}
                                        onChange={(e) => handleInputChange('email', e.target.value)}
                                        className="pl-10 h-12 border-gray-200 focus:border-emerald-500 focus:ring-emerald-500 rounded-lg"
                                        required
                                    />
                                </div>
                            </div>

                            {/* Message Field */}
                            <div className="space-y-2">
                                <Label htmlFor="message" className="text-sm font-medium text-gray-700">
                                    Message
                                </Label>
                                <Textarea
                                    id="message"
                                    placeholder="Let us know how we can assist you"
                                    value={formData.message}
                                    onChange={(e) => handleInputChange('message', e.target.value)}
                                    className="min-h-[120px] resize-none border-gray-200 focus:border-emerald-500 focus:ring-emerald-500 rounded-lg"
                                    required
                                />
                            </div>

                            {/* Action Buttons */}
                            <div className="flex space-x-3 pt-4">
                                <Button
                                    type="button"
                                    variant="outline"
                                    onClick={handleCancel}
                                    className="flex-1 h-12 bg-emerald-50 border-emerald-200 text-emerald-700 hover:bg-emerald-100 hover:border-emerald-300 rounded-lg font-medium"
                                >
                                    Cancel
                                </Button>
                                <Button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className="flex-1 h-12 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg font-medium disabled:opacity-50"
                                >
                                    {isSubmitting ? 'Submitting...' : 'Submit Query'}
                                </Button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}
