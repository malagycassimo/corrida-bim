"use client";
import { Dispatch, SetStateAction, useState } from "react";
import { IconPack } from "../IconPack";
import Map1 from "./Maps";

export default function Map() {
    const [active, setActive] = useState("walk");
    return (
        <div className="mt-8">
            <div className="w-fit space-x-3 lg:space-x-5 mx-auto flex  mb-4">
                <Walk active={active === "walk"} setActive={setActive} />
                <Disabled
                    active={active === "disabled"}
                    setActive={setActive}
                />
                <Running active={active === "run"} setActive={setActive} />
            </div>
            <div className="mx-auto max-w-[826px]">
                {active === "walk" && <Map1 embedId="3283752888139517016" />}
                {active === "disabled" && (
                    <Map1 embedId="3283747075580661848" />
                )}
                {active === "run" && <Map1 embedId="3283738218266926168" />}
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
                    Deficientes - 9km
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
                <span className="md:inline-block hidden">Pedestres - 15km</span>
            </span>
        </button>
    );
};
