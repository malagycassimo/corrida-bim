"use client";

import React from "react";
import { MapPin } from "lucide-react";

export default function RaceScheduleCard() {
    return (
        <div className="flex flex-col items-center justify-center my-2 px-2">
            {/* Main Widget Card (Compact 50% scale) */}
            <div className="relative w-full max-w-[275px] rounded-[20px] bg-white shadow-[0_12px_28px_-8px_rgba(209,0,93,0.16)] border border-slate-200/80 flex items-stretch overflow-hidden select-none transition-all duration-300 hover:shadow-[0_16px_34px_-6px_rgba(209,0,93,0.22)]">
                
                {/* Left Side: Dark Panel with BIM Magenta Glow & Date */}
                <div className="relative w-[36%] shrink-0 bg-[#1E222A] text-white flex flex-col items-center justify-center py-3.5 px-2 overflow-hidden">
                    {/* Ambient Glows inspired by Millennium bim */}
                    <div className="absolute -bottom-6 -left-6 w-16 h-16 rounded-full bg-[#D1005D]/45 blur-lg pointer-events-none" />
                    <div className="absolute -top-4 -right-4 w-12 h-12 rounded-full bg-[#E73285]/25 blur-md pointer-events-none" />

                    {/* Date Typography matching reference image */}
                    <div className="relative z-10 flex flex-col items-center text-center">
                        <span className="text-2xl font-black tracking-tight text-white leading-none drop-shadow-xs">
                            25
                        </span>
                        <span className="text-[9px] font-bold tracking-[0.2em] text-white/75 uppercase mt-0.5">
                            OUT
                        </span>
                    </div>
                </div>

                {/* Circular Overlapping Glassmorphism Thumb Notch */}
                <div className="absolute left-[36%] top-1/2 -translate-x-1/2 -translate-y-1/2 z-20 pointer-events-none">
                    <div className="w-7 h-7 rounded-full bg-white/40 backdrop-blur-md border border-white/70 shadow-xs flex items-center justify-center">
                        <div className="w-2 h-2 rounded-full bg-primary/90 shadow-xs" />
                    </div>
                </div>

                {/* Right Side: Clean White Panel with Split-Weight Digital Typography */}
                <div className="relative flex-1 bg-white flex flex-col justify-center pl-6 pr-3 py-2.5">
                    {/* Time Display (06:00am) */}
                    <div className="flex items-baseline leading-none">
                        <span className="text-2xl font-black tracking-tight text-[#1A1D24]">
                            06
                        </span>
                        <span className="text-lg font-semibold text-neutral-400 mx-0.5">
                            :
                        </span>
                        <span className="text-2xl font-medium tracking-tight text-[#2B303B]">
                            00
                        </span>
                        <span className="text-[11px] font-normal text-neutral-500 lowercase tracking-normal ml-0.5">
                            am
                        </span>
                    </div>

                    {/* Section Label: Horário de Chegada (Simples e Direto) */}
                    <div className="mt-1 flex flex-col">
                        <span className="text-[10px] font-black uppercase tracking-[0.14em] text-primary leading-tight">
                            HORÁRIO DE CHEGADA
                        </span>
                    </div>
                </div>
            </div>

            {/* Venue Info */}
            <div className="flex items-center justify-center gap-1 mt-1.5 text-[10px] text-neutral-500">
                <MapPin className="w-3 h-3 text-primary shrink-0" />
                <span className="font-medium">Sede do Millennium bim, Maputo</span>
            </div>
        </div>
    );
}
