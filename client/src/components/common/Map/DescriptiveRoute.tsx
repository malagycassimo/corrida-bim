"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    Flag,
    RotateCcw,
    Navigation,
    Check,
    Copy,
    Milestone,
    Compass,
} from "lucide-react";

export interface RouteDetail {
    id: "run" | "disabled" | "walk";
    title: string;
    distance: string;
    subtitle: string;
    badge: string;
    turnaroundPoint: string;
    turnaroundDesc: string;
    fullText: string;
    highlights: {
        label: string;
        value: string;
    }[];
    steps: {
        number: number;
        title: string;
        description: string;
        type: "start" | "waypoint" | "turnaround" | "finish";
    }[];
}

export const ROUTES_DATA: Record<string, RouteDetail> = {
    run: {
        id: "run",
        title: "Corrida dos Atletas",
        distance: "14 km",
        subtitle: "Percurso oficial de competição para atletas federados e amadores",
        badge: "Corrida Oficial",
        turnaroundPoint: "Rotunda do Baía Mall",
        turnaroundDesc: "Ponto oficial de retorno da prova de 14km",
        fullText:
            "Partida: Sede do banco Bim na Rua dos Desportistas – Rua que passa frente ao JAT – Avenida 25 de Setembro (à esquerda) – Praça Robert Mugabe – Avenida da Marginal até a rotunda do Baía Mall – dar volta – Marginal até Praça Robert Mugabe – Rua dos Desportistas – Chegada frente a Sede do banco Bim",
        highlights: [
            { label: "Partida & Chegada", value: "Sede do Bim (Rua dos Desportistas)" },
            { label: "Ponto de Retorno", value: "Rotunda do Baía Mall" },
            { label: "Distância Total", value: "14 km" },
            { label: "Tipo de Piso", value: "Asfalto plano e Marginal costeira" },
        ],
        steps: [
            {
                number: 1,
                title: "Partida Oficial",
                description: "Sede do banco Bim na Rua dos Desportistas",
                type: "start",
            },
            {
                number: 2,
                title: "Passagem pelo JAT",
                description: "Rua que passa frente ao complexo empresarial JAT",
                type: "waypoint",
            },
            {
                number: 3,
                title: "Avenida 25 de Setembro",
                description: "Vira à esquerda na Avenida 25 de Setembro",
                type: "waypoint",
            },
            {
                number: 4,
                title: "Praça Robert Mugabe",
                description: "Travessia da praça em direção ao litoral",
                type: "waypoint",
            },
            {
                number: 5,
                title: "Avenida da Marginal",
                description: "Percurso panorâmico ao longo da orla marítima de Maputo",
                type: "waypoint",
            },
            {
                number: 6,
                title: "Ponto de Retorno (Dar a volta)",
                description: "Rotunda do Baía Mall – ponto oficial de retorno dos 14km",
                type: "turnaround",
            },
            {
                number: 7,
                title: "Regresso pela Marginal",
                description: "Sentido inverso pela Avenida da Marginal até à Praça Robert Mugabe",
                type: "waypoint",
            },
            {
                number: 8,
                title: "Rua dos Desportistas",
                description: "Aproximação da reta final",
                type: "waypoint",
            },
            {
                number: 9,
                title: "Meta & Chegada",
                description: "Chegada consagrada frente à Sede do banco Bim",
                type: "finish",
            },
        ],
    },
    disabled: {
        id: "disabled",
        title: "Corrida dos Portadores de Deficiência",
        distance: "9 km",
        subtitle: "Percurso adaptado para cadeirantes e atletas com deficiência motora",
        badge: "Inclusão & Desporto",
        turnaroundPoint: "Penha Palhotas",
        turnaroundDesc: "Ponto oficial de retorno da prova de 9km",
        fullText:
            "Partida: Sede do banco Bim na Rua dos Desportistas – Rua que passa frente ao JAT – Avenida 25 de Setembro (à esquerda) – Praça Robert Mugabe – Avenida da Marginal até às Penha Palhotas – dar volta – Avenida Marginal – Praça Robert Mugabe – Rua dos Desportistas – Chegada frente a Sede do banco Bim",
        highlights: [
            { label: "Partida & Chegada", value: "Sede do Bim (Rua dos Desportistas)" },
            { label: "Ponto de Retorno", value: "Penha Palhotas" },
            { label: "Distância Total", value: "9 km" },
            { label: "Acessibilidade", value: "Pista adaptada e apoio especializado" },
        ],
        steps: [
            {
                number: 1,
                title: "Partida Oficial",
                description: "Sede do banco Bim na Rua dos Desportistas",
                type: "start",
            },
            {
                number: 2,
                title: "Passagem pelo JAT",
                description: "Rua que passa frente ao complexo JAT",
                type: "waypoint",
            },
            {
                number: 3,
                title: "Avenida 25 de Setembro",
                description: "Vira à esquerda na Avenida 25 de Setembro",
                type: "waypoint",
            },
            {
                number: 4,
                title: "Praça Robert Mugabe",
                description: "Passagem pela praça rumo à Avenida da Marginal",
                type: "waypoint",
            },
            {
                number: 5,
                title: "Avenida da Marginal",
                description: "Percurso em piso nivelado pela orla marítima",
                type: "waypoint",
            },
            {
                number: 6,
                title: "Ponto de Retorno (Dar a volta)",
                description: "Penha Palhotas – ponto oficial de retorno dos 9km",
                type: "turnaround",
            },
            {
                number: 7,
                title: "Regresso pela Marginal",
                description: "Avenida Marginal até à Praça Robert Mugabe",
                type: "waypoint",
            },
            {
                number: 8,
                title: "Rua dos Desportistas",
                description: "Aproximação da reta final",
                type: "waypoint",
            },
            {
                number: 9,
                title: "Meta & Chegada",
                description: "Chegada frente à Sede do banco Bim",
                type: "finish",
            },
        ],
    },
    walk: {
        id: "walk",
        title: "Caminhada da Família e Lazer",
        distance: "7 km",
        subtitle: "Caminhada aberta a participantes de todas as idades para promoção da saúde e bem-estar",
        badge: "Caminhada Saudável",
        turnaroundPoint: "Clube Naval",
        turnaroundDesc: "Ponto oficial de retorno da caminhada de 7km",
        fullText:
            "Partida: Sede do banco Bim na Rua dos Desportistas – Rua que passa frente ao JAT – Avenida 25 de Setembro (à esquerda) – Praça Robert Mugabe – Avenida da Marginal até o Clube Naval – dar volta – Praça Robert Mugabe – Rua dos Desportistas – Chegada frente a Sede do banco Bim",
        highlights: [
            { label: "Partida & Chegada", value: "Sede do Bim (Rua dos Desportistas)" },
            { label: "Ponto de Retorno", value: "Clube Naval" },
            { label: "Distância Total", value: "7 km" },
            { label: "Nível", value: "Acessível a todas as idades e famílias" },
        ],
        steps: [
            {
                number: 1,
                title: "Partida Oficial",
                description: "Sede do banco Bim na Rua dos Desportistas",
                type: "start",
            },
            {
                number: 2,
                title: "Passagem pelo JAT",
                description: "Rua que passa frente ao JAT",
                type: "waypoint",
            },
            {
                number: 3,
                title: "Avenida 25 de Setembro",
                description: "Vira à esquerda na Avenida 25 de Setembro",
                type: "waypoint",
            },
            {
                number: 4,
                title: "Praça Robert Mugabe",
                description: "Travessia da praça em direção ao mar",
                type: "waypoint",
            },
            {
                number: 5,
                title: "Avenida da Marginal",
                description: "Caminhada revigorante junto à brisa do mar",
                type: "waypoint",
            },
            {
                number: 6,
                title: "Ponto de Retorno (Dar a volta)",
                description: "Clube Naval de Maputo – ponto oficial de retorno dos 7km",
                type: "turnaround",
            },
            {
                number: 7,
                title: "Regresso pela Marginal",
                description: "Retorno pela Avenida Marginal até à Praça Robert Mugabe",
                type: "waypoint",
            },
            {
                number: 8,
                title: "Rua dos Desportistas",
                description: "Entrada na reta final",
                type: "waypoint",
            },
            {
                number: 9,
                title: "Meta & Chegada",
                description: "Chegada festiva frente à Sede do banco Bim",
                type: "finish",
            },
        ],
    },
};

