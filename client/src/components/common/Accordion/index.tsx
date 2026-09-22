"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

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
            className={`py-9 px-14 max-w-[920px] mx-auto rounded-[20px] transition-colors duration-300 ${isOpen ? "bg-primaryLighter" : "bg-primaryLightest"}`}
        >
            <motion.header
                initial={false}
                onClick={() => setIsOpen(!isOpen)}
                className="relative flex items-center hover:cursor-pointer"
            >
                <span className="w-10 shrink-0 text-4xl text-primary font-semibold">
                    {idx}
                </span>
                <h3 className="flex-1 px-4 text-left text-xl font-semibold">
                    {title}
                </h3>
                <span
                    aria-hidden="true"
                    className={`absolute right-0 top-1/2 h-8 w-8 -translate-y-1/2 rounded-full bg-zinc-900 text-center text-xl font-light leading-7 text-white transition-transform duration-300 ${isOpen && "rotate-45"}`}
                >
                    +
                </span>
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
                        <div className="pt-5 pl-14 pr-0 text-justify text-[0.95rem] font-medium leading-relaxed text-zinc-800">
                            {subtitle && (
                                <span className="mb-1 block text-justify text-[0.95rem] font-normal">
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
