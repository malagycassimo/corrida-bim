"use client";

import Link from "next/link";
import Image from "next/image";
import AnimatedComponent from "@/components/common/AnimatedComponent";

export function TemporarilyClosedNotice() {
    return (
        <AnimatedComponent>
            <div className="flex flex-col items-center justify-center space-y-6 py-2">
                <div className="relative max-w-[360px] sm:max-w-[400px] w-full rounded-3xl overflow-hidden shadow-2xl bg-gradient-to-b from-[#e60050] via-[#dc004e] to-[#b8003e] border border-white/20 text-white p-6 sm:p-8 text-center">
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
                    <p className="text-white font-bold text-sm sm:text-base">
                        Continua a preparar-te. 😉
                    </p>
                </div>

                <div className="flex flex-col sm:flex-row justify-center gap-3 w-full max-w-sm pt-2">
                    <Link
                        href="/"
                        className="btn text-white bg-gradient-to-br from-primary to-secondary px-6 py-3 rounded-xl font-semibold shadow-md text-sm text-center flex-1 hover:opacity-90 transition"
                    >
                        Voltar à Página Inicial
                    </Link>
                    <Link
                        href="/informacoes"
                        className="btn border-2 border-zinc-300 text-zinc-700 hover:bg-zinc-50 px-6 py-3 rounded-xl font-semibold text-sm text-center flex-1 transition"
                    >
                        Ver Informações
                    </Link>
                </div>
            </div>
        </AnimatedComponent>
    );
}
