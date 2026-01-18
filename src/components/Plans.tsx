// "use client";
// import React, { useState } from 'react';
// import { Button } from './ui/button';
// import Link from 'next/link';
// import { useSubscriptionCheckoutMutation, useSubscriptionPlansQuery } from '@/redux/feature/subscriptionSlice';
// import { toast } from 'sonner';

// interface Plan {
//   id: number;
//   name: string;
//   price: number;
//   features: string[];
// }

// export default function Plans() {

//   const [loading, setLoading] = useState(false);
//   const { data } = useSubscriptionPlansQuery(undefined);
//   console.log(data?.results, 'plane')
//   const [subscriptionCheckout] = useSubscriptionCheckoutMutation();

//   const handleCheckout = async (planId: number) => {
//     setLoading(true);
//     try {
//       const res = await subscriptionCheckout({ plan_id: planId }).unwrap();
//       console.log(res);

//       window.location.href = res?.checkout_url;
//       setLoading(false);
//     } catch (error: any) {
//       console.log(error);
//       toast.error(error?.data?.message || "Subscription failed. Please try again.");
//       setLoading(false);
//     }
//   };


//   return (
//     <div id="prices" className="container mx-auto p-4">
//       <h1 className="text-4xl sm:text-5xl md:text-6xl w-full sm:w-1/2 mx-auto leading-tight font-semibold text-[#4B5563] text-center">
//         Affordable Plans for Service Providers
//       </h1>
//       <div className="grid grid-cols-1 lg:grid-cols-3 gap-14 mt-12">
//         {data?.results?.map((plan: Plan) => (
//           <div
//             key={plan?.id}
//             title={plan?.name}
//             className="bg-white p-6 sm:p-10 cursor-pointer hover:bg-[#A7F3D0] hover:duration-1000 rounded-3xl shadow-lg flex flex-col min-h-[400px]"
//             aria-labelledby={`${plan?.name}-title`}
//           >

//             <p className="text-3xl sm:text-4xl font-semibold text-[#374151] mt-2">
//               ${plan.price} <span className="text-base sm:text-lg font-medium">/ month</span>
//             </p>

//             <h2 id={`${plan?.name}-title`} className="text-2xl mt-4 font-semibold text-[#374151]">
//               {plan?.name}
//             </h2>
//             <ul className="flex-1 mt-6 space-y-4">
//               {plan.features.map((feature, index) => (
//                 <li key={index} className="flex items-center gap-4">
//                   <div className="bg-[#D1FAE5] p-2 rounded-full">
//                     <svg
//                       className="w-4 h-4 sm:w-5 sm:h-5"
//                       viewBox="0 0 12 10"
//                       fill="none"
//                       xmlns="http://www.w3.org/2000/svg"
//                       aria-label="Checkmark"
//                       role="img"
//                     >
//                       <path
//                         d="M11.7725 1.83337L6.06833 9.57421C5.93229 9.7547 5.72944 9.87296 5.50535 9.90242C5.28126 9.93188 5.05473 9.87007 4.87667 9.73087L0.803333 6.47421C0.443888 6.18656 0.385685 5.66199 0.673333 5.30254C0.960982 4.94309 1.48555 4.88489 1.845 5.17254L5.24167 7.89004L10.4308 0.84754C10.601 0.592198 10.8977 0.451025 11.2032 0.480071C11.5086 0.509117 11.7734 0.703681 11.8924 0.986517C12.0114 1.26935 11.9653 1.59469 11.7725 1.83337Z"
//                         fill="#059669"
//                       />
//                     </svg>
//                   </div>
//                   <p className="text-base sm:text-lg font-medium text-[#374151]">{feature}</p>
//                 </li>
//               ))}
//             </ul>
//             {/* <Link href={`/subscriptions/place-order?plan=${plan?.id}`} className='cursor-pointer'> */}
//             <Button
//               onClick={() => handleCheckout(plan?.id)}
//               disabled={loading}
//               className="bg-[#059669] text-white cursor-pointer text-base sm:text-lg font-medium px-4 py-4 sm:px-6 sm:py-6 rounded-md shadow-2xl hover:bg-[#047857] transition-colors mt-16 w-full"
//               aria-label={`Choose ${plan?.name} Plan`}
//             >
//               {loading ? "Loading..." : "Choose Plan"}
//             </Button>
//             {/* </Link> */}
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }

