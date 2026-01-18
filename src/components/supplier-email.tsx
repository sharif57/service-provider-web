// 'use client'

// import React, { useState } from 'react'
// import {
//     useGenerateSupplierEmailMutation,
//     useGetSupplierQuery,
//     useSendEmailMutation,
// } from '@/redux/feature/chatSlice'
// import { useUserProfileQuery } from '@/redux/feature/userSlice'

// import {
//     Dialog,
//     DialogContent,
//     DialogHeader,
//     DialogTitle,
// } from '@/components/ui/dialog'
// import { Button } from '@/components/ui/button'
// import { Textarea } from '@/components/ui/textarea'
// import { Input } from '@/components/ui/input'
// import {
//     Select,
//     SelectContent,
//     SelectItem,
//     SelectTrigger,
//     SelectValue,
// } from '@/components/ui/select'
// import { Label } from './ui/label'
// import { toast } from 'sonner'

// export default function SupplierEmailSend({ offerId }: { offerId: string }) {
//     const { data: user } = useUserProfileQuery(undefined)
//     const userId = user?.data?.user?.user_id

//     const { data: supplierData } = useGetSupplierQuery(userId)
//     const suppliers = supplierData?.suppliers || []

//     const [generateSupplierEmail, { isLoading }] =
//         useGenerateSupplierEmailMutation();

//     const [sendEmail , { isLoading: sending }]  = useSendEmailMutation();

//     const [open, setOpen] = useState(false)
//     const [selectedSupplier, setSelectedSupplier] = useState<any>(null)

//     const [toEmail, setToEmail] = useState('')
//     const [subject, setSubject] = useState('')
//     const [body, setBody] = useState('')

//     const handleEmailClick = async () => {
//         if (!selectedSupplier) {
//             alert('Please select a supplier first')
//             return
//         }

//         try {
//             const res: any = await generateSupplierEmail({
//                 supplier_id: selectedSupplier.supplier_id,
//                 offer_id: offerId,
//             }).unwrap()

//             setToEmail(res.customer_email)
//             setSubject(res.email_subject)
//             setBody(res.email_body)
//             setOpen(true)
//         } catch (error) {
//             console.error('Failed to generate email', error)
//         }
//     }

//     const handleSupplierChange = (supplierId: string) => {
//         const supplier = suppliers.find(
//             (s: any) => s.supplier_id === supplierId
//         )
//         setSelectedSupplier(supplier)
//     }

//     const handleSendEmail = async () => {
//         try {
//             const res = await sendEmail({
//                 to: toEmail,
//                 subject: subject,
//                 body: body,
//             }).unwrap()
//             toast.success(res?.message || 'Email sent successfully!')
//             setOpen(false)
//         } catch (error: any) {
//             console.error('Failed to send email', error)
//             toast.error(error?.data?.message || 'Failed to send email. Please try again.')
//         }
//     }

//     return (
//         <>
//             <div className="bg-[#D1FAE5] p-6 rounded-md space-y-4 w-full md:w-96">

//                 <Button className="bg-[#059669] hover:bg-[#059669]/90 px-10 py-6 text-lg">
//                            Materials Ordered ✅
//                           </Button>
//                 {/* SUPPLIER SELECT */}
//                 <Select
//                     value={selectedSupplier?.supplier_id}
//                     onValueChange={handleSupplierChange}
//                 >
//                     <SelectTrigger className="w-full border border-primary">
//                         <SelectValue placeholder="Select Supplier" />
//                     </SelectTrigger>

//                     <SelectContent className="w-full">
//                         {suppliers.map((supplier: any) => (
//                             <SelectItem
//                                 key={supplier.supplier_id}
//                                 value={supplier.supplier_id}
//                             >
//                                 {supplier.supplier_name}
//                             </SelectItem>
//                         ))}
//                     </SelectContent>
//                 </Select>


//                 {/* BUTTON */}
//                 <Button
//                     onClick={handleEmailClick}
//                     disabled={!selectedSupplier || isLoading}
//                     className="w-full bg-emerald-600 hover:bg-emerald-700"
//                 >
//                     {isLoading ? 'Generating...' : 'Email Supplier'}
//                 </Button>
//             </div>

//             <Dialog open={open} onOpenChange={setOpen}>
//                 <DialogContent className="max-w-2xl h-[550px] overflow-y-auto">
//                     <DialogHeader>
//                         <DialogTitle>Email Supplier</DialogTitle>
//                     </DialogHeader>

//                     <div className="space-y-4">
//                         {/* TO */}
//                         <Label htmlFor="to">To</Label>
//                         <Input
//                             value={toEmail}
//                             onChange={(e) => setToEmail(e.target.value)}
//                             placeholder="To"
//                         />

//                         {/* SUBJECT */}
//                         <Label htmlFor="subject">Subject</Label>
//                         <Input
//                             value={subject}
//                             onChange={(e) => setSubject(e.target.value)}
//                             placeholder="Subject"
//                         />

//                         {/* BODY */}
//                         <Label htmlFor="body">Body</Label>
//                         <Textarea
//                             rows={10}
//                             value={body}
//                             onChange={(e) => setBody(e.target.value)}
//                         />

