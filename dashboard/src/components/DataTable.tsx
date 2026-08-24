"use client";

import { useMemo, useState } from "react";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Download, Search } from "lucide-react"; // Adicione ícones
import * as XLSX from "xlsx";
import { Input } from "@/components/ui/input";
import { motion, AnimatePresence } from "framer-motion"; // Importe o Framer Motion

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

const AnimatedTableRow = motion(TableRow);

export default function DataTable({
    initialData = [],
}: {
    initialData?: DataItem[];
}) {
    const safeInitial = Array.isArray(initialData) ? initialData : [];
    const [data] = useState<DataItem[]>(safeInitial);

    const [searchTerm, setSearchTerm] = useState("");

    const filteredData = useMemo(() => {
        return data.filter((item) =>
            Object.values(item).some((value) =>
                value
                    .toString()
                    .toLowerCase()
                    .includes(searchTerm.toLowerCase()),
            ),
        );
    }, [data, searchTerm]);

    const exportToExcel = () => {
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
            const workbook = XLSX.utils.book_new();
            const worksheet = XLSX.utils.json_to_sheet(exportData);

            XLSX.utils.book_append_sheet(workbook, worksheet, "Participants");

            XLSX.writeFile(workbook, "participants_data.xlsx");
        } catch (error) {
            console.error("Error exporting to Excel:", error);
        }
    };

    return (
        <div className="space-y-6 p-4 bg-white rounded-lg shadow-sm">
            {/* Header Section */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div className="flex-1 w-full sm:w-auto">
                    <div className="relative">
                        <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-500" />
                        <Input
                            placeholder="Pesquisar participantes..."
                            className="pl-8 w-full"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                </div>
                <Button
                    onClick={exportToExcel}
                    className="w-full sm:w-auto bg-brand hover:bg-brandSecondary transition-colors duration-300"
                >
                    <Download className="mr-2 h-4 w-4" />
                    Exportar para excel
                </Button>
            </div>

            {/* Table Section */}
            <div className="rounded-md border border-gray-200 overflow-hidden">
                <div className="overflow-x-auto">
                    <Table>
                        <TableHeader>
                            <TableRow className="bg-gray-50">
                                <TableHead className="font-semibold">
                                    ID
                                </TableHead>
                                <TableHead className="font-semibold">
                                    Bilhete de Identidade
                                </TableHead>
                                <TableHead className="font-semibold">
                                    Nome
                                </TableHead>
                                <TableHead className="font-semibold">
                                    Apelido
                                </TableHead>
                                <TableHead className="font-semibold">
                                    Email
                                </TableHead>
                                <TableHead className="font-semibold">
                                    Telefone
                                </TableHead>
                                <TableHead className="font-semibold">
                                    Província
                                </TableHead>
                                <TableHead className="font-semibold">
                                    Data de Nascimento
                                </TableHead>
                                <TableHead className="font-semibold">
                                    Nacionalidade
                                </TableHead>
                                <TableHead className="font-semibold">
                                    Gênero
                                </TableHead>
                                <TableHead className="font-semibold">
                                    Contacto de emergência
                                </TableHead>
                                <TableHead className="font-semibold">
                                    Telefone de emergência
                                </TableHead>
                                <TableHead className="font-semibold">
                                    Grau de parentesco (contacto de emergência)
                                </TableHead>
                                <TableHead className="font-semibold">
                                    Categoria
                                </TableHead>
                                <TableHead className="font-semibold">
                                    Rota
                                </TableHead>
                                <TableHead className="font-semibold">
                                    Tamanho da camisete
                                </TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            <AnimatePresence mode="popLayout">
                                {filteredData.length === 0 ? (
                                    <AnimatedTableRow
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        exit={{ opacity: 0 }}
                                        transition={{ duration: 0.2 }}
                                    >
                                        <TableCell
                                            colSpan={16}
                                            className="text-center h-24 text-gray-500"
                                        >
                                            No results found
                                        </TableCell>
                                    </AnimatedTableRow>
                                ) : (
                                    filteredData.map((item, index) => (
                                        <AnimatedTableRow
                                            key={item.id}
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={{
                                                opacity: 1,
                                                y: 0,
                                                transition: {
                                                    delay: index * 0.05, // Efeito cascata
                                                },
                                            }}
                                            exit={{
                                                opacity: 0,
                                                y: -20,
                                                transition: {
                                                    duration: 0.2,
                                                },
                                            }}
                                            className="hover:bg-gray-50 transition-colors"
                                        >
                                            <TableCell>{item.id}</TableCell>
                                            <TableCell>{item.IDCode}</TableCell>
                                            <TableCell className="font-medium">
                                                {item.firstName}
                                            </TableCell>
                                            <TableCell className="font-medium">
                                                {item.lastName}
                                            </TableCell>
                                            <TableCell>{item.email}</TableCell>
                                            <TableCell>{item.phone}</TableCell>
                                            <TableCell>
                                                {item.province}
                                            </TableCell>
                                            <TableCell>{item.dob}</TableCell>
                                            <TableCell>
                                                {item.country}
                                            </TableCell>
                                            <TableCell>{item.gender}</TableCell>
                                            <TableCell>
                                                {item.emergencyName}
                                            </TableCell>
                                            <TableCell>
                                                {item.emergencyPhone}
                                            </TableCell>
                                            <TableCell>
                                                {item.emergencyFamiliarity}
                                            </TableCell>
                                            <TableCell>
                                                {item.category}
                                            </TableCell>
                                            <TableCell>{item.route}</TableCell>
                                            <TableCell>{item.shirt}</TableCell>
                                        </AnimatedTableRow>
                                    ))
                                )}
                            </AnimatePresence>
                        </TableBody>
                    </Table>
                </div>
            </div>

            {/* Footer with stats */}
            <motion.div
                className="text-sm text-gray-500"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
            >
                Visualizando {filteredData.length} de {data.length} inscritos
            </motion.div>
        </div>
    );
}
