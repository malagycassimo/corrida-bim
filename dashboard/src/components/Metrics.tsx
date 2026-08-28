"use client";
import {
    Accessibility,
    Footprints,
    LandPlot,
    PersonStanding,
} from "lucide-react";
import { MetricCard } from "./MetricCard";
import { motion } from "framer-motion";

type DataItem = {
    id: string;
    IDCode: string;
    firstName: string;
    email: string;
    lastName: string;
    phone: string;
    province: string;
    dob: string;
    country: string;
    gender: string;
    emergencyName: string;
    emergencyPhone: string;
    emergencyFamiliarity: string;
    category: string;
    route: string;
    shirt: string;
};

const container = {
    hidden: { opacity: 0 },
    show: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1,
        },
    },
};

const item = {
    hidden: {
        opacity: 0,
        y: 20,
    },
    show: {
        opacity: 1,
        y: 0,
        transition: {
            type: "spring",
            duration: 0.8,
        },
    },
};

export const Metrics = ({ data = [] }: { data?: DataItem[] }) => {
    const safeData = Array.isArray(data) ? data : [];
    const total = safeData.length;

    const count15k = safeData.filter(
        (p) => p.route && p.route.includes("15km"),
    ).length;
    const percent15k = total > 0 ? ((count15k / total) * 100).toFixed(1) : "0";

    const countDef = safeData.filter(
        (p) =>
            (p.route && (p.route.includes("Deficiência") || p.route.includes("9km"))) ||
            (p.category &&
                (p.category.includes("Triciclos") ||
                    p.category.includes("Cadeirantes") ||
                    p.category.includes("Deficientes"))),
    ).length;
    const percentDef = total > 0 ? ((countDef / total) * 100).toFixed(1) : "0";

    const countWalk = safeData.filter(
        (p) => p.route && p.route.includes("7km"),
    ).length;
    const percentWalk = total > 0 ? ((countWalk / total) * 100).toFixed(1) : "0";

    return (
        <div className="py-2">
            <motion.div
                className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4"
                variants={container}
                initial="hidden"
                animate="show"
            >
                <motion.div variants={item}>
                    <MetricCard
                        title="Total de Inscritos"
                        value={total}
                        change="Visão geral do evento"
                        icon={<LandPlot className="h-5 w-5" />}
                    />
                </motion.div>

                <motion.div variants={item}>
                    <MetricCard
                        title="Corrida 15 Km"
                        value={count15k}
                        change={`${percent15k}% dos inscritos`}
                        icon={<Footprints className="h-5 w-5" />}
                    />
                </motion.div>

                <motion.div variants={item}>
                    <MetricCard
                        title="Caminhada 7 Km"
                        value={countWalk}
                        change={`${percentWalk}% dos inscritos`}
                        icon={<PersonStanding className="h-5 w-5" />}
                    />
                </motion.div>

                <motion.div variants={item}>
                    <MetricCard
                        title="Portadores de Deficiência"
                        value={countDef}
                        change={`${percentDef}% dos inscritos`}
                        icon={<Accessibility className="h-5 w-5" />}
                    />
                </motion.div>
            </motion.div>
        </div>
    );
};
