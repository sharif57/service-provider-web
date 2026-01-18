
// "use client";

// import React, { useEffect, useRef, useState } from "react";
// import { Button } from "@/components/ui/button";
// import { Card, CardContent } from "@/components/ui/card";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import { Textarea } from "@/components/ui/textarea";
// import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
// import { Send } from "lucide-react";
// import { toast } from "sonner";
// import ChatLog from "@/components/icon/chatLog";
// import ReactMarkdown from "react-markdown";
// import { useGenerateOfferMutation, useGetOfferQuery, useSaveOfferMutation } from "@/redux/feature/chatSlice";
// import { useRouter, useSearchParams } from "next/navigation";
// import { useUserProfileQuery } from "@/redux/feature/userSlice";

// interface FormData {
//   customerName: string;
//   customerEmail: string;
//   phoneNumber?: string;
//   address: string;
//   taskDescription: string;
//   billOfMaterials: string;
//   time: string;
//   price: string | number;
// }

// interface ChatMessage {
//   id: string;
//   content: string | React.ReactNode;
//   sender: "user" | "support";
//   timestamp: Date;
// }

// interface AIResponse {
//   session_id: string;
//   response_type: "message" | "offer";
//   message: string;
//   offer: any;
// }

// function ChatInput({
//   onSubmit,
//   placeholder = "Do you need help with the project...",
//   disabled = false,
// }: {
//   onSubmit: (value: string) => void;
//   placeholder?: string;
//   disabled?: boolean;
// }) {
//   const [inputValue, setInputValue] = useState("");
//   const textareaRef = useRef<HTMLTextAreaElement>(null);

//   useEffect(() => {
//     const textarea = textareaRef.current;
//     if (textarea) {
//       textarea.style.height = "auto";
//       textarea.style.height = `${Math.min(Math.max(textarea.scrollHeight, 48), 120)}px`;
//     }
//   }, [inputValue]);

//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault();
//     if (!inputValue.trim() || disabled) return;

//     onSubmit(inputValue.trim());
//     setInputValue("");
//   };

//   const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
//     if (e.key === "Enter" && !e.shiftKey) {
//       e.preventDefault();
//       handleSubmit(e as unknown as React.FormEvent<HTMLFormElement>);
//     }
//   };

//   return (
//     <div className="px-4 py-2">
//       <form onSubmit={handleSubmit} className="relative">
//         <Textarea
//           ref={textareaRef}
//           value={inputValue}
//           onChange={(e) => setInputValue(e.target.value)}
//           onKeyDown={handleKeyDown}
//           placeholder={placeholder}
//           disabled={disabled}
//           className="
//             w-full text-black bg-white placeholder-gray-500 rounded-xl border border-gray-300
//             px-4 py-6 resize-none transition-all duration-200
//             focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500
//             disabled:opacity-50 disabled:cursor-not-allowed
//             scrollbar-hidden
//           "
//           style={{ minHeight: "90px", maxHeight: "120px" }}
//         />
//         <Button
//           type="submit"
//           disabled={!inputValue.trim() || disabled}
//           className="
//             absolute right-2 bottom-2 p-2 rounded-full
//             bg-emerald-600 text-white hover:bg-emerald-700
//             disabled:bg-gray-300 disabled:text-gray-500 disabled:cursor-not-allowed
//           "
//         >
//           <Send className="h-4 w-4" />
//         </Button>
//       </form>
//     </div>
//   );
// }

// function ServiceRequestForm({
//   response,
//   formData,
//   handleInputChange,
//   handleSaveChanges
// }: {
//   response: AIResponse | null;
//   formData: FormData;
//   handleInputChange: (field: keyof FormData, value: string) => void;
//   handleSaveChanges: () => void;
// }) {
//   const searchParams = useSearchParams();
//   const offerId = searchParams.get("offer_id");
//   const { data: offerData } = useGetOfferQuery(offerId);

//   // Helper function to format bill of materials
//   const formatBillOfMaterials = (billOfMaterials: any) => {
//     if (!billOfMaterials) return '';

//     if (typeof billOfMaterials === 'string') {
//       return billOfMaterials;
//     }

//     if (Array.isArray(billOfMaterials)) {
//       return billOfMaterials.map((item: any) => {
//         if (typeof item === 'string') return `- ${item}`;
//         if (item.material) {
//           return `- ${item.material}: ${item.price} (${item.description})`;
//         }
//         return JSON.stringify(item);
//       }).join('\n');
//     }

//     return JSON.stringify(billOfMaterials, null, 2);
//   };

//   // Determine which data to display
//   let displayData = null;
//   let displayFormData = formData;

//   if (response?.response_type === 'offer' && response.offer) {
//     // Use AI response data
//     displayData = response.offer;
//     displayFormData = {
//       customerName: displayData.customer_name || formData.customerName,
//       customerEmail: displayData.customer_email || formData.customerEmail,
//       address: displayData.address || formData.address,
//       taskDescription: displayData.task_description || formData.taskDescription,
//       billOfMaterials: formatBillOfMaterials(displayData.bill_of_materials || displayData.bill_of_materials_string),
//       time: displayData.time || formData.time,
//       price: displayData.price?.Total || displayData.price || formData.price,
//       phoneNumber: displayData.phone_number || formData.phoneNumber,
//     };
//   } else if (offerData) {
//     // Use offer data from API
//     displayData = offerData;
//     displayFormData = {
//       customerName: offerData.customer_name || formData.customerName,
//       customerEmail: offerData.customer_email || formData.customerEmail,
//       address: offerData.address || formData.address,
//       taskDescription: offerData.task_description || formData.taskDescription,
//       billOfMaterials: formatBillOfMaterials(offerData.bill_of_materials || offerData.bill_of_materials_string),
//       time: offerData.time || formData.time,
//       price: offerData.price?.Total || offerData.price || formData.price,
//       phoneNumber: offerData.phone_number || formData.phoneNumber,
//     };
//   }

