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
import { Download, Search, Copy, Check } from "lucide-react";
import * as XLSX from "xlsx";
import { Input } from "@/components/ui/input";
import { motion, AnimatePresence } from "framer-motion";
import { EmailManagerModal } from "@/components/EmailManagerModal";

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

const formatDate = (dateStr: string) => {
    if (!dateStr) return "-";
    const date = new Date(dateStr);
    if (isNaN(date.getTime())) return dateStr;
    const day = String(date.getUTCDate()).padStart(2, "0");
    const month = String(date.getUTCMonth() + 1).padStart(2, "0");
    const year = date.getUTCFullYear();
    return `${day}/${month}/${year}`;
};


export default function DataTable({
    initialData = [],
}: {
    initialData?: DataItem[];
}) {
    const safeInitial = Array.isArray(initialData) ? initialData : [];
    const [data] = useState<DataItem[]>(safeInitial);
    const [searchTerm, setSearchTerm] = useState("");
    const [copiedId, setCopiedId] = useState<string | null>(null);

    const filteredData = useMemo(() => {
        return data.filter((item) =>
            Object.values(item).some((value) =>
                value
                    ?.toString()
                    .toLowerCase()
                    .includes(searchTerm.toLowerCase()),
            ),
        );
    }, [data, searchTerm]);

    const handleCopyId = (id: string) => {
        navigator.clipboard.writeText(id);
        setCopiedId(id);
        setTimeout(() => setCopiedId(null), 2000);
    };

    const exportToExcel = () => {
        try {
            const exportData = data.map((item) => ({
                ID: item.id,
                "ID Code": item.IDCode,
                Nome: item.firstName,
                Apelido: item.lastName,
                Email: item.email,
                Telefone: item.phone,
                Província: item.province,
                "Data de Nascimento": formatDate(item.dob),
                Nacionalidade: item.country,
                Gênero: item.gender,
                "Contacto de Emergência": item.emergencyName,
                "Telefone de Emergência": item.emergencyPhone,
                "Grau de Parentesco": item.emergencyFamiliarity,
                Categoria: item.category,
                Rota: item.route,
                Camisete: item.shirt,
            }));
            const workbook = XLSX.utils.book_new();
            const worksheet = XLSX.utils.json_to_sheet(exportData);

            XLSX.utils.book_append_sheet(workbook, worksheet, "Participantes");
            XLSX.writeFile(workbook, "participantes_16_corrida_bim.xlsx");
        } catch (error) {
            console.error("Erro ao exportar para Excel:", error);
        }
    };

    return (
        <div className="space-y-5 p-5 bg-white rounded-2xl shadow-xs border border-slate-200/80">
            {/* Header Section */}
            <div className="flex flex-col sm:flex-row justify-between items-stretch sm:items-center gap-4">
                <div className="flex-1 max-w-md">
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                        <Input
                            placeholder="Pesquisar por nome, BI, telefone, categoria..."
                            className="pl-9 bg-slate-50 border-slate-200 focus:bg-white transition-all rounded-xl h-11"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                </div>
                <div className="flex items-center space-x-3">
                    <EmailManagerModal data={data} />
                    <Button
                        onClick={exportToExcel}
                        className="bg-rose-600 hover:bg-rose-700 text-white font-semibold px-5 h-11 rounded-xl shadow-xs transition-colors duration-200 shrink-0"
                    >
                        <Download className="mr-2 h-4 w-4" />
                        Exportar para Excel
                    </Button>
                </div>
            </div>

            {/* Table Section with Custom Scrollbar */}
            <div className="rounded-xl border border-slate-200 overflow-hidden bg-white shadow-xs">
                <div className="overflow-x-auto custom-scrollbar">
                    <Table className="w-full text-left text-sm">
                        <TableHeader>
                            <TableRow className="bg-slate-100/90 border-b border-slate-200 hover:bg-slate-100/90">
                                <TableHead className="font-bold text-xs uppercase tracking-wider text-slate-700 whitespace-nowrap py-3.5 px-4">
                                    ID
                                </TableHead>
                                <TableHead className="font-bold text-xs uppercase tracking-wider text-slate-700 whitespace-nowrap py-3.5 px-4">
                                    BI / Documento
                                </TableHead>
                                <TableHead className="font-bold text-xs uppercase tracking-wider text-slate-700 whitespace-nowrap py-3.5 px-4">
                                    Nome
                                </TableHead>
                                <TableHead className="font-bold text-xs uppercase tracking-wider text-slate-700 whitespace-nowrap py-3.5 px-4">
                                    Apelido
                                </TableHead>
                                <TableHead className="font-bold text-xs uppercase tracking-wider text-slate-700 whitespace-nowrap py-3.5 px-4">
                                    Email
                                </TableHead>
                                <TableHead className="font-bold text-xs uppercase tracking-wider text-slate-700 whitespace-nowrap py-3.5 px-4">
                                    Telefone
                                </TableHead>
                                <TableHead className="font-bold text-xs uppercase tracking-wider text-slate-700 whitespace-nowrap py-3.5 px-4">
                                    Província
                                </TableHead>
                                <TableHead className="font-bold text-xs uppercase tracking-wider text-slate-700 whitespace-nowrap py-3.5 px-4">
                                    Data Nasc.
                                </TableHead>
                                <TableHead className="font-bold text-xs uppercase tracking-wider text-slate-700 whitespace-nowrap py-3.5 px-4">
                                    Nacionalidade
                                </TableHead>
                                <TableHead className="font-bold text-xs uppercase tracking-wider text-slate-700 whitespace-nowrap py-3.5 px-4">
                                    Gênero
                                </TableHead>
                                <TableHead className="font-bold text-xs uppercase tracking-wider text-slate-700 whitespace-nowrap py-3.5 px-4">
                                    Contacto Emergência
                                </TableHead>
                                <TableHead className="font-bold text-xs uppercase tracking-wider text-slate-700 whitespace-nowrap py-3.5 px-4">
                                    Tel. Emergência
                                </TableHead>
                                <TableHead className="font-bold text-xs uppercase tracking-wider text-slate-700 whitespace-nowrap py-3.5 px-4">
                                    Parentesco
                                </TableHead>
                                <TableHead className="font-bold text-xs uppercase tracking-wider text-slate-700 whitespace-nowrap py-3.5 px-4">
                                    Categoria
                                </TableHead>
                                <TableHead className="font-bold text-xs uppercase tracking-wider text-slate-700 whitespace-nowrap py-3.5 px-4">
                                    Rota
                                </TableHead>
                                <TableHead className="font-bold text-xs uppercase tracking-wider text-slate-700 whitespace-nowrap py-3.5 px-4">
                                    Camisete
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
                                            className="text-center py-12 text-slate-400 font-medium"
                                        >
                                            Nenhum participante encontrado
                                        </TableCell>
                                    </AnimatedTableRow>
                                ) : (
                                    filteredData.map((item, index) => (
                                        <AnimatedTableRow
                                            key={item.id}
                                            initial={{ opacity: 0, y: 10 }}
                                            animate={{
                                                opacity: 1,
                                                y: 0,
                                                transition: {
                                                    delay: Math.min(index * 0.03, 0.3),
                                                },
                                            }}
                                            exit={{
                                                opacity: 0,
                                                transition: { duration: 0.15 },
                                            }}
                                            className="hover:bg-slate-50/90 border-b border-slate-100 transition-colors"
                                        >
                                            {/* ID */}
                                            <TableCell className="whitespace-nowrap py-3 px-4">
                                                <button
                                                    onClick={() => handleCopyId(item.id)}
                                                    className="group flex items-center space-x-1.5 font-mono text-xs bg-slate-100 hover:bg-slate-200 text-slate-600 px-2 py-1 rounded-md transition-colors"
                                                    title={`Clique para copiar ID: ${item.id}`}
                                                >
                                                    <span>{item.id ? `${item.id.slice(0, 8)}...` : "-"}</span>
                                                    {copiedId === item.id ? (
                                                        <Check className="h-3 w-3 text-emerald-600" />
                                                    ) : (
                                                        <Copy className="h-3 w-3 text-slate-400 group-hover:text-slate-600" />
                                                    )}
                                                </button>
                                            </TableCell>

                                            {/* BI / Documento */}
                                            <TableCell className="whitespace-nowrap font-mono font-medium text-slate-800 py-3 px-4">
                                                {item.IDCode || "-"}
                                            </TableCell>

                                            {/* Nome */}
                                            <TableCell className="whitespace-nowrap font-semibold text-slate-900 py-3 px-4">
                                                {item.firstName || "-"}
                                            </TableCell>

                                            {/* Apelido */}
                                            <TableCell className="whitespace-nowrap font-semibold text-slate-900 py-3 px-4">
                                                {item.lastName || "-"}
                                            </TableCell>

                                            {/* Email */}
                                            <TableCell className="whitespace-nowrap text-slate-600 py-3 px-4">
                                                {item.email || "-"}
                                            </TableCell>

                                            {/* Telefone */}
                                            <TableCell className="whitespace-nowrap font-mono text-slate-700 py-3 px-4">
                                                {item.phone || "-"}
                                            </TableCell>

                                            {/* Província */}
                                            <TableCell className="whitespace-nowrap text-slate-700 py-3 px-4">
                                                {item.province || "-"}
                                            </TableCell>

                                            {/* Data Nasc. */}
                                            <TableCell className="whitespace-nowrap font-mono text-slate-700 py-3 px-4">
                                                {formatDate(item.dob)}
                                            </TableCell>

                                            {/* Nacionalidade */}
                                            <TableCell className="whitespace-nowrap text-slate-700 py-3 px-4">
                                                {item.country || "-"}
                                            </TableCell>

                                            {/* Gênero */}
                                            <TableCell className="whitespace-nowrap py-3 px-4">
                                                <span
                                                    className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-bold ${
                                                        item.gender === "M" || item.gender === "Masculino"
                                                            ? "bg-sky-50 text-sky-700 border border-sky-200"
                                                            : "bg-pink-50 text-pink-700 border border-pink-200"
                                                    }`}
                                                >
                                                    {item.gender || "-"}
                                                </span>
                                            </TableCell>

                                            {/* Contacto Emergência */}
                                            <TableCell className="whitespace-nowrap text-slate-700 py-3 px-4">
                                                {item.emergencyName || "-"}
                                            </TableCell>

                                            {/* Tel. Emergência */}
                                            <TableCell className="whitespace-nowrap font-mono text-slate-700 py-3 px-4">
                                                {item.emergencyPhone || "-"}
                                            </TableCell>

                                            {/* Parentesco */}
                                            <TableCell className="whitespace-nowrap text-slate-700 py-3 px-4">
                                                {item.emergencyFamiliarity || "-"}
                                            </TableCell>

                                            {/* Categoria */}
                                            <TableCell className="whitespace-nowrap py-3 px-4">
                                                <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold bg-rose-50 text-rose-700 border border-rose-100">
                                                    {item.category || "-"}
                                                </span>
                                            </TableCell>

                                            {/* Rota */}
                                            <TableCell className="whitespace-nowrap py-3 px-4">
                                                <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-100">
                                                    {item.route || "-"}
                                                </span>
                                            </TableCell>

                                            {/* Camisete */}
                                            <TableCell className="whitespace-nowrap font-bold text-slate-800 py-3 px-4">
                                                {item.shirt || "-"}
                                            </TableCell>
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
                className="text-xs font-medium text-slate-500 pt-1"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
            >
                Visualizando <span className="font-bold text-slate-700">{filteredData.length}</span> de{" "}
                <span className="font-bold text-slate-700">{data.length}</span> participantes inscritos
            </motion.div>
        </div>
    );
}
