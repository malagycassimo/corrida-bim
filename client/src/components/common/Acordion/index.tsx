"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface AccordionProps {
    title: string;
    content: React.ReactNode;
}

const Accordion: React.FC<AccordionProps> = ({ title, content }) => {
    const [isOpen, setIsOpen] = useState<boolean>(false);

    return (
        <div className="accordion">
            <motion.header
                initial={false}
                onClick={() => setIsOpen(!isOpen)}
                className="accordion-header"
            >
                {title}
                <motion.div
                    animate={{ rotate: isOpen ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                    style={{
                        display: "inline-block",
                        transformOrigin: "center",
                    }}
                >
                    ▼
                </motion.div>
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
                        className="accordion-content"
                    >
                        {content}
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default Accordion;