//   // If response is a message type, show only the message
//   if (response?.response_type === 'message') {
//     return (
//       <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
//         <p className="text-gray-700">{response.message}</p>
//       </div>
//     );
//   }

//   // If we have data to display (either from AI response or offer data)
//   if (displayData) {
//     return (
//       <Card className="border-emerald-500 bg-white/80 backdrop-blur-sm">
//         <CardContent className="p-4 sm:p-6 space-y-4">
//           <div className="space-y-4">
//             <h3 className="text-lg font-semibold text-emerald-700">
//               {response?.response_type === 'offer' ? 'Updated Offer' : 'Current Offer'}
//             </h3>

//             {/* Customer Name */}
//             <div className="space-y-2">
//               <Label htmlFor="customerName" className="text-sm font-medium text-gray-700">
//                 Customer Name
//               </Label>
//               <Input
//                 id="customerName"
//                 value={displayFormData.customerName}
//                 onChange={(e) => handleInputChange("customerName", e.target.value)}
//                 className="border-gray-300 focus:border-emerald-500 focus:ring-emerald-500"
//               />
//             </div>

//             {/* Email */}
//             <div className="space-y-2">
//               <Label htmlFor="customerEmail" className="text-sm font-medium text-gray-700">
//                 Email
//               </Label>
//               <Input
//                 id="customerEmail"
//                 value={displayFormData.customerEmail}
//                 onChange={(e) => handleInputChange("customerEmail", e.target.value)}
//                 className="border-gray-300 focus:border-emerald-500 focus:ring-emerald-500"
//               />
//             </div>

//             {/* Phone Number */}
//             <div className="space-y-2">
//               <Label htmlFor="phoneNumber" className="text-sm font-medium text-gray-700">
//                 Phone Number
//               </Label>
//               <Input
//                 id="phoneNumber"
//                 value={displayFormData.phoneNumber || ''}
//                 onChange={(e) => handleInputChange("phoneNumber", e.target.value)}
//                 className="border-gray-300 focus:border-emerald-500 focus:ring-emerald-500"
//               />
//             </div>

//             {/* Address */}
//             <div className="space-y-2">
//               <Label htmlFor="address" className="text-sm font-medium text-gray-700">
//                 Address
//               </Label>
//               <Input
//                 id="address"
//                 value={displayFormData.address}
//                 onChange={(e) => handleInputChange("address", e.target.value)}
//                 className="border-gray-300 focus:border-emerald-500 focus:ring-emerald-500"
//               />
//             </div>

//             {/* Task Description */}
//             <div className="space-y-2">
//               <Label htmlFor="taskDescription" className="text-sm font-medium text-gray-700">
//                 Task Description
//               </Label>
//               <Textarea
//                 id="taskDescription"
//                 value={displayFormData.taskDescription}
//                 onChange={(e) => handleInputChange("taskDescription", e.target.value)}
//                 className="min-h-[80px] border-gray-300 focus:border-emerald-500 focus:ring-emerald-500 resize-none"
//               />
//             </div>

//             {/* Bill of Materials */}
//             <div className="space-y-2">
//               <Label htmlFor="billOfMaterials" className="text-sm font-medium text-gray-700">
//                 Bill of Materials
//               </Label>
//               <div className="p-2 bg-gray-100 rounded-md border border-gray-300 max-h-60 overflow-y-auto">
//                 <ReactMarkdown>
//                   {displayFormData.billOfMaterials}
//                 </ReactMarkdown>
//               </div>
//             </div>

//             {/* Time & Price */}
//             <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
//               <div className="space-y-2">
//                 <Label htmlFor="time" className="text-sm font-medium text-gray-700">
//                   Time
//                 </Label>
//                 <Input
//                   id="time"
//                   value={displayFormData.time}
//                   onChange={(e) => handleInputChange("time", e.target.value)}
//                   className="border-gray-300 focus:border-emerald-500 focus:ring-emerald-500"
//                 />
//               </div>

//               <div className="space-y-2">
//                 <Label htmlFor="price" className="text-sm font-medium text-gray-700">
//                   Price
//                 </Label>
//                 <Input
//                   id="price"
//                   value={displayFormData.price}
//                   onChange={(e) => handleInputChange("price", e.target.value)}
//                   className="border-gray-300 focus:border-emerald-500 focus:ring-emerald-500"
//                 />
//               </div>
//             </div>

//             {/* Save Button */}
//             <Button
//               onClick={handleSaveChanges}
//               className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-medium py-2 rounded-lg transition-colors"
//             >
//               Save Changes
//             </Button>
//           </div>
//         </CardContent>
//       </Card>
//     );
//   }

//   // return (
//   //   <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
//   //     <p className="text-gray-700">Loading offer data...</p>
//   //   </div>
//   // );
// }

// export default function ServiceRequestPage() {
//   const searchParams = useSearchParams();
//   const offerId = searchParams.get("offer_id");
//   const initialMessage = searchParams.get("message");
//   const { data: offer, isLoading: isOfferLoading } = useGetOfferQuery(offerId, {
//     skip: !offerId,
//   });
//   const router = useRouter();
//   const [saveOffer] = useSaveOfferMutation();
//   const [generateOffer] = useGenerateOfferMutation();
//   const { data: dataUser } = useUserProfileQuery(undefined);