export default function DescriptiveRoute({ activeRoute }: { activeRoute: string }) {
    const [copied, setCopied] = useState(false);
    const route = ROUTES_DATA[activeRoute] || ROUTES_DATA.walk;

    const handleCopy = () => {
        if (typeof navigator !== "undefined" && navigator.clipboard) {
            navigator.clipboard.writeText(route.fullText);
            setCopied(true);
            setTimeout(() => setCopied(false), 2500);
        }
    };

    return (
        <div className="w-full max-w-4xl mx-auto px-3 sm:px-0">
            <AnimatePresence mode="wait">
                <motion.div
                    key={route.id}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -12 }}
                    transition={{ duration: 0.28, ease: "easeOut" }}
                    className="bg-white rounded-3xl border border-slate-200/80 shadow-[0_16px_40px_-12px_rgba(209,0,93,0.12)] overflow-hidden"
                >
                    {/* Key Milestones Bar */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 divide-y sm:divide-y-0 sm:divide-x divide-slate-100 bg-slate-50/70 border-b border-slate-100">
                        {/* Partida */}
                        <div className="p-4 sm:p-5 flex items-start gap-3">
                            <div className="size-10 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0">
                                <Flag className="size-5" />
                            </div>
                            <div>
                                <span className="text-[11px] font-bold uppercase tracking-wider text-neutral-400 block">
                                    Ponto de Partida
                                </span>
                                <span className="text-sm font-semibold text-neutral-800">
                                    Sede do banco Bim
                                </span>
                                <span className="text-xs text-neutral-500 block">
                                    Rua dos Desportistas
                                </span>
                            </div>
                        </div>

                        {/* Ponto de Retorno */}
                        <div className="p-4 sm:p-5 flex items-start gap-3 bg-rose-50/40">
                            <div className="size-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center shrink-0">
                                <RotateCcw className="size-5" />
                            </div>
                            <div>
                                <span className="text-[11px] font-bold uppercase tracking-wider text-primary block">
                                    Ponto de Retorno
                                </span>
                                <span className="text-sm font-bold text-neutral-900">
                                    {route.turnaroundPoint}
                                </span>
                                <span className="text-xs text-neutral-500 block">
                                    {route.turnaroundDesc}
                                </span>
                            </div>
                        </div>

                        {/* Chegada */}
                        <div className="p-4 sm:p-5 flex items-start gap-3">
                            <div className="size-10 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0">
                                <Milestone className="size-5" />
                            </div>
                            <div>
                                <span className="text-[11px] font-bold uppercase tracking-wider text-neutral-400 block">
                                    Meta & Chegada
                                </span>
                                <span className="text-sm font-semibold text-neutral-800">
                                    Sede do banco Bim
                                </span>
                                <span className="text-xs text-neutral-500 block">
                                    Rua dos Desportistas
                                </span>
                            </div>
                        </div>
                    </div>

                    <div className="p-6 sm:p-8 space-y-8">
                        {/* Step-by-Step Itinerary */}
                        <div>
                            <div className="flex items-center gap-2 mb-6">
                                <Compass className="w-5 h-5 text-primary" />
                                <h4 className="text-lg font-bold text-neutral-900">
                                    Sequência do Itinerário Passo a Passo
                                </h4>
                            </div>

                            <div className="relative pl-6 sm:pl-8 space-y-6 before:absolute before:left-[15px] sm:before:left-[19px] before:top-3 before:bottom-3 before:w-0.5 before:bg-gradient-to-b before:from-emerald-500 before:via-primary before:to-emerald-600">
                                {route.steps.map((step) => {
                                    const isStart = step.type === "start";
                                    const isTurn = step.type === "turnaround";
                                    const isFinish = step.type === "finish";

                                    return (
                                        <div key={step.number} className="relative group">
                                            {/* Node icon / indicator */}
                                            <div
                                                className={`absolute -left-[30px] sm:-left-[35px] top-0.5 size-7 sm:size-8 rounded-full border-2 flex items-center justify-center text-xs font-bold transition-transform group-hover:scale-110 ${
                                                    isStart
                                                        ? "bg-emerald-500 border-white text-white shadow-sm ring-4 ring-emerald-100"
                                                        : isTurn
                                                        ? "bg-primary border-white text-white shadow-md ring-4 ring-rose-100 scale-105"
                                                        : isFinish
                                                        ? "bg-emerald-600 border-white text-white shadow-sm ring-4 ring-emerald-100"
                                                        : "bg-white border-neutral-300 text-neutral-600 shadow-xs"
                                                }`}
                                            >
                                                {isStart ? (
                                                    <Flag className="size-3.5" />
                                                ) : isTurn ? (
                                                    <RotateCcw className="size-3.5" />
                                                ) : isFinish ? (
                                                    <Milestone className="size-3.5" />
                                                ) : (
                                                    <span>{step.number}</span>
                                                )}
                                            </div>

                                            {/* Step Content Card */}
                                            <div
                                                className={`p-3.5 sm:p-4 rounded-2xl border transition-all ${
                                                    isTurn
                                                        ? "bg-gradient-to-r from-rose-50/80 via-white to-rose-50/40 border-primary/30 shadow-xs"
                                                        : isStart || isFinish
                                                        ? "bg-emerald-50/40 border-emerald-200/80"
                                                        : "bg-slate-50/50 border-slate-100 hover:bg-slate-50"
                                                }`}
                                            >
                                                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                                                    <span
                                                        className={`text-sm sm:text-base font-bold ${
                                                            isTurn
                                                                ? "text-primary"
                                                                : isStart || isFinish
                                                                ? "text-emerald-800"
                                                                : "text-neutral-800"
                                                        }`}
                                                    >
                                                        {step.title}
                                                    </span>
                                                    {isTurn && (
                                                        <span className="inline-flex items-center gap-1 text-[11px] font-bold text-primary uppercase tracking-wide bg-primary/10 px-2.5 py-0.5 rounded-full w-fit">
                                                            <RotateCcw className="w-3 h-3" />
                                                            Inversão de Marcha
                                                        </span>
                                                    )}
                                                </div>
                                                <p className="text-xs sm:text-sm text-neutral-600 mt-0.5">
                                                    {step.description}
                                                </p>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>

                        {/* Official Narrative Callout Box with Copy Action */}
                        <div className="bg-gradient-to-br from-neutral-50 to-rose-50/30 rounded-2xl p-5 sm:p-6 border border-neutral-200/80 relative">
                            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-3">
                                <div className="flex items-center gap-2">
                                    <Navigation className="w-4 h-4 text-primary" />
                                    <h5 className="text-xs font-bold uppercase tracking-wider text-neutral-700">
                                        Descrição Oficial do Percurso ({route.distance})
                                    </h5>
                                </div>

                                <button
                                    type="button"
                                    onClick={handleCopy}
                                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-neutral-700 bg-white border border-slate-200 hover:border-primary/40 hover:text-primary transition shadow-xs cursor-pointer w-fit"
                                >
                                    {copied ? (
                                        <>
                                            <Check className="w-3.5 h-3.5 text-emerald-600" />
                                            <span className="text-emerald-700">Copiado!</span>
                                        </>
                                    ) : (
                                        <>
                                            <Copy className="w-3.5 h-3.5 text-neutral-500" />
                                            <span>Copiar Itinerário</span>
                                        </>
                                    )}
                                </button>
                            </div>

                            <p className="text-sm sm:text-base text-neutral-800 leading-relaxed font-medium bg-white/80 p-4 rounded-xl border border-slate-100">
                                {route.fullText}
                            </p>
                        </div>
                    </div>
                </motion.div>
            </AnimatePresence>
        </div>
    );
}

