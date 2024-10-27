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

export const Metrics = ({ data }: { data: DataItem[] }) => {
    return (
        <div className="p-4">
            <motion.div
                className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4"
                variants={container}
                initial="hidden"
                animate="show"
            >
                <motion.div variants={item}>
                    <MetricCard
                        title="Total de inscritos"
                        value={data.length}
                        change="Visão geral"
                        icon={<LandPlot className="h-4 w-4 text-gray-400" />}
                    />
                </motion.div>

                <motion.div variants={item}>
                    <MetricCard
                        title="Total de inscritos 15 Km"
                        value={
                            data.filter(({ route }) =>
                                route.includes("Corrida Pedestre - 15km"),
                            ).length
                        }
                        change={`${
                            (data.filter(({ route }) =>
                                route.includes("Corrida Pedestre - 15km"),
                            ).length /
                                data.length) *
                            100
                        }% dos inscritos`}
                        icon={<Footprints className="h-4 w-4 text-gray-400" />}
                    />
                </motion.div>

                <motion.div variants={item}>
                    <MetricCard
                        title="Total de inscritos deficientes"
                        value={
                            data.filter(({ route }) =>
                                route.includes(
                                    "Portadores De Deficiência - 9k",
                                ),
                            ).length
                        }
                        change={`${
                            (data.filter(({ route }) =>
                                route.includes(
                                    "Portadores De Deficiência - 9k",
                                ),
                            ).length /
                                data.length) *
                            100
                        }% dos inscritos`}
                        icon={
                            <Accessibility className="h-4 w-4 text-gray-400" />
                        }
                    />
                </motion.div>

                <motion.div variants={item}>
                    <MetricCard
                        title="Total de inscritos para caminhada"
                        value={
                            data.filter(({ route }) =>
                                route.includes("Caminhada - 7KM"),
                            ).length
                        }
                        change={`${
                            (data.filter(({ route }) =>
                                route.includes("Caminhada - 7KM"),
                            ).length /
                                data.length) *
                            100
                        }% dos inscritos`}
                        icon={
                            <PersonStanding className="h-4 w-4 text-gray-400" />
                        }
                    />
                </motion.div>
            </motion.div>
        </div>
    );
};
