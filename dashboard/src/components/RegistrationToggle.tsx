"use client";

import { useEffect, useState } from "react";
import { CheckCircle2, Lock, Unlock, Loader2 } from "lucide-react";
import { getApiBaseUrl } from "@/lib/api";

interface RegistrationToggleProps {
    initialStatus?: boolean;
}

export function RegistrationToggle({ initialStatus }: RegistrationToggleProps) {
    const [isOpen, setIsOpen] = useState<boolean>(initialStatus ?? true);
    const [loading, setLoading] = useState<boolean>(initialStatus === undefined);
    const [updating, setUpdating] = useState<boolean>(false);
    const [toastMessage, setToastMessage] = useState<string | null>(null);

    const getServerUrl = () => getApiBaseUrl();

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
            <div className="flex min-h-[184px] w-full flex-col gap-3 rounded-2xl border border-slate-200 bg-white p-4 text-slate-500 shadow-sm">
                <h2 className="min-h-9 text-sm font-bold text-slate-900">Controlo de inscrições</h2>
                <div className="flex items-center gap-2 text-xs font-medium">
                    <Loader2 className="h-4 w-4 animate-spin text-slate-400" />
                    <span>A carregar estado das inscrições...</span>
                </div>
            </div>
        );
    }

    return (
        <section className="flex h-full min-h-[184px] w-full flex-col gap-3 rounded-2xl border border-slate-200 bg-white p-4 text-left shadow-sm">
            <h2 className="min-h-9 text-sm font-bold text-slate-900">Controlo de inscrições</h2>
            <div className="flex flex-1 flex-wrap items-start justify-between gap-3">
                {isOpen ? (
                    <div className="flex items-center space-x-2 rounded-xl border border-emerald-200 bg-emerald-50 px-3 py-1.5 text-xs font-bold text-emerald-800">
                        <span className="relative flex h-2.5 w-2.5">
                            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75"></span>
                            <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-500"></span>
                        </span>
                        <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                        <span>Inscrições abertas</span>
                    </div>
                ) : (
                    <div className="flex items-center space-x-2 rounded-xl border border-amber-200 bg-amber-50 px-3 py-1.5 text-xs font-bold text-amber-900">
                        <Lock className="h-4 w-4 text-amber-600" />
                        <span>Fechadas temporariamente</span>
                    </div>
                )}

                <button
                    onClick={handleToggle}
                    disabled={updating}
                    type="button"
                    className={`w-full px-4 py-2.5 rounded-xl font-bold text-xs flex items-center justify-center space-x-3 transition-all duration-200 shadow-sm active:scale-98 sm:w-auto ${
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
                            <span>Fechar inscrições</span>
                            {/* Visual Switch Graphic */}
                            <span className="inline-flex h-5 w-9 shrink-0 rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out bg-emerald-500 relative ml-1">
                                <span className="translate-x-4 inline-block h-4 w-4 transform rounded-full bg-white shadow-xs" />
                            </span>
                        </>
                    ) : (
                        <>
                            <Unlock className="h-4 w-4 text-white" />
                            <span>Reabrir inscrições</span>
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
        </section>
    );
}
