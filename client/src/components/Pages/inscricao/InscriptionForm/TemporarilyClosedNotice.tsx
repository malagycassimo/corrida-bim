"use client";

import Link from "next/link";
import AnimatedComponent from "@/components/common/AnimatedComponent";
import { Clock } from "lucide-react";

export function TemporarilyClosedNotice() {
    return (
        <AnimatedComponent>
            <div className="text-center space-y-6 py-6">
                <div className="relative mx-auto w-28 h-28 flex items-center justify-center rounded-full bg-amber-50 border border-amber-200 shadow-xs">
                    <Clock className="w-14 h-14 text-amber-600 animate-pulse" />
                </div>

                <div className="space-y-2 max-w-md mx-auto">
                    <h2 className="text-2xl sm:text-3xl font-bold text-zinc-900">
                        Inscrições Temporariamente Fechadas
                    </h2>
                    <p className="text-zinc-600 text-sm sm:text-base leading-relaxed">
                        As inscrições online para a <strong>16ª Corrida Millennium bim</strong> encontram-se temporariamente suspensas. Por favor, tente novamente mais tarde.
                    </p>
                </div>

                <div className="p-4 bg-amber-50/80 border border-amber-200/90 rounded-2xl max-w-md mx-auto text-amber-800 text-xs sm:text-sm">
                    Para mais detalhes sobre a corrida e prazos de atendimento, por favor consulte a secção de informações gerais.
                </div>

                <div className="pt-4 flex flex-col sm:flex-row justify-center gap-3">
                    <Link
                        href="/"
                        className="btn text-white bg-gradient-to-br from-primary to-secondary px-8 py-3 rounded-xl font-semibold shadow-md text-sm text-center"
                    >
                        Voltar à Página Inicial
                    </Link>
                    <Link
                        href="/informacoes"
                        className="btn border-2 border-zinc-300 text-zinc-700 hover:bg-zinc-50 px-8 py-3 rounded-xl font-semibold text-sm text-center"
                    >
                        Ver Informações
                    </Link>
                </div>
            </div>
        </AnimatedComponent>
    );
}