//                         {/* ACTIONS */}
//                         <div className="flex justify-end gap-3">
//                             <Button variant="outline" onClick={() => setOpen(false)}>
//                                 Cancel
//                             </Button>
//                             <Button
//                                 disabled={!toEmail || !subject || !body || sending}
                                
//                                 onClick={handleSendEmail} className="bg-emerald-600 hover:bg-emerald-700">
//                                 {sending ? 'Sending...' : 'Send email'}
//                             </Button>
//                         </div>
//                     </div>
//                 </DialogContent>
//             </Dialog>
//         </>
//     )
// }
'use client'

import React, { useState } from 'react'
import {
  useGenerateSupplierEmailMutation,
  useGetSupplierQuery,
  useSendEmailMutation,
} from '@/redux/feature/chatSlice'
import { useUserProfileQuery } from '@/redux/feature/userSlice'

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Label } from './ui/label'
import { toast } from 'sonner'

export default function SupplierEmailSend({ offerId }: { offerId: string }) {
  const { data: user } = useUserProfileQuery(undefined)
  const userId = user?.data?.user?.user_id

  const { data: supplierData } = useGetSupplierQuery(userId)
  const suppliers = supplierData?.suppliers || []

  const [generateSupplierEmail, { isLoading }] =
    useGenerateSupplierEmailMutation()
  const [sendEmail, { isLoading: sending }] = useSendEmailMutation()

  /** MODAL STATES */
  const [orderModalOpen, setOrderModalOpen] = useState(false)
  const [emailModalOpen, setEmailModalOpen] = useState(false)

  /** DATA STATES */
  const [selectedSupplier, setSelectedSupplier] = useState<any>(null)
  const [toEmail, setToEmail] = useState('')
  const [subject, setSubject] = useState('')
  const [body, setBody] = useState('')
  const [materialsOrdered, setMaterialsOrdered] = useState(false)

  /** HANDLERS */
  const handleSupplierChange = (supplierId: string) => {
    const supplier = suppliers.find(
      (s: any) => s.supplier_id === supplierId
    )
    setSelectedSupplier(supplier)
  }

  const handleGenerateEmail = async () => {
    if (!selectedSupplier) return

    try {
      const res: any = await generateSupplierEmail({
        supplier_id: selectedSupplier.supplier_id,
        offer_id: offerId,
      }).unwrap()

      setToEmail(res.customer_email)
      setSubject(res.email_subject)
      setBody(res.email_body)

      /** CLOSE FIRST MODAL → OPEN SECOND */
      setOrderModalOpen(false)
      setEmailModalOpen(true)
      setMaterialsOrdered(true)
    } catch (error) {
      toast.error('Failed to generate email')
      console.error(error)
    }
  }

  const handleSendEmail = async () => {
    try {
      const res = await sendEmail({
        to: toEmail,
        subject,
        body,
      }).unwrap()

      toast.success(res?.message || 'Email sent successfully!')
      setEmailModalOpen(false)
    } catch (error: any) {
      toast.error(error?.data?.message || 'Failed to send email')
    }
  }

  return (
    <>
      {/* MAIN BUTTON */}
      <Button
        className="bg-[#059669] hover:bg-[#059669]/90 px-10 py-6 text-lg"
        onClick={() => setOrderModalOpen(true)}
      >
        {materialsOrdered ? 'Materials Ordered ✅' : 'Order Materials'}
      </Button>

      {/* ================= FIRST MODAL ================= */}
      <Dialog open={orderModalOpen} onOpenChange={setOrderModalOpen}>
        <DialogContent className="w-full max-w-md">
          <DialogHeader>
            <DialogTitle>Select Supplier</DialogTitle>
          </DialogHeader>

          <div className="space-y-4">
            <Select
              value={selectedSupplier?.supplier_id}
              onValueChange={handleSupplierChange}
            >
              <SelectTrigger className="w-full border border-primary">
                <SelectValue placeholder="Select Supplier" />
              </SelectTrigger>

              <SelectContent>
                {suppliers.map((supplier: any) => (
                  <SelectItem
                    key={supplier.supplier_id}
                    value={supplier.supplier_id}
                  >
                    {supplier.supplier_name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Button
              onClick={handleGenerateEmail}
              disabled={!selectedSupplier || isLoading}
              className="w-full bg-emerald-600 hover:bg-emerald-700"
            >
              {isLoading ? 'Generating...' : 'Email Supplier'}
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* ================= SECOND MODAL ================= */}
      <Dialog open={emailModalOpen} onOpenChange={setEmailModalOpen}>
        <DialogContent className="max-w-2xl h-[550px] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Email Supplier</DialogTitle>
          </DialogHeader>

          <div className="space-y-4">
            <Label>To</Label>
            <Input value={toEmail} onChange={(e) => setToEmail(e.target.value)} />

            <Label>Subject</Label>
            <Input
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
            />

            <Label>Body</Label>
            <Textarea
              rows={10}
              value={body}
              onChange={(e) => setBody(e.target.value)}
            />

            <div className="flex justify-end gap-3">
              <Button variant="outline" onClick={() => setEmailModalOpen(false)}>
                Cancel
              </Button>

              <Button
                onClick={handleSendEmail}
                disabled={!toEmail || !subject || !body || sending}
                className="bg-emerald-600 hover:bg-emerald-700"
              >
                {sending ? 'Sending...' : 'Send email'}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}
