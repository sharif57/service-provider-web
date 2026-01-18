
// import React from 'react';
// import { Button } from './ui/button';
// import Image from 'next/image';
// import { ArrowRight } from 'lucide-react';
// import Icon from './icon';
// import Link from 'next/link';

// export default function Hero() {
//   return (
//     <div
//       className="container mx-auto lg:rounded-xl rounded-none  p-0 sm:p-6 md:p-8 lg:p-10 relative"
//       style={{
//         backgroundImage: "url('/image/hero.png')",
//         backgroundSize: 'cover',
//         backgroundPosition: 'center',
//         width: '100%',
//         minHeight: '70vh', 
//         display: 'flex',
//         height: '750px',
//         alignItems: 'center'
//       }}
//     >
//       <div  className="flex flex-col lg:flex-row justify-between items-center w-full h-full gap-6">
//         <div className="lg:w-1/2 space-y-4 md:space-y-6 text-center lg:text-left relative">
//           <div className="absolute right-0 top-[-20px] sm:top-[-30px] md:top-[-40px] lg:top-[-10px]">
//             <Icon />
//           </div>
//           <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-[#4B5563] leading-10 sm:leading-12 md:leading-14 lg:leading-[4.5rem] relative">
//             Create Accurate Offers. <br />
//             Manage Your Projects. All in One Place
//           </h1>
//           <p className="text-lg sm:text-xl md:text-2xl font-medium text-[#4B5563]">
//             Veloo is your smart toolkit for offer generation, task tracking, and customer follow-up — without the back-and-forth
//           </p>
//           {/* <Link id="services" href={'/dashboard'}> */}
//             <Button
//               title="Get Started Now"
//               className="bg-[#059669] cursor-pointer text-base sm:text-lg font-medium px-4 py-4 sm:px-6 sm:py-6 rounded-md shadow-2xl hover:bg-[#047857] text-white transition-colors flex items-center justify-center mx-auto lg:mx-0"
//             >
//               Get Started Now
//               <ArrowRight className="size-5 sm:size-6 ml-2" />
//             </Button>
//           {/* </Link> */}
//         </div>
//         <div className="lg:w-1/2 flex justify-center lg:justify-end">
//           <Image
//             src="/image/men.svg"
//             alt="hero"
//             width={660}
//             height={500}
//             className="w-full max-w-[300px] sm:max-w-[400px] md:max-w-[500px] lg:max-w-[660px] h-auto"
//             priority
//           />
//         </div>
//       </div>
//     </div>
//   );
// }

"use client";

import React, { useState, useEffect } from "react";
import { Button } from "./ui/button";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import Icon from "./icon";
import AuthModal from "./authModal/authModal"; // Make sure your AuthModal accepts open/onOpenChange
import { useRouter } from "next/navigation";

export default function Hero() {
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const router = useRouter();

  // Function to check if user is logged in
  const isUserLoggedIn = () => {
    // Example: check token in localStorage or cookies
    const token = localStorage.getItem("accessToken"); // adjust if you store token in cookies
    return !!token;
  };

  const handleGetStarted = () => {
    if (isUserLoggedIn()) {
      // If logged in, navigate to dashboard
      router.push("/dashboard");
    } else {
      // If not logged in, open sign-in modal
      setAuthModalOpen(true);
    }
  };

  return (
    <div
      className="container mx-auto lg:rounded-xl rounded-none p-0 sm:p-6 md:p-8 lg:p-10 relative"
      style={{
        backgroundImage: "url('/image/hero.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        width: "100%",
        minHeight: "70vh",
        display: "flex",
        height: "750px",
        alignItems: "center",
      }}
    >
      <div className="flex flex-col lg:flex-row justify-between items-center w-full h-full gap-6">
        <div className="lg:w-1/2 space-y-4 md:space-y-6 text-center lg:text-left relative">
          <div className="absolute right-0 top-[-20px] sm:top-[-30px] md:top-[-40px] lg:top-[-10px]">
            <Icon />
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-[#4B5563] leading-10 sm:leading-12 md:leading-14 lg:leading-[4.5rem] relative">
            Create Accurate Offers. <br />
            Manage Your Projects. All in One Place
          </h1>
          <p className="text-lg sm:text-xl md:text-2xl font-medium text-[#4B5563]">
            Veloo is your smart toolkit for offer generation, task tracking, and customer follow-up — without the back-and-forth
          </p>

          <Button
            title="Get Started Now"
            className="bg-[#059669] cursor-pointer text-base sm:text-lg font-medium px-4 py-4 sm:px-6 sm:py-6 rounded-md shadow-2xl hover:bg-[#047857] text-white transition-colors flex items-center justify-center mx-auto lg:mx-0"
            onClick={handleGetStarted}
          >
            Get Started Now
            <ArrowRight className="size-5 sm:size-6 ml-2" />
          </Button>

          {/* Sign-In Modal */}
          <AuthModal open={authModalOpen} onOpenChange={setAuthModalOpen} />
        </div>

        <div className="lg:w-1/2 flex justify-center lg:justify-end">
          <Image
            src="/image/men.svg"
            alt="hero"
            width={660}
            height={500}
            className="w-full max-w-[300px] sm:max-w-[400px] md:max-w-[500px] lg:max-w-[660px] h-auto"
            priority
          />
        </div>
      </div>
    </div>
  );
}
