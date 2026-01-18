
'use client'

import { useGetOfferQuery } from '@/redux/feature/chatSlice';
import Image from 'next/image'
import React from 'react'
import jsPDF from 'jspdf'
import autoTable from 'jspdf-autotable'

export default function Quote({ id }: any) {
    const { data } = useGetOfferQuery(id);

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
        <div className="cursor-pointer">
            <Image onClick={downloadPDF} src="/image/pdf1.png" alt="Quote" height={1000} width={1000} className='' />
        </div>
    );
}
