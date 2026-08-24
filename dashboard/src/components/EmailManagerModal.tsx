"use client";

import { useMemo, useState } from "react";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
    Mail,
    Send,
    Eye,
    Edit3,
    Users,
    Sparkles,
    CheckCircle2,
    Loader2,
} from "lucide-react";
import { DEFAULT_TEMPLATES, EmailTemplate } from "@/utils/emailTemplates";
import Image from "next/image";

type DataItem = {
    id: string;
    IDCode: string;
    firstName: string;
    lastName: string;
    email: string;
    category: string;
    route: string;
    shirt: string;
};

export function EmailManagerModal({ data = [] }: { data?: DataItem[] }) {
    const safeData = Array.isArray(data) ? data : [];
    const [isOpen, setIsOpen] = useState(false);

    // Form State
    const [selectedTemplate, setSelectedTemplate] = useState<string>("countdown");
    const [subject, setSubject] = useState(DEFAULT_TEMPLATES[0].subject);
    const [body, setBody] = useState(DEFAULT_TEMPLATES[0].body);

    // Segment Filter
    const [audienceSegment, setAudienceSegment] = useState<string>("all");

    // UI View State
    const [activeTab, setActiveTab] = useState<"editor" | "preview">("editor");
    const [isSending, setIsSending] = useState(false);
    const [sendProgress, setSendProgress] = useState(0);
    const [isSuccess, setIsSuccess] = useState(false);

    // Target Participants Count
    const filteredRecipients = useMemo(() => {
        if (audienceSegment === "15km") {
            return safeData.filter((p) => p.route && p.route.includes("15km"));
        }
        if (audienceSegment === "7km") {
            return safeData.filter((p) => p.route && p.route.includes("7km"));
        }
        if (audienceSegment === "disability") {
            return safeData.filter(
                (p) =>
                    (p.route && (p.route.includes("Deficiência") || p.route.includes("9km"))) ||
                    (p.category &&
                        (p.category.includes("Triciclos") ||
                            p.category.includes("Cadeirantes") ||
                            p.category.includes("Deficientes"))),
            );
        }
        return safeData;
    }, [safeData, audienceSegment]);

    const handleSelectTemplate = (template: EmailTemplate) => {
        setSelectedTemplate(template.id);
        setSubject(template.subject);
        setBody(template.body);
    };

    const handleInsertTag = (tag: string) => {
        setBody((prev) => `${prev} ${tag}`);
    };

    // Renderized HTML Preview with sample participant
    const sampleParticipant = filteredRecipients[0] || {
        firstName: "Malagy",
        lastName: "Cassimo",
        category: "Populares",
        route: "Corrida Pedestre - 15km",
        IDCode: "8768686989J",
        shirt: "L",
    };

    const formattedPreviewBody = useMemo(() => {
        let text = body;
        const fullName = `${sampleParticipant.firstName || "Participante"} ${sampleParticipant.lastName || ""}`.trim();
        text = text.replace(/{NOME}/g, fullName);
        text = text.replace(/{CATEGORIA}/g, sampleParticipant.category || "Populares");
        text = text.replace(/{ROTA}/g, sampleParticipant.route || "Corrida Pedestre - 15km");
        text = text.replace(/{BI}/g, sampleParticipant.IDCode || "Documento");
        text = text.replace(/{CAMISETE}/g, sampleParticipant.shirt || "M");
        return text;
    }, [body, sampleParticipant]);

    const handleSendEmails = () => {
        if (filteredRecipients.length === 0) return;
        setIsSending(true);
        setSendProgress(0);
        setIsSuccess(false);

        let progress = 0;
        const interval = setInterval(() => {
            progress += 10;
            setSendProgress(progress);
            if (progress >= 100) {
                clearInterval(interval);
                setIsSending(false);
                setIsSuccess(true);
            }
        }, 150);
    };

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
                <Button className="bg-slate-900 hover:bg-slate-800 text-white font-semibold px-4 h-11 rounded-xl shadow-xs transition-all duration-200">
                    <Mail className="mr-2 h-4 w-4 text-rose-400" />
                    Enviar E-mails / Comunicados
                </Button>
            </DialogTrigger>

            <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto custom-scrollbar p-6 bg-white rounded-2xl">
                <DialogHeader className="border-b border-slate-100 pb-4">
                    <div className="flex items-center space-x-3">
                        <div className="p-2.5 bg-rose-50 border border-rose-100 rounded-xl text-rose-600">
                            <Mail className="h-6 w-6" />
                        </div>
                        <div>
                            <DialogTitle className="text-xl font-bold text-slate-900">
                                Gestão & Envio de E-mails
                            </DialogTitle>
                            <p className="text-xs font-medium text-slate-500 mt-0.5">
                                Dispare e-mails informativos e comunicados para os participantes da 16ª Corrida Millennium bim
                            </p>
                        </div>
                    </div>
                </DialogHeader>

                {isSuccess ? (
                    <div className="py-12 text-center space-y-4">
                        <div className="mx-auto w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center">
                            <CheckCircle2 className="h-10 w-10" />
                        </div>
                        <h3 className="text-2xl font-bold text-slate-900">
                            E-mails Disparados com Sucesso!
                        </h3>
                        <p className="text-sm text-slate-600 max-w-md mx-auto">
                            A sua campanha foi enviada para{" "}
                            <span className="font-bold text-slate-900">
                                {filteredRecipients.length} participantes
                            </span>{" "}
                            com sucesso.
                        </p>
                        <Button
                            onClick={() => {
                                setIsSuccess(false);
                                setIsOpen(false);
                            }}
                            className="bg-slate-900 hover:bg-slate-800 text-white px-6 h-11 rounded-xl"
                        >
                            Concluir
                        </Button>
                    </div>
                ) : (
                    <div className="space-y-6 pt-2">
                        {/* 1. Audience Segment Selector */}
                        <div className="bg-slate-50 p-4 rounded-xl border border-slate-200/80 space-y-3">
                            <div className="flex items-center justify-between">
                                <Label className="text-xs uppercase font-bold text-slate-600 flex items-center space-x-1.5">
                                    <Users className="h-4 w-4 text-slate-500" />
                                    <span>Público-Alvo (Destinatários)</span>
                                </Label>
                                <span className="text-xs font-bold text-rose-600 bg-rose-50 border border-rose-100 px-2.5 py-1 rounded-full">
                                    {filteredRecipients.length} participantes selecionados
                                </span>
                            </div>

                            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                                {[
                                    { id: "all", label: "Todos os Inscritos" },
                                    { id: "15km", label: "Corrida 15 Km" },
                                    { id: "7km", label: "Caminhada 7 Km" },
                                    { id: "disability", label: "P. Deficiência" },
                                ].map((seg) => (
                                    <button
                                        key={seg.id}
                                        onClick={() => setAudienceSegment(seg.id)}
                                        className={`py-2 px-3 text-xs font-semibold rounded-lg border transition-all ${
                                            audienceSegment === seg.id
                                                ? "bg-slate-900 text-white border-slate-900 shadow-xs"
                                                : "bg-white text-slate-700 border-slate-200 hover:bg-slate-100"
                                        }`}
                                    >
                                        {seg.label}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* 2. Template Selector */}
                        <div className="space-y-2">
                            <Label className="text-xs uppercase font-bold text-slate-600 flex items-center space-x-1.5">
                                <Sparkles className="h-4 w-4 text-amber-500" />
                                <span>Modelos de E-mail (Templates)</span>
                            </Label>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                                {DEFAULT_TEMPLATES.map((tmpl) => (
                                    <button
                                        key={tmpl.id}
                                        onClick={() => handleSelectTemplate(tmpl)}
                                        className={`p-3 text-left rounded-xl border text-xs font-bold transition-all flex items-center justify-between ${
                                            selectedTemplate === tmpl.id
                                                ? "bg-rose-50 border-rose-300 text-rose-900 shadow-xs"
                                                : "bg-white border-slate-200 text-slate-700 hover:bg-slate-50"
                                        }`}
                                    >
                                        <span>{tmpl.name}</span>
                                        {selectedTemplate === tmpl.id && (
                                            <CheckCircle2 className="h-4 w-4 text-rose-600 shrink-0" />
                                        )}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* 3. Editor vs Preview Tabs */}
                        <div className="flex border-b border-slate-200 space-x-4">
                            <button
                                onClick={() => setActiveTab("editor")}
                                className={`pb-2 text-xs font-bold flex items-center space-x-1.5 border-b-2 transition-colors ${
                                    activeTab === "editor"
                                        ? "border-rose-600 text-rose-600"
                                        : "border-transparent text-slate-500 hover:text-slate-800"
                                }`}
                            >
                                <Edit3 className="h-4 w-4" />
                                <span>Editar Conteúdo</span>
                            </button>
                            <button
                                onClick={() => setActiveTab("preview")}
                                className={`pb-2 text-xs font-bold flex items-center space-x-1.5 border-b-2 transition-colors ${
                                    activeTab === "preview"
                                        ? "border-rose-600 text-rose-600"
                                        : "border-transparent text-slate-500 hover:text-slate-800"
                                }`}
                            >
                                <Eye className="h-4 w-4" />
                                <span>Pré-visualizar E-mail</span>
                            </button>
                        </div>

                        {activeTab === "editor" ? (
                            <div className="space-y-4">
                                {/* Dynamic Variable Tags */}
                                <div className="flex flex-wrap items-center gap-1.5">
                                    <span className="text-xs font-semibold text-slate-500 mr-1">
                                        Inserir Variável:
                                    </span>
                                    {["{NOME}", "{CATEGORIA}", "{ROTA}", "{BI}", "{CAMISETE}"].map((tag) => (
                                        <button
                                            key={tag}
                                            onClick={() => handleInsertTag(tag)}
                                            className="text-[11px] font-mono font-bold bg-slate-100 hover:bg-rose-50 hover:text-rose-700 text-slate-700 border border-slate-200 px-2 py-0.5 rounded transition-colors"
                                        >
                                            + {tag}
                                        </button>
                                    ))}
                                </div>

                                {/* Subject */}
                                <div className="space-y-1.5">
                                    <Label htmlFor="email-subject" className="text-xs font-bold text-slate-700">
                                        Assunto do E-mail
                                    </Label>
                                    <Input
                                        id="email-subject"
                                        value={subject}
                                        onChange={(e) => setSubject(e.target.value)}
                                        className="h-10 bg-slate-50 border-slate-200 font-medium"
                                        placeholder="Digite o assunto..."
                                    />
                                </div>

                                {/* Body */}
                                <div className="space-y-1.5">
                                    <Label htmlFor="email-body" className="text-xs font-bold text-slate-700">
                                        Corpo da Mensagem
                                    </Label>
                                    <Textarea
                                        id="email-body"
                                        value={body}
                                        onChange={(e) => setBody(e.target.value)}
                                        rows={10}
                                        className="bg-slate-50 border-slate-200 font-sans text-xs leading-relaxed custom-scrollbar p-3"
                                        placeholder="Digite a mensagem do e-mail..."
                                    />
                                </div>
                            </div>
                        ) : (
                            /* Preview Tab */
                            <div className="rounded-xl border border-slate-200 overflow-hidden bg-slate-100 p-4">
                                <div className="max-w-xl mx-auto bg-white rounded-xl shadow-md border border-slate-200 overflow-hidden text-slate-800">
                                    {/* Header Banner */}
                                    <div className="bg-gradient-to-r from-rose-600 to-rose-700 p-6 text-center text-white">
                                        <Image
                                            alt="16ª Corrida Millennium bim"
                                            src="/assets/brand/logo-16-white.png"
                                            width={80}
                                            height={80}
                                            className="mx-auto mb-2 object-contain"
                                        />
                                        <h4 className="text-lg font-extrabold tracking-tight">
                                            16ª Corrida Millennium bim
                                        </h4>
                                        <p className="text-xs text-rose-100 font-medium">
                                            Comunicação Oficial do Evento
                                        </p>
                                    </div>

                                    {/* Content Body */}
                                    <div className="p-6 space-y-4">
                                        <div className="border-b border-slate-100 pb-3">
                                            <p className="text-xs text-slate-500 font-medium">Assunto:</p>
                                            <p className="text-sm font-bold text-slate-900">{subject}</p>
                                        </div>

                                        <div className="text-xs whitespace-pre-wrap leading-relaxed text-slate-700">
                                            {formattedPreviewBody}
                                        </div>

                                        <div className="pt-4 border-t border-slate-100 text-center">
                                            <span className="inline-block bg-rose-600 text-white font-bold text-xs px-5 py-2.5 rounded-lg shadow-xs">
                                                Ver Detalhes na Plataforma
                                            </span>
                                        </div>
                                    </div>

                                    {/* Footer */}
                                    <div className="bg-slate-50 p-4 text-center text-[10px] text-slate-500 border-t border-slate-100">
                                        <p>Banco Internacional de Moçambique SA. Todos os direitos reservados.</p>
                                        <p>Maputo, Moçambique • 25 de Outubro</p>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Send Controls */}
                        <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                            <span className="text-xs text-slate-500 font-medium">
                                Pronto para disparar para{" "}
                                <strong className="text-slate-900">{filteredRecipients.length} participantes</strong>.
                            </span>

                            <Button
                                onClick={handleSendEmails}
                                disabled={isSending || filteredRecipients.length === 0}
                                className="bg-rose-600 hover:bg-rose-700 text-white font-bold px-6 h-11 rounded-xl shadow-xs transition-all"
                            >
                                {isSending ? (
                                    <>
                                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                        Enviando ({sendProgress}%)...
                                    </>
                                ) : (
                                    <>
                                        <Send className="mr-2 h-4 w-4" />
                                        Disparar E-mails Agora
                                    </>
                                )}
                            </Button>
                        </div>
                    </div>
                )}
            </DialogContent>
        </Dialog>
    );
}
