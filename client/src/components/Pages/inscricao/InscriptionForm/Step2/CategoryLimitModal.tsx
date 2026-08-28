"use client";

import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

interface CategoryLimitModalProps {
    isOpen: boolean;
    onClose: () => void;
    itemName?: string;
}

export function CategoryLimitModal({
    isOpen,
    onClose,
    itemName,
}: CategoryLimitModalProps) {
    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 bg-black/60 backdrop-blur-xs"
                    />

                    {/* Modal Card */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: 20 }}
                        transition={{ duration: 0.25 }}
                        className="relative w-full max-w-lg z-50 bg-white rounded-3xl p-6 sm:p-8 shadow-2xl border border-zinc-100 text-center space-y-5"
                    >
                        <Image
                            src="/assets/images/message.png"
                            alt="Vagas Esgotadas"
                            className="mx-auto w-28 h-28 object-contain"
                            width={256}
                            height={256}
                        />

                        <h3 className="text-xl sm:text-2xl font-bold text-zinc-900 leading-snug">
                            Vagas Esgotadas
                        </h3>

                        <p className="text-sm text-zinc-600 leading-relaxed px-2">
                            Lamentamos, mas não é possível continuar a inscrição para{" "}
                            <strong className="text-zinc-900">{itemName || "esta opção"}</strong>.
                            <br />
                            <br />
                            O limite máximo de vagas para esta modalidade foi atingido. Por favor, escolha outra modalidade ou percurso disponível.
                        </p>

                        <div className="pt-2">
                            <button
                                type="button"
                                onClick={onClose}
                                className="w-full bg-primary text-white font-bold text-sm py-3.5 px-6 rounded-xl hover:bg-primary/90 transition-colors shadow-md"
                            >
                                Entendi / Escolher Outra Opção
                            </button>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
}