"use client";
import React, { useState } from "react";
import { Button } from "./ui/button";
import { useSubscriptionCheckoutMutation, useSubscriptionPlansQuery } from "@/redux/feature/subscriptionSlice";
import { toast } from "sonner";

interface Plan {
  id: number;
  name: string;
  price: number;
  features: string[];
}

export default function Plans() {
  const { data, isLoading: plansLoading } = useSubscriptionPlansQuery(undefined);
  const [subscriptionCheckout] = useSubscriptionCheckoutMutation();

  // Track loading for each plan individually
  const [loadingPlanId, setLoadingPlanId] = useState<number | null>(null);

  const handleCheckout = async (planId: number) => {
    setLoadingPlanId(planId);

    try {
      const res = await subscriptionCheckout({ plan_id: planId }).unwrap();
      window.location.href = res?.checkout_url;
    } catch (error: any) {
      console.log(error);
      toast.error(error?.data?.message || "Subscription failed. Please try again.");
      setLoadingPlanId(null);
    }
  };

  return (
    <div id="prices" className="container mx-auto p-4">
      <h1 className="text-4xl sm:text-5xl md:text-6xl w-full sm:w-1/2 mx-auto leading-tight font-semibold text-[#4B5563] text-center">
        Affordable Plans for Service Providers
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-14 mt-12">
        {plansLoading && <p className="text-center col-span-3">Loading Plans...</p>}

        {data?.results?.map((plan: Plan) => (
          <div
            key={plan?.id}
            className="bg-white p-6 sm:p-10 cursor-pointer hover:bg-[#A7F3D0] hover:duration-1000 rounded-3xl shadow-lg flex flex-col min-h-[420px]"
          >
            <p className="text-3xl sm:text-4xl font-semibold text-[#374151] mt-2">
              ${plan.price}
              <span className="text-base sm:text-lg font-medium"> / month</span>
            </p>

            <h2 className="text-2xl mt-4 font-semibold text-[#374151]">{plan?.name}</h2>

            <ul className="flex-1 mt-6 space-y-4">
              {plan?.features?.map((feature, index) => (
                <li key={index} className="flex items-center gap-4">
                  <div className="bg-[#D1FAE5] p-2 rounded-full">
                    <svg
                      className="w-4 h-4 sm:w-5 sm:h-5"
                      viewBox="0 0 12 10"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M11.7725 1.83337L6.06833 9.57421C5.93229 9.7547 5.72944 9.87296 5.50535 9.90242C5.28126 9.93188 5.05473 9.87007 4.87667 9.73087L0.803333 6.47421C0.443888 6.18656 0.385685 5.66199 0.673333 5.30254C0.960982 4.94309 1.48555 4.88489 1.845 5.17254L5.24167 7.89004L10.4308 0.84754C10.601 0.592198 10.8977 0.451025 11.2032 0.480071C11.5086 0.509117 11.7734 0.703681 11.8924 0.986517C12.0114 1.26935 11.9653 1.59469 11.7725 1.83337Z"
                        fill="#059669"
                      />
                    </svg>
                  </div>
                  <p className="text-base sm:text-lg font-medium text-[#374151]">
                    {feature}
                  </p>
                </li>
              ))}
            </ul>

            <Button
              onClick={() => handleCheckout(plan?.id)}
              disabled={loadingPlanId === plan?.id}
              className="bg-[#059669] text-white text-base sm:text-lg font-medium px-4 py-4 sm:px-6 sm:py-6 rounded-md shadow-2xl hover:bg-[#047857] transition-colors mt-16 w-full"
            >
              {loadingPlanId === plan.id ? "Processing..." : "Choose Plan"}
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
}
