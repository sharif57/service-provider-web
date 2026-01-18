import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableFooter,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"

const invoices = [
    {
        invoice: "Sharif Mahamud",
        paymentStatus: "Paid",
        totalAmount: "$250.00",
        paymentMethod: "Credit Card",
        packageName: 'Basic'
    },
    {
        invoice: "Sharif Mahamud",
        paymentStatus: "Pending",
        totalAmount: "$150.00",
        paymentMethod: "PayPal",
        packageName: 'Basic'

    },
    {
        invoice: "Sharif Mahamud",
        paymentStatus: "Unpaid",
        totalAmount: "$350.00",
        paymentMethod: "Bank Transfer",
        packageName: 'Basic'

    },
    {
        invoice: "Sharif Mahamud",
        paymentStatus: "Paid",
        totalAmount: "$450",
        paymentMethod: "Credit Card",
        packageName: 'Basic'

    },
    {
        invoice: "Sharif Mahamud",
        paymentStatus: "Paid",
        totalAmount: "$550.00",
        paymentMethod: "PayPal",
        packageName: 'Basic'

    },
    {
        invoice: "Sharif Mahamud",
        paymentStatus: "Pending",
        totalAmount: "$200.00",
        paymentMethod: "Bank Transfer",
        packageName: 'Basic'

    },
    {
        invoice: "Sharif Mahamud",
        paymentStatus: "Unpaid",
        totalAmount: "$300.00",
        paymentMethod: "Credit Card",
        packageName: 'Basic'
    },
]

export function Payment() {
    return (
        <Table className="border">
            <TableHeader>
                <TableRow>
                    <TableHead className="">Name</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Prices</TableHead>
                    <TableHead>Package Name</TableHead>
                    <TableHead >Payment Method</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {invoices.map((invoice) => (
                    <TableRow key={invoice.invoice} className="">
                        <TableCell className="font-medium p-4">{invoice.invoice}</TableCell>
                        <TableCell>{invoice.paymentStatus}</TableCell>
                        <TableCell className="">{invoice.totalAmount}</TableCell>
                        <TableCell className="">{invoice.packageName}</TableCell>
                        <TableCell className="text-[#10B981]">{invoice.paymentMethod}</TableCell>
                    </TableRow>
                ))}
            </TableBody>
           
        </Table>
    )
}