//   const [currentResponse, setCurrentResponse] = useState<AIResponse | null>(null);
//   const [formData, setFormData] = useState<FormData>({
//     customerName: '',
//     customerEmail: '',
//     address: '',
//     taskDescription: '',
//     billOfMaterials: '',
//     time: '',
//     price: '',
//   });

//   const [chatMessages, setChatMessages] = useState<ChatMessage[]>([]);
//   const [isLoading, setIsLoading] = useState(false);
//   const chatContainerRef = useRef<HTMLDivElement>(null);

//   const [localData, setLocalData] = useState<any>(null);

//   // Load data from localStorage on component mount
//   useEffect(() => {
//     const storedData = localStorage.getItem('offer');
//     if (storedData) {
//       try {
//         const parsedData = JSON.parse(storedData);
//         setLocalData(parsedData);
        
//         // Initialize form data from localStorage if available
//         if (parsedData) {
//           setFormData({
//             customerName: parsedData.customer_name || '',
//             customerEmail: parsedData.customer_email || '',
//             phoneNumber: parsedData.phone_number || '',
//             address: parsedData.address || '',
//             taskDescription: parsedData.task_description || '',
//             billOfMaterials: Array.isArray(parsedData.bill_of_materials)
//               ? parsedData.bill_of_materials.map((item: any) => {
//                   if (typeof item === 'string') return `- ${item}`;
//                   if (item.material) {
//                     return `- ${item.material}: ${item.price} (${item.description})`;
//                   }
//                   return JSON.stringify(item);
//                 }).join('\n')
//               : parsedData.bill_of_materials_string || '',
//             time: parsedData.time || '',
//             price: parsedData.price?.Total || parsedData.price || '',
//           });
//         }
//       } catch (error) {
//         console.error('Error parsing localStorage data:', error);
//       }
//     }
//   }, []);

//   // Initialize chat with initial message and offer data
//   useEffect(() => {
//     if (isOfferLoading) return;

//     const newChatMessages: ChatMessage[] = [];

//     // Add initial AI message if it exists in URL
//     if (initialMessage) {
//       const initialAIMessage: ChatMessage = {
//         id: "initial-ai-message",
//         content: initialMessage,
//         sender: "support",
//         timestamp: new Date(),
//       };
//       newChatMessages.push(initialAIMessage);
//     }

//     // Add offer form when offer data is loaded
//     if (offer || localData) {
//       // Use localStorage data if available, otherwise use API data
//       const dataSource = localData || offer;
      
//       // Initialize form data
//       const initialFormData = {
//         customerName: dataSource.customer_name || '',
//         customerEmail: dataSource.customer_email || '',
//         address: dataSource.address || '',
//         taskDescription: dataSource.task_description || '',
//         billOfMaterials: Array.isArray(dataSource.bill_of_materials)
//           ? dataSource.bill_of_materials.map((item: any) => {
//               if (typeof item === 'string') return `- ${item}`;
//               if (item.material) {
//                 return `- ${item.material}: ${item.price} (${item.description})`;
//               }
//               return JSON.stringify(item);
//             }).join('\n')
//           : dataSource.bill_of_materials_string || '',
//         time: dataSource.time || '',
//         price: dataSource.price?.Total || dataSource.price || '',
//         phoneNumber: dataSource.phone_number || '',
//       };

//       setFormData(initialFormData);

//       const offerMessage: ChatMessage = {
//         id: "initial-offer",
//         content: (
//           <ServiceRequestForm
//             response={null}
//             formData={initialFormData}
//             handleInputChange={handleInputChange}
//             handleSaveChanges={handleSaveChanges}
//           />
//         ),
//         sender: "support",
//         timestamp: new Date(),
//       };
//       newChatMessages.push(offerMessage);
//     }

//     // Only set chat messages if we have something to show
//     if (newChatMessages.length > 0 && chatMessages.length === 0) {
//       setChatMessages(newChatMessages);
//     }
//   }, [offer, isOfferLoading, initialMessage, localData]);

//   useEffect(() => {
//     const chatContainer = chatContainerRef.current;
//     if (chatContainer) chatContainer.scrollTop = chatContainer.scrollHeight;
//   }, [chatMessages]);

//   // Update form data when we receive a new offer response
//   useEffect(() => {
//     if (currentResponse?.response_type === 'offer' && currentResponse.offer) {
//       const data = currentResponse.offer;
//       const billOfMaterials = Array.isArray(data.bill_of_materials)
//         ? data.bill_of_materials.map((item: any) => {
//             if (typeof item === 'string') return `- ${item}`;
//             if (item.material) {
//               return `- ${item.material}: ${item.price} (${item.description})`;
//             }
//             return JSON.stringify(item);
//           }).join('\n')
//         : data.bill_of_materials_string || '';

//       setFormData(prev => ({
//         ...prev,
//         customerName: data.customer_name || prev.customerName,
//         customerEmail: data.customer_email || prev.customerEmail,
//         phoneNumber: data.phone_number || prev.phoneNumber,
//         address: data.address || prev.address,
//         taskDescription: data.task_description || prev.taskDescription,
//         billOfMaterials: billOfMaterials,
//         time: data.time || prev.time,
//         price: data.price?.Total || data.price || prev.price,
//       }));
//     }
//   }, [currentResponse]);

//   function handleInputChange(field: keyof FormData, value: string) {
//     setFormData((prev) => ({ ...prev, [field]: value }));
//   }

//   async function handleSaveChanges() {
//     if (!offerId) {
//       toast.error("No offer ID found");
//       return;
//     }

