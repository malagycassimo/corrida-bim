"use client";

import { Dispatch, SetStateAction, useState } from "react";
import { IconPack } from "../IconPack";
import Map1 from "./Maps";
import DescriptiveRoute from "./DescriptiveRoute";

// =========================================================================
// CONFIGURAÇÕES DOS PERCURSOS (Ajuste conforme necessário)
// =========================================================================
// show_route: true para exibir os percursos; false para ocultar e exibir o aviso "Brevemente"
export const show_route: boolean = true;

// route_type: "map" para mapa interativo Strava; "text" para itinerário descritivo detalhado
export const route_type: "text" | "map" = "map";

// only_14km: true para exibir apenas o percurso da corrida de 14,5km
export const only_14km: boolean = true;

export default function Map() {
    const [active, setActive] = useState<"walk" | "disabled" | "run">("run");

    return (
        <div className="mt-8">
            {/* Seletor de Categoria / Distância */}
            <div className="w-fit gap-2 sm:gap-3 lg:gap-5 mx-auto flex flex-wrap justify-center mb-6 px-4">
                {!only_14km && (
                    <>
                        <Walk active={active === "walk"} setActive={setActive} />
                        <Disabled active={active === "disabled"} setActive={setActive} />
                    </>
                )}
                <Running active={true} setActive={setActive} />
            </div>

            {/* Container Principal */}
            <div className="mx-auto max-w-4xl relative min-h-[460px] rounded-2xl">
                <div
                    className={`transition-all duration-500 ${
                        !show_route
                            ? "filter blur-md select-none pointer-events-none opacity-40 scale-[1.02]"
                            : ""
                    }`}
                >
                    {route_type === "text" ? (
                        <DescriptiveRoute activeRoute={active} />
                    ) : (
                        <div className="mx-auto max-w-[826px] rounded-2xl overflow-hidden shadow-[0_12px_40px_-10px_rgba(0,0,0,0.12)] border border-slate-100">
                            {only_14km ? (
                                <Map1 embedId="3283738218266926168" />
                            ) : (
                                <>
                                    {active === "walk" && <Map1 embedId="3283752888139517016" />}
                                    {active === "disabled" && <Map1 embedId="3283747075580661848" />}
                                    {active === "run" && <Map1 embedId="3283738218266926168" />}
                                </>
                            )}
                        </div>
                    )}
                </div>

                {/* Modal / Overlay "Brevemente" (Exibido apenas quando show_route for false) */}
                {!show_route && (
                    <div className="absolute inset-0 flex flex-col items-center justify-center bg-white/40 backdrop-blur-md z-10 px-6 text-center rounded-2xl border border-white/60 shadow-inner">
                        <div className="bg-white/95 shadow-xl border border-rose-100 rounded-3xl p-8 max-w-md mx-auto transform transition-all">
                            <span className="inline-flex items-center px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider bg-rose-50 text-primary border border-rose-200 mb-4">
                                🚀 Novidades a caminho
                            </span>
                            <h3 className="text-2xl sm:text-3xl font-extrabold text-neutral-900 tracking-tight mb-2">
                                Brevemente
                            </h3>
                            <p className="text-sm sm:text-base text-neutral-600 leading-relaxed">
                                Os percursos oficiais detalhados serão disponibilizados muito em breve. Fique atento às nossas atualizações!
                            </p>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

const Walk = ({
    active,
    setActive,
}: {
    active: boolean;
    setActive: Dispatch<SetStateAction<"walk" | "disabled" | "run">>;
}) => {
    return (
        <button
            type="button"
            onClick={() => setActive("walk")}
            className={`border-2 border-primary rounded-xl py-2 px-3 sm:px-4 flex items-center gap-2 group transition-all duration-300 cursor-pointer ${
                active
                    ? "bg-gradient-to-br from-primary to-secondary text-white shadow-md shadow-primary/20 scale-[1.02]"
                    : "bg-white text-primary hover:bg-rose-50/50"
            }`}
        >
            <div
                className={`size-7 sm:size-8 border-2 rounded-lg bg-primary/10 flex justify-center items-center transition-colors ${
                    active ? "border-white bg-white/20" : "border-primary"
                }`}
            >
                <IconPack.PersonWalking fill={active ? "white" : "#D1005D"} />
            </div>
            <span className="text-xs sm:text-sm font-semibold">
                <span className="hidden sm:inline">Caminhada - </span>7km
            </span>
        </button>
    );
};

const Disabled = ({
    active,
    setActive,
}: {
    active: boolean;
    setActive: Dispatch<SetStateAction<"walk" | "disabled" | "run">>;
}) => {
    return (
        <button
            type="button"
            onClick={() => setActive("disabled")}
            className={`border-2 border-primary rounded-xl py-2 px-3 sm:px-4 flex items-center gap-2 group transition-all duration-300 cursor-pointer ${
                active
                    ? "bg-gradient-to-br from-primary to-secondary text-white shadow-md shadow-primary/20 scale-[1.02]"
                    : "bg-white text-primary hover:bg-rose-50/50"
            }`}
        >
            <div
                className={`size-7 sm:size-8 border-2 rounded-lg bg-primary/10 flex justify-center items-center transition-colors ${
                    active ? "border-white bg-white/20" : "border-primary"
                }`}
            >
                <IconPack.PersonDisabled fill={active ? "white" : "#D1005D"} />
            </div>
            <span className="text-xs sm:text-sm font-semibold">
                <span className="hidden sm:inline">Cadeirantes - </span>9km
            </span>
        </button>
    );
};

const Running = ({
    active,
    setActive,
}: {
    active: boolean;
    setActive: Dispatch<SetStateAction<"walk" | "disabled" | "run">>;
}) => {
    return (
        <button
            type="button"
            onClick={() => setActive("run")}
            className={`border-2 border-primary rounded-xl py-2 px-3 sm:px-4 flex items-center gap-2 group transition-all duration-300 cursor-pointer ${
                active
                    ? "bg-gradient-to-br from-primary to-secondary text-white shadow-md shadow-primary/20 scale-[1.02]"
                    : "bg-white text-primary hover:bg-rose-50/50"
            }`}
        >
            <div
                className={`size-7 sm:size-8 border-2 rounded-lg bg-primary/10 flex justify-center items-center transition-colors ${
                    active ? "border-white bg-white/20" : "border-primary"
                }`}
            >
                <IconPack.PersonRunning fill={active ? "white" : "#D1005D"} />
            </div>
            <span className="text-xs sm:text-sm font-semibold">
                <span className="hidden sm:inline">Corrida - </span>14,5km
            </span>
        </button>
    );
};
