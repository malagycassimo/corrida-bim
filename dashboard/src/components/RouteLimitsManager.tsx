"use client";

import { useEffect, useState } from "react";
import { AlertTriangle, Check, Loader2, Save } from "lucide-react";
import { Button } from "@/components/ui/button";
import { getApiBaseUrl } from "@/lib/api";

interface RouteAvailability {
    registrationOpen: boolean;
    routeLimits: {
        corrida15k: number;
        caminhada7k: number;
    };
    routeCounts: {
        corrida15k: number;
        caminhada7k: number;
        total: number;
    };
}

type RouteLimitKey = keyof RouteAvailability["routeLimits"];

const ROUTES: { key: RouteLimitKey; label: string }[] = [
    { key: "corrida15k", label: "Corrida 15 km" },
    { key: "caminhada7k", label: "Caminhada 7,2 km" },
];

export function RouteLimitsManager({
    initialAvailability,
}: {
    initialAvailability: RouteAvailability;
}) {
    const [limits, setLimits] = useState<Record<RouteLimitKey, string>>({
        corrida15k: String(initialAvailability.routeLimits.corrida15k),
        caminhada7k: String(initialAvailability.routeLimits.caminhada7k),
    });
    const [counts, setCounts] = useState(initialAvailability.routeCounts);
    const [saving, setSaving] = useState(false);
    const [feedback, setFeedback] = useState("");
    const [error, setError] = useState("");
    const totalLimit = limits.corrida15k.trim() && limits.caminhada7k.trim()
        ? Number(limits.corrida15k) + Number(limits.caminhada7k)
        : "";

    useEffect(() => {
        setLimits({
            corrida15k: String(initialAvailability.routeLimits.corrida15k),
            caminhada7k: String(initialAvailability.routeLimits.caminhada7k),
        });
        setCounts(initialAvailability.routeCounts);
    }, [initialAvailability]);

    const handleSave = async () => {
        const parsedLimits = {
            corrida15k: Number(limits.corrida15k),
            caminhada7k: Number(limits.caminhada7k),
        };
        if (
            limits.corrida15k.trim() === "" ||
            !Number.isSafeInteger(parsedLimits.corrida15k) || parsedLimits.corrida15k < 0 ||
            limits.caminhada7k.trim() === "" ||
            !Number.isSafeInteger(parsedLimits.caminhada7k) || parsedLimits.caminhada7k < 0
        ) {
            setError("Indique limites inteiros iguais ou superiores a zero.");
            setFeedback("");
            return;
        }

        setSaving(true);
        setError("");
        setFeedback("");
        try {
            const serverUrl = getApiBaseUrl();
            const response = await fetch(`${serverUrl}/settings/route-limits`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(parsedLimits),
            });
            const result = await response.json();
            if (!response.ok) {
                throw new Error(result.message || "Não foi possível guardar os limites.");
            }

            setLimits({
                corrida15k: String(result.routeLimits.corrida15k),
                caminhada7k: String(result.routeLimits.caminhada7k),
            });
            setCounts(result.routeCounts);
            setFeedback("Limites guardados.");
        } catch (saveError) {
            setError(saveError instanceof Error ? saveError.message : "Erro ao guardar limites.");
        } finally {
            setSaving(false);
        }
    };

    return (
        <section className="flex h-full min-h-[184px] flex-col gap-3 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
            <div className="flex min-h-9 items-center justify-between gap-3">
                <h2 className="text-sm font-bold text-slate-900">Limites por percurso</h2>
                <Button onClick={handleSave} disabled={saving} size="sm" className="h-9 shrink-0 px-3">
                    {saving ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Save className="mr-2 h-4 w-4" />}
                    Guardar
                </Button>
            </div>

            <div className="grid flex-1 grid-cols-3 items-start gap-2">
                {ROUTES.map(({ key, label }) => {
                    const limit = Number(limits[key]);
                    const validLimit = limits[key].trim() !== "" && Number.isSafeInteger(limit) && limit >= 0;
                    const full = validLimit && counts[key] >= limit;

                    return (
                        <div key={key} className="min-w-0 space-y-1.5">
                            <label htmlFor={`limit-${key}`} className="block truncate text-xs font-semibold text-slate-800">
                                {label}
                            </label>
                            <input
                                id={`limit-${key}`}
                                aria-label={`Limite de inscrições: ${label}`}
                                type="number"
                                min={0}
                                step={1}
                                inputMode="numeric"
                                value={limits[key]}
                                onChange={(event) => setLimits((current) => ({ ...current, [key]: event.target.value }))}
                                className={`h-9 w-full rounded-lg border bg-white px-3 text-sm text-slate-900 outline-none focus:ring-2 ${
                                    full
                                        ? "border-rose-400 focus:border-rose-500 focus:ring-rose-100"
                                        : "border-slate-300 focus:border-emerald-600 focus:ring-emerald-100"
                                }`}
                            />
                            <div className={`flex min-h-8 items-start gap-1.5 text-xs font-medium ${full ? "text-rose-700" : "text-emerald-700"}`}>
                                {full ? <AlertTriangle className="mt-0.5 h-3.5 w-3.5 shrink-0" /> : <Check className="mt-0.5 h-3.5 w-3.5 shrink-0" />}
                                <span className="leading-4">
                                    {full
                                        ? `Esgotado · ${counts[key]} / ${limit}`
                                        : validLimit
                                            ? `${Math.max(0, limit - counts[key])} vagas · ${counts[key]} inscritos`
                                            : "Indique um limite inteiro válido."}
                                </span>
                            </div>
                        </div>
                    );
                })}
                <div className="min-w-0 space-y-1.5">
                    <label htmlFor="limit-total" className="block truncate text-xs font-semibold text-slate-800">
                        Total
                    </label>
                    <input
                        id="limit-total"
                        aria-label="Limite total de inscrições"
                        type="number"
                        value={totalLimit}
                        disabled
                        readOnly
                        className="h-9 w-full rounded-lg border border-slate-300 bg-slate-100 px-3 text-sm text-slate-500"
                    />
                    <div className="min-h-8 text-xs leading-4 text-slate-500">
                        Soma das vagas
                    </div>
                </div>
            </div>

            {(error || feedback) && (
                <p className={`text-sm ${error ? "text-rose-700" : "text-emerald-700"}`} role={error ? "alert" : "status"}>
                    {error || feedback}
                </p>
            )}
        </section>
    );
}