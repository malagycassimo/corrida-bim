"use client";
import { Dispatch, SetStateAction, useState } from "react";
import { IconPack } from "../IconPack";
import Map1 from "./Maps";

// Defina como 'true' para exibir o mapa normalmente, ou 'false' para ocultar com desfoque e o aviso "Brevemente"
const SHOW_ROUTES_MAP = false;

export default function Map() {
    const [active, setActive] = useState("walk");
    return (
        <div className="mt-8">
            <div className="w-fit space-x-3 lg:space-x-5 mx-auto flex mb-4">
                <Walk active={active === "walk"} setActive={setActive} />
                <Disabled
                    active={active === "disabled"}
                    setActive={setActive}
                />
                <Running active={active === "run"} setActive={setActive} />
            </div>
            <div className="mx-auto max-w-[826px] relative min-h-[460px] rounded-2xl overflow-hidden">
                <div className={`transition-all duration-500 ${!SHOW_ROUTES_MAP ? "filter blur-md select-none pointer-events-none opacity-40 scale-[1.02]" : ""}`}>
                    {active === "walk" && <Map1 embedId="3283752888139517016" />}
                    {active === "disabled" && (
                        <Map1 embedId="3283747075580661848" />
                    )}
                    {active === "run" && <Map1 embedId="3283738218266926168" />}
                </div>

                {!SHOW_ROUTES_MAP && (
                    <div className="absolute inset-0 flex flex-col items-center justify-center bg-white/40 backdrop-blur-md z-10 px-6 text-center rounded-2xl border border-white/60 shadow-inner">
                        <div className="bg-white/90 shadow-xl border border-rose-100 rounded-3xl p-8 max-w-md mx-auto transform transition-all">
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
    setActive: Dispatch<SetStateAction<string>>;
}) => {
    return (
        <button
            onClick={() => setActive("walk")}
            className={`lg:space-x-2 border-2 border-primary rounded-lg py-[6px] px-[7px] flex items-center group transition-all duration-500 ${
                active && "bg-gradient-to-br from-primary to-secondary"
            }`}
        >
            <div
                className={`size-8 border-2 rounded bg-primary/10 flex justify-center items-center ${
                    active ? "border-white" : "border-primary"
                }`}
            >
                <IconPack.PersonWalking fill={active ? "white" : "#D1005D"} />
            </div>
            <span
                className={`text-sm font-medium ${
                    active ? "text-white" : "text-primary"
                }`}
            >
                <span className="md:inline-block hidden">Caminhada - 7km</span>
            </span>
        </button>
    );
};

const Disabled = ({
    active,
    setActive,
}: {
    active: boolean;
    setActive: Dispatch<SetStateAction<string>>;
}) => {
    return (
        <button
            onClick={() => setActive("disabled")}
            className={`lg:space-x-2  border-2 border-primary rounded-lg py-[6px] px-[7px] flex items-center group transition-all duration-500 ${
                active && "bg-gradient-to-br from-primary to-secondary"
            }`}
        >
            <div
                className={`size-8 border-2 rounded bg-primary/10 flex justify-center items-center ${
                    active ? "border-white" : "border-primary"
                }`}
            >
                <IconPack.PersonDisabled fill={active ? "white" : "#D1005D"} />
            </div>
            <span
                className={`text-sm font-medium ${
                    active ? "text-white" : "text-primary"
                }`}
            >
                <span className="md:inline-block hidden">
                    Cadeirantes - 9km
                </span>
            </span>
        </button>
    );
};

const Running = ({
    active,
    setActive,
}: {
    active: boolean;
    setActive: Dispatch<SetStateAction<string>>;
}) => {
    return (
        <button
            onClick={() => setActive("run")}
            className={`lg:space-x-2 border-2 border-primary rounded-lg py-[6px] px-[7px] flex items-center group transition-all duration-500 ${
                active && "bg-gradient-to-br from-primary to-secondary"
            }`}
        >
            <div
                className={`size-8 border-2 rounded bg-primary/10 flex justify-center items-center ${
                    active ? "border-white" : "border-primary"
                }`}
            >
                <IconPack.PersonRunning fill={active ? "white" : "#D1005D"} />
            </div>
            <span
                className={`text-sm font-medium ${
                    active ? "text-white" : "text-primary"
                }`}
            >
                <span className="md:inline-block hidden">Corrida -15km</span>
            </span>
        </button>
    );
};
