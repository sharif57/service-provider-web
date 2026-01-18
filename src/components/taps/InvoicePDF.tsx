"use client";

import React from "react";
import { Page, Text, View, Document, StyleSheet, Font, Image } from "@react-pdf/renderer";

// Optional: register a custom font
Font.register({
    family: "Roboto",
    fonts: [{ src: "/fonts/Roboto-Regular.ttf" }],
});

const styles = StyleSheet.create({
    page: {
        fontFamily: "Roboto",
        fontSize: 12,
        padding: 30,
        lineHeight: 1.6,
        flexDirection: "column",
    },
    header: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 20,
    },
    logo: {
        width: 80,
        height: 80,
    },
    title: {
        fontSize: 24,
        fontWeight: "bold",
    },
    section: {
        marginBottom: 10,
    },
    //   table: {
    //     display: "table",
    //     width: "auto",
    //     borderStyle: "solid",
    //     borderWidth: 1,
    //     borderRightWidth: 0,
    //     borderBottomWidth: 0,
    //   },
    tableRow: {
        margin: "auto",
        flexDirection: "row",
    },
    tableCol: {
        width: "25%",
        borderStyle: "solid",
        borderWidth: 1,
        borderLeftWidth: 0,
        borderTopWidth: 0,
        padding: 5,
    },
    tableCellHeader: {
        fontWeight: "bold",
        backgroundColor: "#f0f0f0",
    },
    totalSection: {
        marginTop: 15,
        alignSelf: "flex-end",
    },
    footer: {
        marginTop: 20,
        textAlign: "center",
        fontSize: 10,
        color: "grey",
    },
});

interface InvoicePDFProps {
    data: any;
}

const InvoicePDF: React.FC<InvoicePDFProps> = ({ data }) => {
    console.log(data, '=========')
    return (
        <Document>
            <Page size="A4" style={styles.page}>
                {/* Header */}
                <View style={styles.header}>
                    <Image src="/image/logo.png" style={styles.logo} />
                    <Text style={styles.title}>Invoice</Text>
                </View>

                {/* Customer Info */}
                <View style={styles.section}>
                    <Text>Customer: {data.customer_name}</Text>
                    <Text>Phone: {data.phone_number}</Text>
                    <Text>Address: {data.address}</Text>
                    <Text>Assigned Resource: {data.resource}</Text>
                    <Text>Task: {data.task_description}</Text>
                    <Text>Status: {data.status}</Text>
                </View>

                {/* Materials Table */}
                <View style={[
                    { marginTop: 10 }]}>
                    <View style={styles.tableRow}>
                        <Text style={[styles.tableCol, styles.tableCellHeader]}>Material</Text>
                        <Text style={[styles.tableCol, styles.tableCellHeader]}>Category</Text>
                        <Text style={[styles.tableCol, styles.tableCellHeader]}>Quantity</Text>
                        <Text style={[styles.tableCol, styles.tableCellHeader]}>Price</Text>
                    </View>
                    {data.bill_of_materials.map((item: any, idx: number) => (
                        <View style={styles.tableRow} key={idx}>
                            <Text style={styles.tableCol}>{item.material}</Text>
                            <Text style={styles.tableCol}>{item.category}</Text>
                            <Text style={styles.tableCol}>
                                {item.quantity} {item.unit}
                            </Text>
                            <Text style={styles.tableCol}>${item.price}</Text>
                        </View>
                    ))}
                </View>

                {/* Total Section */}
                <View style={styles.totalSection}>
                    <Text>Labor Cost: ${data.price.Labor}</Text>
                    <Text>Materials Cost: ${data.price.Materials}</Text>
                    <Text style={{ fontWeight: "bold", fontSize: 14 }}>Total: ${data.price.Total}</Text>
                </View>

                {/* Notes / Additional Info */}
                <View style={[styles.section, { marginTop: 20 }]}>
                    <Text>Notes:</Text>
                    <Text>{data.bill_of_materials_string}</Text>
                </View>

                <Text style={styles.footer}>
                    Generated on {new Date().toLocaleDateString()} | Powered by Your Company
                </Text>
            </Page>
        </Document>
    );
};

export default InvoicePDF;