//     try {
//       // Get the latest data to save - prioritize currentResponse, then localStorage, then API
//       const latestData = currentResponse?.response_type === 'offer'
//         ? currentResponse.offer
//         : localData || offer;

//       // Prepare the data structure for saving
//       const saveData = {
//         customer_name: formData.customerName,
//         phone_number: formData.phoneNumber || latestData?.phone_number || '',
//         address: formData.address,
//         customer_email: formData.customerEmail,
//         task_description: formData.taskDescription,
//         bill_of_materials_string: formData.billOfMaterials,
//         bill_of_materials: latestData?.bill_of_materials || 
//           (formData.billOfMaterials 
//             ? formData.billOfMaterials.split('\n').map((item: string) => ({ 
//                 material: item.replace(/^-\s*/, '').trim(),
//                 description: 'Updated via form'
//               })) 
//             : []),
//         time: formData.time,
//         price: {
//           Total: typeof formData.price === 'string' 
//             ? parseFloat(formData.price.replace(/[^0-9.-]+/g, "")) || 0 
//             : formData.price,
//           Materials: latestData?.price?.Materials || 0,
//           Labor: latestData?.price?.Labor || 0
//         },
//         user_id: dataUser?.data?.user?.user_id?.toString() || latestData?.user_id || '11',
//         offer_id: offerId,
//         project_start: latestData?.project_start || new Date().toISOString().split('T')[0],
//         select_task: latestData?.select_task || 'Windows/doors',
//         resource: latestData?.resource || 'premium',
//         timestamp: new Date().toISOString(),
//         session_id: currentResponse?.session_id || offerId || '',
//         status: latestData?.status || 'Pending',
//         materials_ordered: latestData?.materials_ordered || false,
//       };

//       // Save to API
//       const res = await saveOffer(saveData).unwrap();
//       toast.success(res?.message || "Offer saved successfully!");
      
//       // Also update localStorage with the saved data
//       localStorage.setItem('offer', JSON.stringify(saveData));
//       setLocalData(saveData);
      
//       router.push(`/offers/projects?offer_id=${res?.offer_id}`);
//     } catch (error: any) {
//       console.error('Save error:', error);
//       toast.error(error?.data?.detail || error?.message || "Failed to save offer");
//     }
//   }

//   async function handleSendMessage(message: string) {
//     if (!message.trim()) return;

//     // Add user message immediately
//     const userMessage: ChatMessage = {
//       id: Date.now().toString(),
//       content: message,
//       sender: "user",
//       timestamp: new Date(),
//     };

//     setChatMessages((prev) => [...prev, userMessage]);
//     setIsLoading(true);

//     try {
//       // Send message to AI
//       const response = await generateOffer({
//         session_id: offerId || "",
//         user_id: dataUser?.data?.user?.user_id.toString() || "11",
//         message: message
//       }).unwrap();

//       console.log('AI Response:', response);
//       setCurrentResponse(response);
      
//       // Save to localStorage
//       if (response?.offer) {
//         localStorage.setItem('offer', JSON.stringify(response.offer));
//         setLocalData(response.offer);
//       }

//       // Add AI response to chat
//       const supportMessage: ChatMessage = {
//         id: (Date.now() + 1).toString(),
//         content: (
//           <ServiceRequestForm
//             response={response}
//             formData={formData}
//             handleInputChange={handleInputChange}
//             handleSaveChanges={handleSaveChanges}
//           />
//         ),
//         sender: "support",
//         timestamp: new Date(),
//       };
//       setChatMessages((prev) => [...prev, supportMessage]);
//     } catch (error) {
//       console.error('Error sending message:', error);
//       toast.error("Failed to send message. Please try again.");
//     } finally {
//       setIsLoading(false);
//     }
//   }

//   // if (isOfferLoading && !localData) {
//   //   return (
//   //     <div className="flex items-center justify-center min-h-screen">
//   //       <div className="text-lg text-gray-600">Loading offer data...</div>
//   //     </div>
//   //   );
//   // }

