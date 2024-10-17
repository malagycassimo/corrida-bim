"use client";
import { useAnimate } from "framer-motion";
import { useEffect, useRef, useState } from "react";

const COUNTDOWN_FROM = "2024-11-30";

const SECOND = 1000;
const MINUTE = SECOND * 60;
const HOUR = MINUTE * 60;
const DAY = HOUR * 24;

type Unit = "Day" | "Hour" | "Minute" | "Second";

const ShiftingCountdown = () => {
    return (
        <div className="">
            <div className="mx-auto flex w-full max-w-5xl items-center bg-white">
                <CountdownItem unit="Day" text="Dias" />
                <CountdownItem unit="Hour" text="Horas" />
                <CountdownItem unit="Minute" text="Minutos" />
                <CountdownItem unit="Second" text="Segundos" last={true} />
            </div>
        </div>
    );
};

interface CountdownItemProps {
    unit: Unit;
    text: string;
    last?: boolean;
}

const CountdownItem = ({ unit, text, last = false }: CountdownItemProps) => {
    const { ref, time } = useTimer(unit);

    return (
        <div
            className={`flex h-24 w-1/4 flex-col items-center justify-center gap-1 md:h-36 ${!last && "border-r-[2px] border-primary"}`}
        >
            <div className="relative w-full overflow-hidden text-center">
                <span
                    ref={ref}
                    className="block text-xl font-semibold text-primary md:text-4xl lg:text-6xl xl:text-7xl"
                >
                    {time}
                </span>
            </div>
            <span className="text-xs font-light text-slate-500 md:text-sm lg:text-base">
                {text}
            </span>
        </div>
    );
};

const useTimer = (unit: Unit) => {
    const [ref, animate] = useAnimate();

    const intervalRef = useRef<NodeJS.Timeout | null>(null);
    const timeRef = useRef<number>(0);

    const [time, setTime] = useState<number>(0);

    useEffect(() => {
        intervalRef.current = setInterval(handleCountdown, 1000);

        return () => {
            if (intervalRef.current) clearInterval(intervalRef.current);
        };
    }, []);

    const handleCountdown = async () => {
        const end = new Date(COUNTDOWN_FROM);
        const now = new Date();
        const distance = +end - +now;

        let newTime = 0;

        if (unit === "Day") {
            newTime = Math.floor(distance / DAY);
        } else if (unit === "Hour") {
            newTime = Math.floor((distance % DAY) / HOUR);
        } else if (unit === "Minute") {
            newTime = Math.floor((distance % HOUR) / MINUTE);
        } else {
            newTime = Math.floor((distance % MINUTE) / SECOND);
        }

        if (newTime !== timeRef.current) {
            await animate(
                ref.current,
                { y: ["0%", "-50%"], opacity: [1, 0] },
                { duration: 0.35 },
            );

            timeRef.current = newTime;
            setTime(newTime);

            await animate(
                ref.current,
                { y: ["50%", "0%"], opacity: [0, 1] },
                { duration: 0.35 },
            );
        }
    };

    return { ref, time };
};

export default ShiftingCountdown;
