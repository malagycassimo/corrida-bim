"use client";

import { useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { CheckCircle2, Loader2, MessageSquareText, Send, Users } from "lucide-react";
import { getApiBaseUrl } from "@/lib/api";

type Participant = {
    IDCode: string;
    firstName: string;
    lastName: string;
    phone: string;
    category: string;
    route: string;
    shirt: string;
};

type SmsJob = {
    id: string;
    status: "queued" | "processing" | "completed" | "failed";
    total: number;
    sentCount: number;
    failedCount: number;
    error?: string;
};

const DEFAULT_MESSAGE = "Ola {NOME}, a sua inscricao na 16a Corrida foi confirmada! Percurso: {ROTA}. Verifique o seu email para mais detalhes.";

export function SmsManagerModal({ data = [] }: { data?: Participant[] }) {
    const [isOpen, setIsOpen] = useState(false);
    const [mode, setMode] = useState<"test" | "participants">("participants");
    const [selectedCategory, setSelectedCategory] = useState("all");
    const [phone, setPhone] = useState("");
    const [message, setMessage] = useState(DEFAULT_MESSAGE);
    const [isSending, setIsSending] = useState(false);
    const [job, setJob] = useState<SmsJob | null>(null);
    const [error, setError] = useState("");

    const recipientsWithPhones = useMemo(
        () => data.filter((participant) => participant.phone?.trim()),
        [data],
    );
    const categories = useMemo(
        () => Array.from(new Set(recipientsWithPhones.map((participant) => participant.category?.trim()).filter(Boolean)))
            .sort((first, second) => first!.localeCompare(second!, "pt")),
        [recipientsWithPhones],
    );
    const recipients = useMemo(
        () => selectedCategory === "all"
            ? recipientsWithPhones
            : recipientsWithPhones.filter((participant) => participant.category?.trim() === selectedCategory),
        [recipientsWithPhones, selectedCategory],
    );
    const progress = job?.total ? Math.round(((job.sentCount + job.failedCount) / job.total) * 100) : 0;

    const getServerUrl = () => getApiBaseUrl();

    const handleSend = async () => {
        setError("");
        setJob(null);
        const targets = mode === "test"
            ? [{ phone: phone.trim() }]
            : recipients.map(({ IDCode, firstName, lastName, phone, category, route, shirt }) => ({
                IDCode, firstName, lastName, phone, category, route, shirt,
            }));

        if (mode === "test" && !phone.trim()) {
            setError("Informe o telefone de teste, por exemplo 258841234567 ou +258841234567.");
            return;
        }
        if (mode === "test" && /^\+?258/.test(phone.trim().replace(/[\s().-]/g, "")) &&
            !/^\+?258\d{9}$/.test(phone.trim().replace(/[\s().-]/g, ""))) {
            setError("O número moçambicano deve ter 9 dígitos após 258. Exemplo: 258841234567.");
            return;
        }
        if (!targets.length) {
            setError("Não há participantes com telefone cadastrado.");
            return;
        }

        setIsSending(true);
        try {
            const serverUrl = getServerUrl();
            const response = await fetch(`${serverUrl}/participants/send-sms`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ recipients: targets, message }),
            });
            const responseData = await response.json().catch(() => ({}));
            if (!response.ok) {
                throw new Error(responseData.message || "Não foi possível iniciar o envio de SMS.");
            }

            setJob(responseData as SmsJob);
            let currentJob = responseData as SmsJob;
            while (currentJob.status !== "completed" && currentJob.status !== "failed") {
                await new Promise((resolve) => setTimeout(resolve, 2000));
                const statusResponse = await fetch(`${serverUrl}/participants/sms-jobs/${currentJob.id}`, {
                    cache: "no-store",
                });
                if (!statusResponse.ok) throw new Error("A tarefa de SMS deixou de estar disponível.");
                currentJob = await statusResponse.json() as SmsJob;
                setJob(currentJob);
            }
        } catch (sendError) {
            setError(sendError instanceof Error ? sendError.message : "Falha ao enviar SMS.");
        } finally {
            setIsSending(false);
        }
    };

    const handleOpenChange = (open: boolean) => {
        setIsOpen(open);
        if (open) {
            setJob(null);
            setError("");
        }
    };

    return (
        <Dialog open={isOpen} onOpenChange={handleOpenChange}>
            <DialogTrigger asChild>
                <Button className="h-11 shrink-0 rounded-xl bg-emerald-700 px-4 font-semibold text-white hover:bg-emerald-800">
                    <MessageSquareText className="h-4 w-4" />
                    Enviar SMS
                </Button>
            </DialogTrigger>

            <DialogContent className="max-h-[90vh] max-w-xl overflow-y-auto rounded-xl bg-white p-6">
                <DialogHeader className="border-b border-slate-100 pb-4">
                    <DialogTitle className="flex items-center gap-2 text-xl">
                        <MessageSquareText className="h-5 w-5 text-emerald-700" />
                        Envio de SMS
                    </DialogTitle>
                    <p className="text-sm text-slate-500">Envie uma mensagem de teste ou inicie o envio em lotes.</p>
                </DialogHeader>

                <div className="space-y-5 pt-2">
                    <div className="grid grid-cols-2 gap-2" role="group" aria-label="Tipo de envio">
                        <Button
                            type="button"
                            variant={mode === "test" ? "default" : "outline"}
                            onClick={() => setMode("test")}
                            disabled={isSending}
                        >
                            Testar um número
                        </Button>
                        <Button
                            type="button"
                            variant={mode === "participants" ? "default" : "outline"}
                            onClick={() => setMode("participants")}
                            disabled={isSending}
                        >
                            <Users className="h-4 w-4" />
                            Inscritos ({recipients.length})
                        </Button>
                    </div>

                    {mode === "test" ? (
                        <div className="space-y-2">
                            <Label htmlFor="sms-phone">Telefone de teste</Label>
                            <Input
                                id="sms-phone"
                                type="tel"
                                autoComplete="tel"
                                placeholder="+258841234567"
                                value={phone}
                                onChange={(event) => setPhone(event.target.value)}
                                disabled={isSending}
                            />
                        </div>
                    ) : (
                        <div className="space-y-2">
                            <Label htmlFor="sms-category">Categoria</Label>
                            <select
                                id="sms-category"
                                value={selectedCategory}
                                onChange={(event) => setSelectedCategory(event.target.value)}
                                disabled={isSending}
                                className="h-10 w-full rounded-md border border-slate-200 bg-white px-3 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-700"
                            >
                                <option value="all">Todas as categorias</option>
                                {categories.map((category) => (
                                    <option key={category} value={category}>{category}</option>
                                ))}
                            </select>
                            <p className="border-l-2 border-amber-500 bg-amber-50 px-3 py-2 text-sm text-amber-900">
                                A mensagem será enviada aos {recipients.length} participantes com telefone na categoria selecionada.
                            </p>
                        </div>
                    )}

                    <div className="space-y-2">
                        <div className="flex items-center justify-between">
                            <Label htmlFor="sms-message">Mensagem</Label>
                            <span className={`text-xs ${message.length > 1600 ? "text-red-600" : "text-slate-500"}`}>
                                {message.length}/1600
                            </span>
                        </div>
                        <Textarea
                            id="sms-message"
                            value={message}
                            onChange={(event) => setMessage(event.target.value)}
                            disabled={isSending}
                            maxLength={1600}
                            rows={5}
                            className="resize-y"
                        />
                        <p className="text-xs text-slate-500">Campos opcionais: {"{NOME}"}, {"{ROTA}"}, {"{CATEGORIA}"}, {"{BI}"} e {"{CAMISETE}"}.</p>
                    </div>

                    {job && (
                        <div className="space-y-2 rounded-md border border-slate-200 p-3" aria-live="polite">
                            <div className="flex items-center justify-between text-sm">
                                <span className="font-medium text-slate-800">
                                    {job.status === "completed"
                                        ? job.failedCount > 0 ? "Envio concluído com falhas" : "Envio concluído"
                                        : "Enviando mensagens"}
                                </span>
                                <span className="text-slate-600">{progress}%</span>
                            </div>
                            <div className="h-2 overflow-hidden rounded-full bg-slate-100">
                                <div className="h-full bg-emerald-600 transition-all" style={{ width: `${progress}%` }} />
                            </div>
                            <p className="text-xs text-slate-600">
                                {job.sentCount} enviadas · {job.failedCount} falhas · {job.total} destinatários
                            </p>
                        </div>
                    )}

                    {error && <p role="alert" className="text-sm text-red-700">{error}</p>}

                    {job?.status === "completed" && (
                        job.failedCount > 0 ? (
                            <div role="alert" className="space-y-1 text-sm text-red-700">
                                <p>{job.error || "Alguns SMS não puderam ser enviados. Confira os números e as credenciais do MozeSMS."}</p>
                                <p>Os SMS aceites pelo MozeSMS ainda dependem da entrega pela operadora.</p>
                            </div>
                        ) : (
                            <p className="flex items-center gap-2 text-sm text-emerald-800">
                                <CheckCircle2 className="h-4 w-4" />
                                Processamento finalizado. Os SMS foram enviados via MozeSMS; a entrega depende da operadora.
                            </p>
                        )
                    )}
                    {job?.status === "failed" && (
                        <p role="alert" className="text-sm text-red-700">
                            {job.error || "O processamento foi interrompido."} {job.sentCount} mensagens foram aceites antes da falha.
                        </p>
                    )}

                    <div className="flex justify-end">
                        <Button
                            type="button"
                            onClick={handleSend}
                            disabled={isSending || !message.trim() || message.length > 1600 || (mode === "participants" && recipients.length === 0)}
                            className="bg-emerald-700 text-white hover:bg-emerald-800"
                        >
                            {isSending ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
                            {isSending ? "Processando..." : mode === "test" ? "Enviar teste" : `Iniciar envio (${recipients.length})`}
                        </Button>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
}