//   return (
//     <div>
//       <div className="flex flex-col min-h-screen">
//       <div className="flex-1 p-4 sm:p-6 overflow-hidden">
//         <div className="mx-auto max-w-4xl h-full flex flex-col">
//           <Card className="backdrop-blur-sm flex-1 flex flex-col">
//             <CardContent className="p-4 sm:p-6 flex-1 flex flex-col">
//               <div
//                 ref={chatContainerRef}
//                 className="flex-1 space-y-3 overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent"
//               >
//                 {chatMessages.length === 0 ? (
//                   <div className="flex items-center justify-center h-full">
//                     <div className="text-gray-500">Loading chat...</div>
//                   </div>
//                 ) : (
//                   chatMessages.map((message) => (
//                     <div
//                       key={message.id}
//                       className={`flex items-start gap-3 ${message.sender === "user" ? "flex-row-reverse" : ""
//                         }`}
//                     >
//                       {message.sender === "support"  && (
//                         <Avatar className="w-8 h-8 flex-shrink-0">
//                           <AvatarImage src="/support-agent.png" alt="Support Agent" />
//                           <AvatarFallback className="bg-emerald-100 text-emerald-700 text-xs">
//                             <ChatLog />
//                           </AvatarFallback>
//                         </Avatar>
//                       )}
//                       <div className="max-w-[85%] sm:max-w-[70%]">
//                         {typeof message.content === "string" ? (
//                           <div
//                             className={`px-4 py-2 rounded-2xl text-sm ${message.sender === "support"
//                               ? "bg-emerald-500 text-white rounded-bl-none"
//                               : "bg-[#059669] text-white rounded-br-none"
//                               }`}
//                           >
//                             {message.content}
//                           </div>
//                         ) : (
//                           message.content
//                         )}
//                         <div className="text-xs text-gray-500 mt-1 mb-8">
//                           {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
//                         </div>
//                       </div>
//                     </div>
//                   ))
//                 )}
//                 {isLoading && (
//                   <div className="flex items-start gap-3">
//                     <Avatar className="w-8 h-8 flex-shrink-0">
//                       <AvatarImage src="/support-agent.png" alt="Support Agent" />
//                       <AvatarFallback className="bg-emerald-100 text-emerald-700 text-xs">
//                         <ChatLog />
//                       </AvatarFallback>
//                     </Avatar>
//                     <div className="max-w-[85%] sm:max-w-[70%]">
//                       <div className="px-4 py-2 rounded-2xl text-sm bg-emerald-500 text-white rounded-bl-none">
//                         <div className="flex space-x-2">
//                           <div className="w-2 h-2 bg-white rounded-full animate-bounce"></div>
//                           <div className="w-2 h-2 bg-white rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
//                           <div className="w-2 h-2 bg-white rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
//                         </div>
//                       </div>
//                       <div className="text-xs text-gray-500 mt-1 mb-8">
//                         {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
//                       </div>
//                     </div>
//                   </div>
//                 )}
//               </div>
//             </CardContent>
//           </Card>
//         </div>
//       </div>
//       <div className="fixed bottom-0 lg:w-[48%] w-[90%] lg:left-[58%] left-[50%] transform -translate-x-1/2 z-10">
//         <ChatInput
//           onSubmit={handleSendMessage}
//           placeholder="Do you need help with the project..."
//           disabled={isLoading}
//         />
//       </div>
//     </div>
//     </div>
//   );
// }

"use client";

import React, { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Send } from "lucide-react";
import { toast } from "sonner";
import ChatLog from "@/components/icon/chatLog";
import ReactMarkdown from "react-markdown";
import { useGenerateOfferMutation, useGetOfferQuery, useSaveOfferMutation } from "@/redux/feature/chatSlice";
import { useRouter, useSearchParams } from "next/navigation";
import { useUserProfileQuery } from "@/redux/feature/userSlice";

interface FormData {
  customerName: string;
  customerEmail: string;
  phoneNumber?: string;
  address: string;
  taskDescription: string;
  billOfMaterials: string;
  time: string;
  price: string | number;
}

interface ChatMessage {
  id: string;
  content: string | React.ReactNode;
  sender: "user" | "support";
  timestamp: Date;
}

interface AIResponse {
  session_id: string;
  response_type: "message" | "offer";
  message: string;
  offer: any;
}

function ChatInput({
  onSubmit,
  placeholder = "Do you need help with the project...",
  disabled = false,
}: {
  onSubmit: (value: string) => void;
  placeholder?: string;
  disabled?: boolean;
}) {
  const [inputValue, setInputValue] = useState("");
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = "auto";
      textarea.style.height = `${Math.min(Math.max(textarea.scrollHeight, 48), 120)}px`;
    }
  }, [inputValue]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim() || disabled) return;

    onSubmit(inputValue.trim());
    setInputValue("");
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e as unknown as React.FormEvent<HTMLFormElement>);
    }
  };

  return (
    <div className="px-4 py-2">
      <form onSubmit={handleSubmit} className="relative">
        <Textarea
          ref={textareaRef}
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          disabled={disabled}
          className="
            w-full text-black bg-white placeholder-gray-500 rounded-xl border border-gray-300
            px-4 py-6 resize-none transition-all duration-200
            focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500
            disabled:opacity-50 disabled:cursor-not-allowed
            scrollbar-hidden
          "
          style={{ minHeight: "90px", maxHeight: "120px" }}
        />
        <Button
          type="submit"
          disabled={!inputValue.trim() || disabled}
          className="
            absolute right-2 bottom-2 p-2 rounded-full
            bg-emerald-600 text-white hover:bg-emerald-700
            disabled:bg-gray-300 disabled:text-gray-500 disabled:cursor-not-allowed
          "
        >
          <Send className="h-4 w-4" />
        </Button>
      </form>
    </div>
  );
}

