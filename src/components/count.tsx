// // import React from 'react'
// // import Tasks from './icon/Tasks'

// // export default function Count() {

// //   return (
// //     <div>
// //       <div className="p-1 sm:p-6 md:p-8">
// //       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-10">
// //         {/* Card 1 */}
// //         <div className="bg-white flex items-center gap-4 rounded-xl shadow-md px-4 py-6">
// //           <div className="bg-[#e0faef] rounded-2xl p-3 sm:p-4">
// //             <Tasks />
// //           </div>
// //           <div>
// //             <h1 className="text-xl sm:text-2xl lg:text-3xl font-semibold text-[#374151]">
// //               125 ($5000)
// //             </h1>
// //             <p className="text-base sm:text-lg font-normal text-[#4B5563]">
// //               Running Offers
// //             </p>
// //           </div>
// //         </div>

// //         {/* Card 2 */}
// //         <div className="bg-white flex items-center gap-4 rounded-xl shadow-md px-4 py-6">
// //           <div className="bg-[#e0faef] rounded-2xl p-3 sm:p-4">
// //             <Tasks />
// //           </div>
// //           <div>
// //             <h1 className="text-xl sm:text-2xl lg:text-3xl font-semibold text-[#374151]">
// //               125 ($5000)
// //             </h1>
// //             <p className="text-base sm:text-lg font-normal text-[#4B5563]">
// //               Send Offers
// //             </p>
// //           </div>
// //         </div>

// //         {/* Card 3 */}
// //         <div className="bg-white flex items-center gap-4 rounded-xl shadow-md px-4 py-6">
// //           <div className="bg-[#e0faef] rounded-2xl p-3 sm:p-4">
// //             <Tasks  />
// //           </div>
// //           <div>
// //             <h1 className="text-xl sm:text-2xl lg:text-3xl font-semibold text-[#374151]">
// //               125 ($5000)
// //             </h1>
// //             <p className="text-base sm:text-lg font-normal text-[#4B5563]">
// //               Completed Task
// //             </p>
// //           </div>
// //         </div>
// //       </div>
// //     </div>
// //     </div>
// //   )
// // }
// 'use client';
// import React, { useState } from "react";
// import Tasks from "./icon/Tasks";
// import RunningOffer from "./running-offer";
// import SendOffer from "./send-offer";
// import CompleteTask from "./complete-task";

// export default function Count() {
//   const [active, setActive] = useState("running");

//   const selectedBg = "bg-[#D1FAE5]"; // your selected background color

//   return (
//     <div className="p-1 sm:p-6 md:p-8">
//       {/* Cards */}
//       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-10">

//         {/* Card 1 */}
//         <div
//           onClick={() => setActive("running")}
//           className={`${active === "running" ? selectedBg : "bg-white"
//             } cursor-pointer flex items-center gap-4 rounded-xl shadow-md px-4 py-6 hover:shadow-lg transition`}
//         >
//           <div className="bg-[#e0faef] rounded-2xl p-3 sm:p-4">
//             <Tasks />
//           </div>
//           <div>
//             <h1 className="text-xl sm:text-2xl lg:text-3xl font-semibold text-[#374151]">
//               125 ($5000)
//             </h1>
//             <p className="text-base sm:text-lg font-normal text-[#4B5563]">
//               Running Offers
//             </p>
//           </div>
//         </div>

//         {/* Card 2 */}
//         <div
//           onClick={() => setActive("send")}
//           className={`${active === "send" ? selectedBg : "bg-white"
//             } cursor-pointer flex items-center gap-4 rounded-xl shadow-md px-4 py-6 hover:shadow-lg transition`}
//         >
//           <div className="bg-[#e0faef] rounded-2xl p-3 sm:p-4">
//             <Tasks />
//           </div>
//           <div>
//             <h1 className="text-xl sm:text-2xl lg:text-3xl font-semibold text-[#374151]">
//               125 ($5000)
//             </h1>
//             <p className="text-base sm:text-lg font-normal text-[#4B5563]">
//               Send Offers
//             </p>
//           </div>
//         </div>

//         {/* Card 3 */}
//         <div
//           onClick={() => setActive("completed")}
//           className={`${active === "completed" ? selectedBg : "bg-white"
//             } cursor-pointer flex items-center gap-4 rounded-xl shadow-md px-4 py-6 hover:shadow-lg transition`}
//         >
//           <div className="bg-[#e0faef] rounded-2xl p-3 sm:p-4">
//             <Tasks />
//           </div>
//           <div>
//             <h1 className="text-xl sm:text-2xl lg:text-3xl font-semibold text-[#374151]">
//               125 ($5000)
//             </h1>
//             <p className="text-base sm:text-lg font-normal text-[#4B5563]">
//               Completed Task
//             </p>
//           </div>
//         </div>
//       </div>

//       {/* Conditional Content */}
//       <div className="mt-10">
//         {active === "running" && <RunningOffer />}
//         {active === "send" && <SendOffer />}
//         {active === "completed" && <CompleteTask />}
//       </div>
//     </div>
//   );
// }
// components/Count.tsx
'use client';
import React, { useState, useEffect } from "react";
import Tasks from "./icon/Tasks";
import RunningOffer from "./running-offer";
import SendOffer from "./send-offer";
import CompleteTask from "./complete-task";
import { useAllOfferQuery } from "@/redux/feature/offerSlice";

export default function Count() {
  const [active, setActive] = useState("running");

  // Fetch data for all statuses to update card counts
  const { data: pendingData } = useAllOfferQuery({ status: 'Pending', period: '' });
  const { data: acceptedData } = useAllOfferQuery({ status: 'Accepted', period: '' });
  const { data: doneData } = useAllOfferQuery({ status: 'Done', period: '' });

  const getCardData = () => {
    return [
      {
        key: "running",
        title: "Running Offers",
        count: acceptedData?.total_offers || 0,
        total: acceptedData?.total_price || 0,
      },
      {
        key: "send",
        title: "Sent Offers",
        count: pendingData?.total_offers || 0,
        total: pendingData?.total_price || 0,

      },
      {
        key: "completed",
        title: "Completed Tasks",
        count: doneData?.total_offers || 0,
        total: doneData?.total_price || 0,
      },
    ];
  };

  const cardData = getCardData();
  const selectedBg = "bg-[#D1FAE5]";

  return (
    <div className="p-1 sm:p-6 md:p-8">
      {/* Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-10">
        {cardData.map((card) => (
          <div
            key={card.key}
            onClick={() => setActive(card.key)}
            className={`${active === card.key ? selectedBg : "bg-white"
              } cursor-pointer flex items-center gap-4 rounded-xl shadow-md px-4 py-6 hover:shadow-lg transition-all duration-300 border-2 ${active === card.key
                ? 'border-[#059669]'
                : 'border-gray-200 hover:border-gray-300'
              }`}
          >
            <div className="bg-[#e0faef] rounded-2xl p-3 sm:p-4 flex-shrink-0">
              <Tasks />
            </div>
            <div className="flex-1 min-w-0">
              <h1 className="text-xl sm:text-2xl lg:text-3xl font-semibold text-[#374151] truncate">
                {card.count} (${card.total?.toLocaleString() || '0'})
              </h1>
              <p className="text-base sm:text-lg font-normal text-[#4B5563] truncate mt-1">
                {card.title}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Conditional Content */}
      <div className="mt-10">
        {active === "running" && <RunningOffer />}
        {active === "send" && <SendOffer />}
        {active === "completed" && <CompleteTask />}
      </div>
    </div>
  );
}