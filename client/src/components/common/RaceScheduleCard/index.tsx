"use client";

import React from "react";
import { Clock, MapPin } from "lucide-react";

interface FlipTileProps {
    value: string;
    suffix?: string;
}

const FlipTile = ({ value, suffix }: FlipTileProps) => {
    return (
        <div className="relative w-[130px] sm:w-[155px] md:w-[175px] h-[120px] sm:h-[142px] md:h-[160px] rounded-[24px] sm:rounded-[28px] bg-[#F4F1EA] border border-[#E8E4DA] shadow-[0_2px_8px_rgba(0,0,0,0.04)] flex items-center justify-center overflow-hidden select-none">
            {/* The Flip Digits */}
            <span className="relative z-0 text-[64px] sm:text-[78px] md:text-[90px] font-black tracking-tight text-[#383531] leading-none">
                {value}
            </span>

            {/* Horizontal Split Line across the center */}
            <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 h-[3px] bg-[#DDD7CA] border-y border-[#D0C9BA] z-10" />

            {/* Mechanical side hinge notches with rounded pill caps */}
            <div className="absolute left-0 top-1/2 -translate-y-1/2 w-2 h-3.5 bg-[#C8C1B2] rounded-r-md z-20" />
            <div className="absolute right-0 top-1/2 -translate-y-1/2 w-2 h-3.5 bg-[#C8C1B2] rounded-l-md z-20" />

            {/* Suffix (AM) in bottom-left corner matching reference */}
            {suffix && (
                <span className="absolute bottom-2.5 left-3.5 sm:bottom-3 sm:left-4 text-xs sm:text-sm font-black tracking-wider text-[#383531] uppercase z-20">
                    {suffix}
                </span>
            )}
        </div>
    );
};

export default function RaceScheduleCard() {
    return (
        <div className="flex flex-col items-center justify-center my-4 px-2">
            {/* Horário de Chegada por cima */}
            <div className="inline-flex items-center gap-1.5 px-3.5 py-1 mb-3 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-bold uppercase tracking-wider">
                <Clock className="w-3.5 h-3.5 text-primary" />
                <span>Horário de Chegada</span>
            </div>

            {/* Main Outer Box matching the uploaded screenshot */}
            <div className="bg-white border border-[#E5E5E5] rounded-[10px] p-4 sm:p-5 shadow-xs flex gap-3 sm:gap-4 items-center justify-center">
                {/* Hours Tile (06 with AM) */}
                <FlipTile value="06" suffix="AM" />

                {/* Minutes Tile (00) */}
                <FlipTile value="00" />
            </div>

            {/* Localização por baixo */}
            <div className="flex items-center justify-center gap-1.5 mt-3 text-xs sm:text-sm text-neutral-600 font-medium">
                <MapPin className="w-3.5 h-3.5 text-primary shrink-0" />
                <span>Sede do Millennium bim, Maputo</span>
            </div>
        </div>
    );
}
