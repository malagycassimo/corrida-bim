"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { IconPack } from "../IconPack";

export interface AccordionProps {
    idx: number;
    title: string;
    subtitle?: string;
    content: React.ReactNode;
}

const Accordion: React.FC<AccordionProps> = ({
    title,
    content,
    idx,
    subtitle,
}) => {
    const [isOpen, setIsOpen] = useState<boolean>(false);

    return (
        <div
            className={`py-9 px-11 max-w-[920px] mx-auto rounded-[20px] transition-colors duration-300 ${isOpen ? "bg-primaryLighter" : "bg-primaryLightest"}`}
        >
            <motion.header
                initial={false}
                onClick={() => setIsOpen(!isOpen)}
                className="relative flex flex-col lg:flex-row lg:space-x-9 lg:items-center hover:cursor-pointer"
            >
                <span className="text-4xl text-primary font-bold">
                    {idx < 10 ? "0" + idx : idx}
                </span>
                <h3 className="text-xl font-semibold max-w-40 xs:max-w-full">
                    {title}
                </h3>
                <IconPack.FilledCross
                    className={`group absolute right-0 top-1/2 -translate-y-1/2 origin-center transition-all duration-300 ${isOpen && "rotate-45"}`}
                />
            </motion.header>
            <AnimatePresence initial={false}>
                {isOpen && (
                    <motion.div
                        key="content"
                        initial="collapsed"
                        animate="open"
                        exit="collapsed"
                        variants={{
                            open: { opacity: 1, height: "auto" },
                            collapsed: { opacity: 0, height: 0 },
                        }}
                        transition={{ duration: 0.3 }}
                    >
                        <div className="lg:ml-[72px] pt-5">
                            {subtitle && (
                                <span className="relative block text-lg font-medium mb-1">
                                    <IconPack.ChevronRight className="absolute -left-4 top-1/2 -translate-y-1/2 " />{" "}
                                    {subtitle}
                                </span>
                            )}
                            {content}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default Accordion;