function ServiceRequestForm({
  response,
  formData,
  handleInputChange,
  handleSaveChanges
}: {
  response: AIResponse | null;
  formData: FormData;
  handleInputChange: (field: keyof FormData, value: string) => void;
  handleSaveChanges: () => void;
}) {
  const searchParams = useSearchParams();
  const offerId = searchParams.get("offer_id");
  const { data: offerData } = useGetOfferQuery(offerId);

  // Helper function to format bill of materials
  const formatBillOfMaterials = (billOfMaterials: any) => {
    if (!billOfMaterials) return '';

    if (typeof billOfMaterials === 'string') {
      return billOfMaterials;
    }

    if (Array.isArray(billOfMaterials)) {
      return billOfMaterials.map((item: any) => {
        if (typeof item === 'string') return `- ${item}`;
        if (item.material) {
          return `- ${item.material}: ${item.price} (${item.description})`;
        }
        return JSON.stringify(item);
      }).join('\n');
    }

    return JSON.stringify(billOfMaterials, null, 2);
  };

  // Determine which data to display
  let displayData = null;
  let displayFormData = formData;

  if (response?.response_type === 'offer' && response.offer) {
    // Use AI response data
    displayData = response.offer;
    displayFormData = {
      customerName: displayData.customer_name || formData.customerName,
      customerEmail: displayData.customer_email || formData.customerEmail,
      address: displayData.address || formData.address,
      taskDescription: displayData.task_description || formData.taskDescription,
      billOfMaterials: formatBillOfMaterials(displayData.bill_of_materials || displayData.bill_of_materials_string),
      time: displayData.time || formData.time,
      price: displayData.price?.Total || displayData.price || formData.price,
      phoneNumber: displayData.phone_number || formData.phoneNumber,
    };
  } else if (offerData) {
    // Use offer data from API
    displayData = offerData;
    displayFormData = {
      customerName: offerData.customer_name || formData.customerName,
      customerEmail: offerData.customer_email || formData.customerEmail,
      address: offerData.address || formData.address,
      taskDescription: offerData.task_description || formData.taskDescription,
      billOfMaterials: formatBillOfMaterials(offerData.bill_of_materials || offerData.bill_of_materials_string),
      time: offerData.time || formData.time,
      price: offerData.price?.Total || offerData.price || formData.price,
      phoneNumber: offerData.phone_number || formData.phoneNumber,
    };
  }

  // If response is a message type, show only the message
  if (response?.response_type === 'message') {
    return (
      <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
        <p className="text-gray-700">{response.message}</p>
      </div>
    );
  }

  // If we have data to display (either from AI response or offer data)
  if (displayData) {
    return (
      <Card className="border-emerald-500 bg-white/80 backdrop-blur-sm">
        <CardContent className="p-4 sm:p-6 space-y-4">
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-emerald-700">
              {response?.response_type === 'offer' ? 'Updated Offer' : 'Current Offer'}
            </h3>

            {/* Customer Name */}
            <div className="space-y-2">
              <Label htmlFor="customerName" className="text-sm font-medium text-gray-700">
                Customer Name
              </Label>
              <Input
                id="customerName"
                value={displayFormData.customerName}
                onChange={(e) => handleInputChange("customerName", e.target.value)}
                className="border-gray-300 focus:border-emerald-500 focus:ring-emerald-500"
              />
            </div>

            {/* Email */}
            <div className="space-y-2">
              <Label htmlFor="customerEmail" className="text-sm font-medium text-gray-700">
                Email
              </Label>
              <Input
                id="customerEmail"
                value={displayFormData.customerEmail}
                onChange={(e) => handleInputChange("customerEmail", e.target.value)}
                className="border-gray-300 focus:border-emerald-500 focus:ring-emerald-500"
              />
            </div>

            {/* Phone Number */}
            <div className="space-y-2">
              <Label htmlFor="phoneNumber" className="text-sm font-medium text-gray-700">
                Phone Number
              </Label>
              <Input
                id="phoneNumber"
                value={displayFormData.phoneNumber || ''}
                onChange={(e) => handleInputChange("phoneNumber", e.target.value)}
                className="border-gray-300 focus:border-emerald-500 focus:ring-emerald-500"
              />
            </div>

            {/* Address */}
            <div className="space-y-2">
              <Label htmlFor="address" className="text-sm font-medium text-gray-700">
                Address
              </Label>
              <Input
                id="address"
                value={displayFormData.address}
                onChange={(e) => handleInputChange("address", e.target.value)}
                className="border-gray-300 focus:border-emerald-500 focus:ring-emerald-500"
              />
            </div>

            {/* Task Description */}
            <div className="space-y-2">
              <Label htmlFor="taskDescription" className="text-sm font-medium text-gray-700">
                Task Description
              </Label>
              <Textarea
                id="taskDescription"
                value={displayFormData.taskDescription}
                onChange={(e) => handleInputChange("taskDescription", e.target.value)}
                className="min-h-[80px] border-gray-300 focus:border-emerald-500 focus:ring-emerald-500 resize-none"
              />
            </div>

            {/* Bill of Materials */}
            <div className="space-y-2">
              <Label htmlFor="billOfMaterials" className="text-sm font-medium text-gray-700">
                Bill of Materials
              </Label>
              <div className="p-2 bg-gray-100 rounded-md border border-gray-300 max-h-60 overflow-y-auto">
                <ReactMarkdown>
                  {displayFormData.billOfMaterials}
                </ReactMarkdown>
              </div>
            </div>

            {/* Time & Price */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="time" className="text-sm font-medium text-gray-700">
                  Time
                </Label>
                <Input
                  id="time"
                  value={displayFormData.time}
                  onChange={(e) => handleInputChange("time", e.target.value)}
                  className="border-gray-300 focus:border-emerald-500 focus:ring-emerald-500"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="price" className="text-sm font-medium text-gray-700">
                  Price
                </Label>
                <Input
                  id="price"
                  value={displayFormData.price}
                  onChange={(e) => handleInputChange("price", e.target.value)}
                  className="border-gray-300 focus:border-emerald-500 focus:ring-emerald-500"
                />
              </div>
            </div>

            {/* Save Button */}
            <Button
              onClick={handleSaveChanges}
              className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-medium py-2 rounded-lg transition-colors"
            >
              Save Changes
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }
}

export default function ServiceRequestPage() {
  const searchParams = useSearchParams();
  const offerId = searchParams.get("offer_id");
  const initialMessage = searchParams.get("message");
  const { data: offer, isLoading: isOfferLoading } = useGetOfferQuery(offerId, {
    skip: !offerId,
  });
  const router = useRouter();
  const [saveOffer] = useSaveOfferMutation();
  const [generateOffer] = useGenerateOfferMutation();
  const { data: dataUser } = useUserProfileQuery(undefined);

  const [currentResponse, setCurrentResponse] = useState<AIResponse | null>(null);
  const [formData, setFormData] = useState<FormData>({
    customerName: '',
    customerEmail: '',
    address: '',
    taskDescription: '',
    billOfMaterials: '',
    time: '',
    price: '',
  });

  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const chatContainerRef = useRef<HTMLDivElement>(null);

  const [localData, setLocalData] = useState<any>(null);

  // Load data from localStorage on component mount
  useEffect(() => {
    const storedData = localStorage.getItem('offer');
    if (storedData) {
      try {
        const parsedData = JSON.parse(storedData);
        setLocalData(parsedData);

        // Initialize form data from localStorage if available
        if (parsedData) {
          setFormData({
            customerName: parsedData.customer_name || '',
            customerEmail: parsedData.customer_email || '',
            phoneNumber: parsedData.phone_number || '',
            address: parsedData.address || '',
            taskDescription: parsedData.task_description || '',
            billOfMaterials: Array.isArray(parsedData.bill_of_materials)
              ? parsedData.bill_of_materials.map((item: any) => {
                if (typeof item === 'string') return `- ${item}`;
                if (item.material) {
                  return `- ${item.material}: ${item.price} (${item.description})`;
                }
                return JSON.stringify(item);
              }).join('\n')
              : parsedData.bill_of_materials_string || '',
            time: parsedData.time || '',
            price: parsedData.price?.Total || parsedData.price || '',
          });
        }
      } catch (error) {
        console.error('Error parsing localStorage data:', error);
      }
    }
  }, []);

  // Initialize chat with initial message and offer data
  useEffect(() => {
    if (isOfferLoading) return;

    const newChatMessages: ChatMessage[] = [];

    // Add initial AI message if it exists in URL
    if (initialMessage) {
      const initialAIMessage: ChatMessage = {
        id: "initial-ai-message",
        content: initialMessage,
        sender: "support",
        timestamp: new Date(),
      };
      newChatMessages.push(initialAIMessage);
    }

    // Add offer form when offer data is loaded
    if (offer || localData) {
      // Use localStorage data if available, otherwise use API data
      const dataSource = localData || offer;

      // Initialize form data
      const initialFormData = {
        customerName: dataSource.customer_name || '',
        customerEmail: dataSource.customer_email || '',
        address: dataSource.address || '',
        taskDescription: dataSource.task_description || '',
        billOfMaterials: Array.isArray(dataSource.bill_of_materials)
          ? dataSource.bill_of_materials.map((item: any) => {
            if (typeof item === 'string') return `- ${item}`;
            if (item.material) {
              return `- ${item.material}: ${item.price} (${item.description})`;
            }
            return JSON.stringify(item);
          }).join('\n')
          : dataSource.bill_of_materials_string || '',
        time: dataSource.time || '',
        price: dataSource.price?.Total || dataSource.price || '',
        phoneNumber: dataSource.phone_number || '',
      };

      setFormData(initialFormData);

      const offerMessage: ChatMessage = {
        id: "initial-offer",
        content: (
          <ServiceRequestForm
            response={null}
            formData={initialFormData}
            handleInputChange={handleInputChange}
            handleSaveChanges={handleSaveChanges}
          />
        ),
        sender: "support",
        timestamp: new Date(),
      };
      newChatMessages.push(offerMessage);
    }

    // Only set chat messages if we have something to show
    if (newChatMessages.length > 0 && chatMessages.length === 0) {
      setChatMessages(newChatMessages);
    }
  }, [offer, isOfferLoading, initialMessage, localData]);

  useEffect(() => {
    const chatContainer = chatContainerRef.current;
    if (chatContainer) chatContainer.scrollTop = chatContainer.scrollHeight;
  }, [chatMessages]);

  // Update form data when we receive a new offer response
  useEffect(() => {
    if (currentResponse?.response_type === 'offer' && currentResponse.offer) {
      const data = currentResponse.offer;
      const billOfMaterials = Array.isArray(data.bill_of_materials)
        ? data.bill_of_materials.map((item: any) => {
          if (typeof item === 'string') return `- ${item}`;
          if (item.material) {
            return `- ${item.material}: ${item.price} (${item.description})`;
          }
          return JSON.stringify(item);
        }).join('\n')
        : data.bill_of_materials_string || '';

      setFormData(prev => ({
        ...prev,
        customerName: data.customer_name || prev.customerName,
        customerEmail: data.customer_email || prev.customerEmail,
        phoneNumber: data.phone_number || prev.phoneNumber,
        address: data.address || prev.address,
        taskDescription: data.task_description || prev.taskDescription,
        billOfMaterials: billOfMaterials,
        time: data.time || prev.time,
        price: data.price?.Total || data.price || prev.price,
      }));
    }
  }, [currentResponse]);

  function handleInputChange(field: keyof FormData, value: string) {
    setFormData((prev) => ({ ...prev, [field]: value }));
  }

  async function handleSaveChanges() {
    if (!offerId) {
      toast.error("No offer ID found");
      return;
    }

    try {
      // Get the latest data to save - prioritize currentResponse, then localStorage, then API
      const latestData = currentResponse?.response_type === 'offer'
        ? currentResponse.offer
        : localData || offer;

      // Prepare the data structure for saving
      const saveData = {
        customer_name: formData.customerName,
        phone_number: formData.phoneNumber || latestData?.phone_number || '',
        address: formData.address,
        customer_email: formData.customerEmail,
        task_description: formData.taskDescription,
        bill_of_materials_string: formData.billOfMaterials,
        bill_of_materials: latestData?.bill_of_materials ||
          (formData.billOfMaterials
            ? formData.billOfMaterials.split('\n').map((item: string) => ({
              material: item.replace(/^-\s*/, '').trim(),
              description: 'Updated via form'
            }))
            : []),
        time: formData.time,
        price: {
          Total: typeof formData.price === 'string'
            ? parseFloat(formData.price.replace(/[^0-9.-]+/g, "")) || 0
            : formData.price,
          Materials: latestData?.price?.Materials || 0,
          Labor: latestData?.price?.Labor || 0
        },
        user_id: dataUser?.data?.user?.user_id?.toString() || latestData?.user_id || '11',
        offer_id: offerId,
        project_start: latestData?.project_start || new Date().toISOString().split('T')[0],
        select_task: latestData?.select_task || 'Windows/doors',
        resource: latestData?.resource || 'premium',
        timestamp: new Date().toISOString(),
        session_id: currentResponse?.session_id || offerId || '',
        status: latestData?.status || 'Pending',
        materials_ordered: latestData?.materials_ordered || false,
      };

      // Save to API
      const res = await saveOffer(saveData).unwrap();
      toast.success(res?.message || "Offer saved successfully!");

      // Also update localStorage with the saved data
      localStorage.setItem('offer', JSON.stringify(saveData));
      setLocalData(saveData);

      router.push(`/offers/projects?offer_id=${res?.offer_id}`);
    } catch (error: any) {
      console.error('Save error:', error);
      toast.error(error?.data?.detail || error?.message || "Failed to save offer");
    }
  }

  async function handleSendMessage(message: string) {
    if (!message.trim()) return;

    // Add user message immediately
    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      content: message,
      sender: "user",
      timestamp: new Date(),
    };

    setChatMessages((prev) => [...prev, userMessage]);
    setIsLoading(true);

    try {
      // Send message to AI
      const response = await generateOffer({
        session_id: offerId || "",
        user_id: dataUser?.data?.user?.user_id.toString() || "11",
        message: message
      }).unwrap();

      console.log('AI Response:', response);
      setCurrentResponse(response);

      // Save to localStorage
      if (response?.offer) {
        localStorage.setItem('offer', JSON.stringify(response.offer));
        setLocalData(response.offer);
      }

      // Add AI response to chat
      const supportMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        content: (
          <ServiceRequestForm
            response={response}
            formData={formData}
            handleInputChange={handleInputChange}
            handleSaveChanges={handleSaveChanges}
          />
        ),
        sender: "support",
        timestamp: new Date(),
      };
      setChatMessages((prev) => [...prev, supportMessage]);
    } catch (error) {
      console.error('Error sending message:', error);
      toast.error("Failed to send message. Please try again.");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="flex flex-col min-h-screen">
      <div className="flex-1 p-4 sm:p-6 overflow-hidden">
        <div className="mx-auto max-w-4xl h-full flex flex-col">
          <Card className="backdrop-blur-sm flex-1 flex flex-col">
            <CardContent className="p-4 sm:p-6 flex-1 flex flex-col">
              <div
                ref={chatContainerRef}
                className="flex-1 space-y-3 overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent"
              >
                {chatMessages.length === 0 ? (
                  <div className="flex items-center justify-center h-full">
                    <div className="text-gray-500">Loading chat...</div>
                  </div>
                ) : (
                  chatMessages.map((message, index) => (
                    <div
                      key={message.id}
                      className={`flex items-start gap-3 ${message.sender === "user" ? "flex-row-reverse" : ""
                        }`}
                    >
                      {/* Avatar container - only show for support messages AFTER the first 2 messages */}
                      <div className={`${message.sender === "support" && index >= 2 ? "block" : "hidden"}`}>
                        <Avatar className="w-8 h-8 flex-shrink-0">
                          <AvatarImage src="/support-agent.png" alt="Support Agent" />
                          <AvatarFallback className="bg-emerald-100 text-emerald-700 text-xs">
                            <ChatLog />
                          </AvatarFallback>
                        </Avatar>
                      </div>
                      
                      {/* Message content */}
                      <div className="max-w-[85%] sm:max-w-[70%]">
                        {typeof message.content === "string" ? (
                          <div
                            className={`px-4 py-2 rounded-2xl text-sm ${message.sender === "support"
                              ? "bg-emerald-500 text-white rounded-bl-none"
                              : "bg-[#059669] text-white rounded-br-none"
                              }`}
                          >
                            {message.content}
                          </div>
                        ) : (
                          message.content
                        )}
                        <div className="text-xs text-gray-500 mt-1 mb-8">
                          {/* {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} */}
                        </div>
                      </div>
                    </div>
                  ))
                )}
                {isLoading && (
                  <div className="flex items-start gap-3">
                    <Avatar className="w-8 h-8 flex-shrink-0">
                      <AvatarImage src="/support-agent.png" alt="Support Agent" />
                      <AvatarFallback className="bg-emerald-100 text-emerald-700 text-xs">
                        <ChatLog />
                      </AvatarFallback>
                    </Avatar>
                    <div className="max-w-[85%] sm:max-w-[70%]">
                      <div className="px-4 py-2 rounded-2xl text-sm bg-emerald-500 text-white rounded-bl-none">
                        <div className="flex space-x-2">
                          <div className="w-2 h-2 bg-white rounded-full animate-bounce"></div>
                          <div className="w-2 h-2 bg-white rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                          <div className="w-2 h-2 bg-white rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
                        </div>
                      </div>
                      <div className="text-xs text-gray-500 mt-1 mb-8">
                        {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
      <div className="fixed bottom-0 lg:w-[48%] w-[90%] lg:left-[58%] left-[50%] transform -translate-x-1/2 z-10">
        <ChatInput
          onSubmit={handleSendMessage}
          placeholder="Do you need help with the project..."
          disabled={isLoading}
        />
      </div>
    </div>
  );
}