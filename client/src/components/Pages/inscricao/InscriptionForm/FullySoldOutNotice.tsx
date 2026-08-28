"use client";

import Image from "next/image";
import Link from "next/link";
import AnimatedComponent from "@/components/common/AnimatedComponent";

export function FullySoldOutNotice() {
    return (
        <AnimatedComponent>
            <div className="text-center space-y-6 py-6">
                <Image
                    src="/assets/images/message.png"
                    alt="Inscrições Encerradas"
                    className="mx-auto w-32 h-32 object-contain"
                    width={256}
                    height={256}
                />

                <div className="space-y-2 max-w-md mx-auto">
                    <h2 className="text-2xl sm:text-3xl font-bold text-zinc-900">
                        Inscrições Encerradas
                    </h2>
                    <p className="text-zinc-600 text-sm sm:text-base leading-relaxed">
                        Agradecemos pelo enorme interesse! O limite máximo de inscrições para a <strong>16ª Corrida Millennium bim</strong> foi atingido para todos os percursos disponíveis.
                    </p>
                </div>

                <div className="p-4 bg-amber-50 border border-amber-200 rounded-2xl max-w-md mx-auto text-amber-800 text-xs sm:text-sm">
                    Caso necessite de mais informações sobre o evento ou modalidades presenciais, por favor consulte a secção de informações.
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
