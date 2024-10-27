"use client";

import { useState } from "react";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import * as XLSX from "xlsx";

type DataItem = {
    id: string;
    IDCode: string;
    firstName: string;
    email: string;
    lastName: string;
    phone: string;
    province: string;
    dob: string;
    country: string;
    gender: string;
    emergencyName: string;
    emergencyPhone: string;
    emergencyFamiliarity: string;
    category: string;
    route: string;
    shirt: string;
};

export default function DataTable({
    initialData,
}: {
    initialData: DataItem[];
}) {
    const [data] = useState<DataItem[]>(initialData);

    const exportToExcel = () => {
        // Prepare the data for export
        try {
            const exportData = data.map((item) => ({
                ID: item.id,
                "ID Code": item.IDCode,
                "First Name": item.firstName,
                "Last Name": item.lastName,
                Email: item.email,
                Phone: item.phone,
                Province: item.province,
                "Date of Birth": item.dob,
                Country: item.country,
                Gender: item.gender,
                "Emergency Contact": item.emergencyName,
                "Emergency Phone": item.emergencyPhone,
                "Emergency Familiarity": item.emergencyFamiliarity,
                Category: item.category,
                Route: item.route,
                Shirt: item.shirt,
            }));
            // Create a new workbook and worksheet
            const workbook = XLSX.utils.book_new();
            const worksheet = XLSX.utils.json_to_sheet(exportData);

            // Add the worksheet to the workbook
            XLSX.utils.book_append_sheet(workbook, worksheet, "Participants");

            // Generate buffer
            XLSX.writeFile(workbook, "participants_data.xlsx");
        } catch (error) {
            console.error("Error exporting to Excel:", error);
        }
    };

    return (
        <div className="space-y-4">
            <Button onClick={exportToExcel}>Export to Excel</Button>
            <div className="rounded-md border">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>ID</TableHead>
                            <TableHead>ID Code</TableHead>
                            <TableHead>First Name</TableHead>
                            <TableHead>Last Name</TableHead>
                            <TableHead>Email</TableHead>
                            <TableHead>Phone</TableHead>
                            <TableHead>Province</TableHead>
                            <TableHead>Date of Birth</TableHead>
                            <TableHead>Country</TableHead>
                            <TableHead>Gender</TableHead>
                            <TableHead>Emergency Contact</TableHead>
                            <TableHead>Emergency Phone</TableHead>
                            <TableHead>Emergency Familiarity</TableHead>
                            <TableHead>Category</TableHead>
                            <TableHead>Route</TableHead>
                            <TableHead>Shirt</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {data.map((item) => (
                            <TableRow key={item.id}>
                                <TableCell>{item.id}</TableCell>
                                <TableCell>{item.IDCode}</TableCell>
                                <TableCell>{item.firstName}</TableCell>
                                <TableCell>{item.lastName}</TableCell>
                                <TableCell>{item.email}</TableCell>
                                <TableCell>{item.phone}</TableCell>
                                <TableCell>{item.province}</TableCell>
                                <TableCell>{item.dob}</TableCell>
                                <TableCell>{item.country}</TableCell>
                                <TableCell>{item.gender}</TableCell>
                                <TableCell>{item.emergencyName}</TableCell>
                                <TableCell>{item.emergencyPhone}</TableCell>
                                <TableCell>
                                    {item.emergencyFamiliarity}
                                </TableCell>
                                <TableCell>{item.category}</TableCell>
                                <TableCell>{item.route}</TableCell>
                                <TableCell>{item.shirt}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
        </div>
    );
}
