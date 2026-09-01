"use client";

import { useEffect, useState } from "react";
import { CheckCircle2, Lock, Unlock, Loader2 } from "lucide-react";

interface RegistrationToggleProps {
    initialStatus?: boolean;
}

export function RegistrationToggle({ initialStatus }: RegistrationToggleProps) {
    const [isOpen, setIsOpen] = useState<boolean>(initialStatus ?? true);
    const [loading, setLoading] = useState<boolean>(initialStatus === undefined);
    const [updating, setUpdating] = useState<boolean>(false);
    const [toastMessage, setToastMessage] = useState<string | null>(null);

    const getServerUrl = () => {
        if (typeof window !== "undefined") {
            return process.env.NEXT_PUBLIC_API_URL || "http://localhost:3002";
        }
        return "http://server:3002";
    };

    useEffect(() => {
        if (initialStatus !== undefined) return;

        const fetchStatus = async () => {
            try {
                const serverUrl = getServerUrl();
                const res = await fetch(`${serverUrl}/settings/registration-status`, {
                    cache: "no-store",
                });
                if (res.ok) {
                    const data = await res.json();
                    setIsOpen(data.registrationOpen);
                }
            } catch (err) {
                console.error("Erro ao buscar estado das inscrições:", err);
            } finally {
                setLoading(false);
            }
        };

        fetchStatus();
    }, [initialStatus]);

    const handleToggle = async () => {
        if (updating) return;

        const nextState = !isOpen;
        setUpdating(true);

        try {
            const serverUrl = getServerUrl();
            const res = await fetch(`${serverUrl}/settings/registration-status`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ registrationOpen: nextState }),
            });

            if (res.ok) {
                setIsOpen(nextState);
                const msg = nextState
                    ? "Inscrições reabertas com sucesso!"
                    : "Inscrições fechadas temporariamente!";
                setToastMessage(msg);
                setTimeout(() => setToastMessage(null), 4000);
            } else {
                alert("Erro ao atualizar o estado das inscrições.");
            }
        } catch (err) {
            console.error("Erro ao alterar estado das inscrições:", err);
            alert("Não foi possível conectar ao servidor para alterar o estado.");
        } finally {
            setUpdating(false);
        }
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center space-x-2 bg-slate-50 border border-slate-200 px-6 py-3 rounded-2xl text-slate-500 text-xs font-medium animate-pulse max-w-md mx-auto">
                <Loader2 className="h-4 w-4 animate-spin text-slate-400" />
                <span>A carregar estado das inscrições...</span>
            </div>
        );
    }

    return (
        <div className="w-full max-w-xl mx-auto space-y-2">
            <div className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4 text-left transition-all">
                {/* Information / Current Status */}
                <div className="space-y-1 text-center sm:text-left">
                    <span className="text-xs uppercase font-bold text-slate-600 tracking-wider">
                        Controlo de Acesso ao Formulário
                    </span>
                    <div className="flex items-center justify-center sm:justify-start space-x-2 pt-0.5">
                        {isOpen ? (
                            <div className="flex items-center space-x-2 bg-emerald-50 border border-emerald-200 px-3 py-1.5 rounded-xl text-emerald-800 text-xs font-bold">
                                <span className="relative flex h-2.5 w-2.5">
                                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                                    <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
                                </span>
                                <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                                <span>Inscrições Abertas</span>
                            </div>
                        ) : (
                            <div className="flex items-center space-x-2 bg-amber-50 border border-amber-200 px-3 py-1.5 rounded-xl text-amber-900 text-xs font-bold">
                                <Lock className="h-4 w-4 text-amber-600" />
                                <span>Fechadas Temporariamente</span>
                            </div>
                        )}
                    </div>
                </div>

                {/* Explicit Action Button with Switch */}
                <button
                    onClick={handleToggle}
                    disabled={updating}
                    type="button"
                    className={`w-full sm:w-auto px-5 py-3 rounded-xl font-bold text-xs flex items-center justify-center space-x-3 transition-all duration-200 shadow-sm active:scale-98 ${
                        isOpen
                            ? "bg-rose-50 text-rose-700 hover:bg-rose-100 border border-rose-200"
                            : "bg-emerald-600 text-white hover:bg-emerald-700 shadow-emerald-200"
                    } ${updating ? "opacity-60 cursor-wait" : "cursor-pointer"}`}
                >
                    {updating ? (
                        <>
                            <Loader2 className="h-4 w-4 animate-spin" />
                            <span>A atualizar...</span>
                        </>
                    ) : isOpen ? (
                        <>
                            <Lock className="h-4 w-4 text-rose-600" />
                            <span>Fechar Inscrições</span>
                            {/* Visual Switch Graphic */}
                            <span className="inline-flex h-5 w-9 shrink-0 rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out bg-emerald-500 relative ml-1">
                                <span className="translate-x-4 inline-block h-4 w-4 transform rounded-full bg-white shadow-xs" />
                            </span>
                        </>
                    ) : (
                        <>
                            <Unlock className="h-4 w-4 text-white" />
                            <span>Reabrir Inscrições</span>
                            {/* Visual Switch Graphic */}
                            <span className="inline-flex h-5 w-9 shrink-0 rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out bg-slate-400 relative ml-1">
                                <span className="translate-x-0 inline-block h-4 w-4 transform rounded-full bg-white shadow-xs" />
                            </span>
                        </>
                    )}
                </button>
            </div>

            {toastMessage && (
                <div
                    className={`text-xs font-medium p-2.5 rounded-xl border text-center transition-all animate-fade-in ${
                        isOpen
                            ? "bg-emerald-50 text-emerald-800 border-emerald-200"
                            : "bg-amber-50 text-amber-900 border-amber-200"
                    }`}
                >
                    {toastMessage}
                </div>
            )}
        </div>
    );
}
