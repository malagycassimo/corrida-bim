"use client";

import React, {
    createContext,
    useContext,
    useEffect,
    useState,
    useCallback,
} from "react";
import Image from "next/image";
import Link from "next/link";
import { X } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { getRegistrationStatus } from "@/app/inscricao/action";

interface RegistrationContextType {
    isRegistrationOpen: boolean | null;
    openClosedModal: () => void;
    closeClosedModal: () => void;
    checkStatus: () => Promise<boolean>;
}

const RegistrationContext = createContext<RegistrationContextType>({
    isRegistrationOpen: true,
    openClosedModal: () => {},
    closeClosedModal: () => {},
    checkStatus: async () => true,
});

export const useRegistrationModal = () => useContext(RegistrationContext);

export function RegistrationClosedModal({
    isOpen,
    onClose,
}: {
    isOpen: boolean;
    onClose: () => void;
}) {
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === "Escape") onClose();
        };
        if (isOpen) {
            document.body.style.overflow = "hidden";
            window.addEventListener("keydown", handleKeyDown);
        }
        return () => {
            document.body.style.overflow = "unset";
            window.removeEventListener("keydown", handleKeyDown);
        };
    }, [isOpen, onClose]);

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 bg-black/75 backdrop-blur-xs transition-opacity"
                    />

                    {/* Modal Card */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.92, y: 15 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.92, y: 15 }}
                        transition={{ type: "spring", damping: 25, stiffness: 320 }}
                        className="relative z-10 max-w-[360px] sm:max-w-[400px] w-full rounded-3xl overflow-hidden shadow-2xl bg-gradient-to-b from-[#e60050] via-[#dc004e] to-[#b8003e] border border-white/20 text-white flex flex-col p-6 sm:p-8 text-center"
                    >
                        {/* Close Button */}
                        <button
                            onClick={onClose}
                            className="absolute top-4 right-4 z-20 p-2 rounded-full bg-black/25 hover:bg-black/50 text-white transition-colors cursor-pointer"
                            aria-label="Fechar"
                        >
                            <X className="w-5 h-5" />
                        </button>

                        {/* Top Logo */}
                        <div className="flex justify-center mb-4 pt-1">
                            <Image
                                src="/assets/brand/logo-16-white.png"
                                alt="16ª Corrida Millennium bim"
                                width={140}
                                height={140}
                                className="h-24 w-auto object-contain drop-shadow-md"
                                priority
                            />
                        </div>

                        {/* Yellow Alert Badge */}
                        <div className="my-2">
                            <span className="inline-block bg-[#ffcc00] text-[#c5004e] font-black text-xl sm:text-2xl px-6 py-1.5 rounded-md shadow-md tracking-wide">
                                Atenção
                            </span>
                        </div>

                        {/* Main Title */}
                        <h2 className="text-2xl sm:text-3xl font-extrabold text-white leading-tight mt-3 mb-4">
                            As inscrições<br />ainda não<br />estão abertas
                        </h2>

                        {/* Body Text */}
                        <p className="text-white/95 text-sm sm:text-base font-normal leading-relaxed max-w-xs mx-auto mb-3">
                            Fica atento às nossas páginas para não perderes nenhuma novidade! 👀
                        </p>

                        {/* Footer Phrase */}
                        <p className="text-white font-bold text-sm sm:text-base mb-6">
                            Continua a preparar-te. 😉
                        </p>

                        {/* Action Button */}
                        <div className="space-y-3">
                            <button
                                onClick={onClose}
                                className="w-full py-3.5 px-6 rounded-2xl font-bold bg-white text-[#dc004e] hover:bg-zinc-100 active:scale-98 transition-all shadow-lg text-sm tracking-wide cursor-pointer"
                            >
                                Entendido
                            </button>
                            <div>
                                <Link
                                    href="/informacoes"
                                    onClick={onClose}
                                    className="text-xs text-white/80 hover:text-white underline transition"
                                >
                                    Ver informações e percursos da prova
                                </Link>
                            </div>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
}

export function RegistrationProvider({
    children,
}: {
    children: React.ReactNode;
}) {
    const [isRegistrationOpen, setIsRegistrationOpen] = useState<boolean | null>(
        null,
    );
    const [isOpen, setIsOpen] = useState(false);

    const checkStatus = useCallback(async () => {
        try {
            const status = await getRegistrationStatus();
            setIsRegistrationOpen(status);
            return status;
        } catch {
            setIsRegistrationOpen(true);
            return true;
        }
    }, []);

    useEffect(() => {
        checkStatus();
    }, [checkStatus]);

    // Intercept clicks to /inscricao globally when registration is closed
    useEffect(() => {
        const handleGlobalClick = (e: MouseEvent) => {
            const target = e.target as HTMLElement | null;
            const link = target?.closest('a[href="/inscricao"]');
            if (link) {
                // If registrations are confirmed closed, open popup and prevent navigation
                if (isRegistrationOpen === false) {
                    e.preventDefault();
                    e.stopPropagation();
                    setIsOpen(true);
                } else if (isRegistrationOpen === null) {
                    // If still resolving, check quickly
                    e.preventDefault();
                    e.stopPropagation();
                    checkStatus().then((open) => {
                        if (!open) {
                            setIsOpen(true);
                        } else {
                            window.location.href = "/inscricao";
                        }
                    });
                }
            }
        };

        document.addEventListener("click", handleGlobalClick, true);
        return () =>
            document.removeEventListener("click", handleGlobalClick, true);
    }, [isRegistrationOpen, checkStatus]);

    const openClosedModal = useCallback(() => setIsOpen(true), []);
    const closeClosedModal = useCallback(() => setIsOpen(false), []);

    return (
        <RegistrationContext.Provider
            value={{
                isRegistrationOpen,
                openClosedModal,
                closeClosedModal,
                checkStatus,
            }}
        >
            {children}
            <RegistrationClosedModal isOpen={isOpen} onClose={closeClosedModal} />
        </RegistrationContext.Provider>
    );
}
