import React, { useState } from 'react'
import { Label } from '@radix-ui/react-label'
import { useCustomerAcceptanceMutation, useCustomerCustomMutation, useCustomerEmailMutation, useGetOfferQuery, useSendEmailMutation } from '@/redux/feature/chatSlice'
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '../ui/dialog';
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';
import { Button } from '../ui/button';
import { toast } from 'sonner';
import SupplierEmailSend from '../supplier-email';
import Image from 'next/image';
import jsPDF from 'jspdf'
import autoTable from 'jspdf-autotable'
import Link from 'next/link';

export default function Project({ id }: any) {

    const { data } = useGetOfferQuery(id);



    const [customerEmail, { isLoading: emailLoading }] = useCustomerEmailMutation();
    const [customerAcceptance, { isLoading: acceptLoading }] = useCustomerAcceptanceMutation();
    const [customerCustom, { isLoading: customLoading }] = useCustomerCustomMutation();
    const [sendEmail, { isLoading: sendingFinal }] = useSendEmailMutation();

    const [secondModalOpen, setSecondModalOpen] = useState(false);
    const [toEmail, setToEmail] = useState('');
    const [subject, setSubject] = useState('');
    const [body, setBody] = useState('');
    const [customerName, setCustomerName] = useState('');

    const handleGenerateEmail = async (
        mutationFn: any,
        actionName: string
    ) => {
        try {
            const res = await mutationFn({ offer_id: id }).unwrap();

            setCustomerName(res.customer_name || '');
            setToEmail(res.customer_email || res.to || ''); // fallback
            setSubject(res.email_subject || '');
            setBody(res.email_body || '');

            setSecondModalOpen(true); // open second modal
        } catch (err: any) {
            console.error('Generate Email Error:', err);
            toast.error(err?.data?.message || 'Failed to generate email. Please try again.');
        }
    };

    // Final Send Email
    const handleSendFinalEmail = async () => {
        if (!toEmail || !subject || !body) {
            alert('Please fill all fields');
            return;
        }

        try {
            await sendEmail({
                to: toEmail,
                subject: subject,
                body: body,
            }).unwrap();

            toast.success('Email sent successfully!');
            setSecondModalOpen(false);
        } catch (err: any) {
            console.error('Send Email Error:', err);
            toast.error(err?.data?.message || 'Failed to send email');
        }
    };


    const downloadPDF = () => {
        if (!data) return;

        const doc = new jsPDF();

        const logoUrl = '/image/logo.png';
        const img = new window.Image();
        img.src = logoUrl;
        img.onload = () => {

            // === Logo Positions ===
            // Top-left
            doc.addImage(img, 'PNG', 15, 15, 45, 25);

            // Top-right
            // doc.addImage(img, 'PNG', 150, 15, 45, 25);

            // Top-center
            // doc.addImage(img, 'PNG', 105 - 22.5, 15, 45, 25); // center: x = pageWidth/2 - width/2

            // === Header ===
            doc.setFontSize(22);
            doc.text('Invoice', 105, 55, { align: 'center' });

            // === Customer Info ===
            doc.setFontSize(12);
            doc.text(`Customer: ${data.customer_name}`, 15, 70);
            doc.text(`Phone: ${data.phone_number}`, 15, 78);
            doc.text(`Email: ${data.customer_email}`, 15, 86);
            doc.text(`Address: ${data.address}`, 15, 94);
            doc.text(`Project Start: ${data.project_start}`, 15, 102);
            doc.text(`Time: ${data.time}`, 15, 110);
            doc.text(`Resource: ${data.resource}`, 15, 118);

            // === Bill of Materials Table ===
            const tableData = data.bill_of_materials.map((item: any) => [
                item.material,
                item.category,
                item.quantity,
                item.unit,
                `$${item.price}`,
                item.description
            ]);

            autoTable(doc, {
                startY: 130,
                head: [['Material', 'Category', 'Quantity', 'Unit', 'Price', 'Description']],
                body: tableData,
                styles: { fontSize: 10, cellPadding: 3 },
                headStyles: { fillColor: [41, 128, 185], textColor: 255 },
                theme: 'grid',
            });

            // === Prices Summary ===
            const finalY = (doc as any).lastAutoTable.finalY + 10;
            doc.setFontSize(12);
            doc.text(`Labor: $${data.price.Labor}`, 15, finalY);
            doc.text(`Materials: $${data.price.Materials}`, 15, finalY + 8);
            doc.text(`Total: $${data.price.Total}`, 15, finalY + 16);

            // === Footer ===
            doc.setFontSize(10);
            doc.text('Thank you for your business!', 105, 285, { align: 'center' });

            // Save PDF
            doc.save(`Invoice_${data.customer_name}.pdf`);
        };
    };

    return (
        <div className='space-y-6'>

            <div>
                <div className='lg:flex w-full lg:max-w-4xl items-center  gap-6 lg:space-y-0 space-y-4 '>
                    <div className='border-[#9CA3AF] border-2 rounded-md px-5 py-6 lg:w-4/5'>
                        <div className='flex justify-between items-center'>
                            <div className='space-y-2'>
                                <p className='text-lg font-normal text-[#6B7280]'>Status</p>
                                <h1 className='text-xl font-semibold text-[#022C22]'>{data?.status || ''}</h1>
                                <p className='text-lg font-normal text-[#6B7280]'>Expected start date </p>
                                <h1 className='text-xl font-semibold text-[#022C22]'>{data?.project_start || ''}</h1>
                            </div>
                            <div className='space-y-2'>
                                <p className='text-lg font-normal text-[#6B7280]'>Expecidric</p>
                                <h1 className='text-xl font-semibold text-[#022C22]'>{data?.time || ''}</h1>
                                <p className='text-lg font-normal text-[#6B7280]'>Expected end date </p>
                                <h1 className='text-xl font-semibold text-[#022C22]'>{data?.project_start && data?.time
                                    ? new Date(
                                        new Date(data?.project_start).getTime() +
                                        parseInt(data?.time) * 7 * 24 * 60 * 60 * 1000
                                    ).toISOString().split('T')[0]
                                    : ''}
                                </h1>
                            </div>

                        </div>
                        <div className='text-center flex justify-center items-center gap-4 mt-8'><span className='text-xl font-medium text-[#6B7280]'>Latest Update</span>     <span className='text-xl font-medium text-[#022C22]'>Project starts on {data?.time} - {data?.status}</span> </div>
                    </div>
                </div>
                {/* client information */}

                <div className="flex flex-col lg:flex-row w-full items-start lg:items-center gap-20 mt-10">

                    {/* Client Information */}
                    <div className="border-2 border-[#9CA3AF] rounded-md px-5 py-6 w-full lg:w-1/3">
                        <h1 className="text-xl font-semibold text-[#022C22]">
                            Client Information
                        </h1>

                        <ul className="space-y-1 pt-4">
                            <li className="text-lg text-[#6B7280]">{data?.customer_name}</li>
                            <li className="text-lg text-[#6B7280]">{data?.address}</li>
                            <li className="text-lg text-[#6B7280]">{data?.phone_number}</li>
                            <li className="text-lg text-[#6B7280]">{data?.customer_email}</li>
                            <li className="text-lg text-[#6B7280]">{data?.resource}</li>
                        </ul>
                    </div>

                    {/* Accepted Quote */}
                    <div className="w-full lg:w-2/3">
                        <h1 className="text-xl font-semibold text-[#022C22] mb-4">
                            Accepted Quote
                        </h1>

                        <div className="cursor-pointer max-w-xl border pt-4 rounded-lg">
                            <Image
                                onClick={downloadPDF}
                                src="/image/pdf1.png"
                                alt="Quote"
                                height={1000}
                                width={1000}
                                className="h-[210px] w-full rounded-lg  object-cover"
                            />
                        </div>
                    </div>

                </div>

            </div>

            <div className='grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 lg:gap-12 gap-4 mt-8'>
                
                <div className='bg-[#D1FAE5] cursor-pointer space-y-4 p-4 px-10 py-8 rounded-md flex flex-col items-center' onClick={downloadPDF}>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M4 21.4V2.6C4 2.26863 4.26863 2 4.6 2H16.2515C16.4106 2 16.5632 2.06321 16.6757 2.17574L19.8243 5.32426C19.9368 5.43679 20 5.5894 20 5.74853V21.4C20 21.7314 19.7314 22 19.4 22H4.6C4.26863 22 4 21.7314 4 21.4Z" stroke="#047857" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        <path d="M8 10L16 10" stroke="#047857" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        <path d="M8 18L16 18" stroke="#047857" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        <path d="M8 14L12 14" stroke="#047857" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        <path d="M16 2V5.4C16 5.73137 16.2686 6 16.6 6H20" stroke="#047857" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    <p className='text-2xl text-[#047857] font-medium'>Generate Invoice</p>
                </div>

                <Link href={'/offers'} className='bg-[#D1FAE5] cursor-pointer space-y-4 p-4 px-10 py-8 rounded-md flex flex-col items-center'>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M12 11H14.5H17" stroke="#047857" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        <path d="M12 7H14.5H17" stroke="#047857" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        <path d="M8 15V3.6C8 3.26863 8.26863 3 8.6 3H20.4C20.7314 3 21 3.26863 21 3.6V17C21 19.2091 19.2091 21 17 21" stroke="#047857" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        <path d="M5 15H8H12.4C12.7314 15 13.0031 15.2668 13.0298 15.5971C13.1526 17.1147 13.7812 21 17 21H8H6C4.34315 21 3 19.6569 3 18V17C3 15.8954 3.89543 15 5 15Z" stroke="#047857" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    <p className='text-2xl text-[#047857] font-medium'>Generate Bill Material</p>
                </Link>

                <div>

                    <div className="flex justify-center items-center ">
                        <Dialog>
                            <DialogTrigger asChild>
                                {/* <Button className="bg-[#059669] hover:bg-[#059669]/90 px-10 py-6 text-lg">
                                Order Materials
                            </Button> */}
                                <div className='bg-[#D1FAE5] space-y-4 p-4 px-10 py-8 rounded-md flex flex-col items-center w-full'>
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M7 9L12 12.5L17 9" stroke="#047857" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                        <path d="M2 17V7C2 5.89543 2.89543 5 4 5H20C21.1046 5 22 5.89543 22 7V17C22 18.1046 21.1046 19 20 19H4C2.89543 19 2 18.1046 2 17Z" stroke="#047857" strokeWidth="1.5" />
                                    </svg>

                                    <p className='text-2xl text-[#047857] font-medium'>Email Customer</p>
                                </div>
                            </DialogTrigger>

                            <DialogContent className="sm:max-w-[525px]">
                                <DialogHeader>
                                    <DialogTitle className="text-4xl text-center font-medium text-[#4B5563]">
                                        Talk to Customer
                                    </DialogTitle>
                                </DialogHeader>

                                <div className="grid gap-4 py-4">
                                    <Button
                                        disabled={emailLoading}
                                        onClick={() => handleGenerateEmail(customerEmail, 'offer')}
                                        className="w-full py-6 bg-[#D1FAE5] text-lg font-semibold hover:bg-[#D1FAE5]/90 text-[#047857]"
                                    >
                                        {emailLoading ? 'Generating...' : 'Send offer to customer'}
                                    </Button>

                                    <Button
                                        disabled={acceptLoading}
                                        onClick={() => handleGenerateEmail(customerAcceptance, 'acceptance')}
                                        className="w-full py-6 bg-[#D1FAE5] text-lg font-semibold hover:bg-[#D1FAE5]/90 text-[#047857]"
                                    >
                                        {acceptLoading ? 'Generating...' : 'Send a thank you for acceptance mail'}
                                    </Button>

                                    <Button
                                        disabled={customLoading}
                                        onClick={() => handleGenerateEmail(customerCustom, 'custom')}
                                        className="w-full py-6 bg-[#D1FAE5] text-lg font-semibold hover:bg-[#D1FAE5]/90 text-[#047857]"
                                    >
                                        {customLoading ? 'Generating...' : 'Send custom email'}
                                    </Button>
                                </div>
                            </DialogContent>
                        </Dialog>
                    </div>

                    {/* Second Dialog - Edit & Send Email */}
                    <Dialog open={secondModalOpen} onOpenChange={setSecondModalOpen}>
                        <DialogContent className="sm:max-w-[600px] ">
                            <DialogHeader>
                                <DialogTitle className="text-2xl">Review & Send Email</DialogTitle>
                                <DialogDescription>
                                    To: <strong>{customerName}</strong> ({toEmail})
                                </DialogDescription>
                            </DialogHeader>

                            <div className="grid gap-4 py-4">
                                <div className="grid gap-2">
                                    <Label>To (Email)</Label>
                                    <Input
                                        value={toEmail}
                                        onChange={(e) => setToEmail(e.target.value)}
                                        placeholder="client@example.com"
                                    />
                                </div>

                                <div className="grid gap-2">
                                    <Label>Subject</Label>
                                    <Input
                                        value={subject}
                                        onChange={(e) => setSubject(e.target.value)}
                                        placeholder="Email subject"
                                    />
                                </div>

                                <div className="grid gap-2">
                                    <Label>Email Body</Label>
                                    <Textarea
                                        value={body}
                                        onChange={(e) => setBody(e.target.value)}
                                        rows={12}
                                        className="font-mono text-sm resize-none h-[225px] overflow-y-scroll"
                                        placeholder="Email content..."
                                    />
                                </div>
                            </div>

                            <DialogFooter className="flex justify-between sm:justify-between">
                                <DialogClose asChild>
                                    <Button variant="outline">Cancel</Button>
                                </DialogClose>
                                <Button
                                    onClick={handleSendFinalEmail}
                                    disabled={sendingFinal || !toEmail || !subject || !body}
                                    className="bg-[#059669] hover:bg-[#059669]/90"
                                >
                                    {sendingFinal ? 'Sending...' : 'Send Email'}
                                </Button>
                            </DialogFooter>
                        </DialogContent>
                    </Dialog>
                </div>


            </div>

        </div>
    )
}
