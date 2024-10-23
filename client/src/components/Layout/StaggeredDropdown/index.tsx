"use client";
import { IconPack } from "@/components/common/IconPack";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

const StaggeredDropDown: React.FC = () => {
    const [open, setOpen] = useState<boolean>(false);

    return (
        <div className="flex items-center justify-center">
            <motion.div animate={open ? "open" : "closed"} className="relative">
                <button
                    onClick={() => setOpen((pv) => !pv)}
                    className="flex items-center"
                >
                    <IconPack.Menu />
                </button>

                <motion.ul
                    initial={wrapperVariants.closed}
                    variants={wrapperVariants}
                    style={{ originY: "top", translateX: "-50%" }}
                    className="flex flex-col gap-2 p-2 rounded-lg bg-white shadow-xl absolute top-[120%] -left-[220%] w-48 overflow-hidden"
                >
                    <Option setOpen={setOpen} text="Percursos" href="/#route" />
                    <Option
                        setOpen={setOpen}
                        text="Inscrição"
                        href="/inscricao"
                    />
                    <Option
                        setOpen={setOpen}
                        text="Informações"
                        href="/informacoes"
                    />
                </motion.ul>
            </motion.div>
        </div>
    );
};

interface OptionProps {
    text: string;
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
    href: string;
}

const Option: React.FC<OptionProps> = ({ text, setOpen, href }) => {
    const router = useRouter();
    const handleClick = () => {
        router.push(href);
        setOpen(false);
    };
    return (
        <motion.li
            variants={itemVariants}
            onClick={handleClick}
            className="flex items-center gap-2 w-full p-2 text-xs font-medium whitespace-nowrap rounded-md hover:bg-primaryLightest text-slate-700  transition-colors cursor-pointer"
        >
            <span>{text}</span>
        </motion.li>
    );
};

export default StaggeredDropDown;

const wrapperVariants = {
    open: {
        scaleY: 1,
        transition: {
            when: "beforeChildren",
            staggerChildren: 0.1,
        },
    },
    closed: {
        scaleY: 0,
        transition: {
            when: "afterChildren",
            staggerChildren: 0.1,
        },
    },
};

const itemVariants = {
    open: {
        opacity: 1,
        y: 0,
        transition: {
            when: "beforeChildren",
        },
    },
    closed: {
        opacity: 0,
        y: -15,
        transition: {
            when: "afterChildren",
        },
    },
};
