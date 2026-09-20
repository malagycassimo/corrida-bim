import Link from "next/link";
import { MESSAGES } from "../constants";

export const StatusMessage = ({ isAllowed }: { isAllowed: boolean }) => (
    <div className="w-full space-y-6">
        <div className="text-center space-y-2">
            <h2 className="text-2xl sm:text-3xl font-bold text-zinc-900">
                {isAllowed ? MESSAGES.SUCCESS.TITLE : MESSAGES.FAILURE.TITLE}
            </h2>
            <p className="text-zinc-600 max-w-2xl mx-auto leading-relaxed text-xs sm:text-sm">
                {isAllowed
                    ? MESSAGES.SUCCESS.DESCRIPTION
                    : MESSAGES.FAILURE.DESCRIPTION}
            </p>
        </div>

        {isAllowed ? (
            <div className="w-full bg-gradient-to-br from-zinc-50 to-zinc-100/60 border border-zinc-200/80 rounded-2xl p-5 sm:p-6 space-y-4 shadow-sm text-left">
                <div className="flex items-center gap-2 text-primary font-semibold text-sm sm:text-base border-b border-zinc-200/60 pb-3">
                    <svg
                        className="w-5 h-5 text-primary shrink-0"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth="2"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                    </svg>
                    <span>Informações sobre o Levantamento do Kit</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="bg-white p-4 rounded-xl border border-zinc-100 shadow-xs flex flex-col justify-center space-y-1">
                        <span className="text-[11px] uppercase tracking-wider font-semibold text-zinc-400">
                            Datas de Levantamento
                        </span>
                        <p className="font-semibold text-zinc-800 text-sm sm:text-base">
                            21 a 23 de Outubro
                        </p>
                    </div>

                    <div className="bg-white p-4 rounded-xl border border-zinc-100 shadow-xs flex flex-col justify-center space-y-1">
                        <span className="text-[11px] uppercase tracking-wider font-semibold text-zinc-400">
                            Local de Levantamento
                        </span>
                        <p className="font-semibold text-zinc-800 text-sm sm:text-base leading-snug">
                            Sede do Millennium bim
                        </p>
                        <p className="text-xs text-zinc-500">
                            Rua dos Desportistas nº 873/879, Maputo
                        </p>
                    </div>
                </div>

                <div className="bg-primary/5 border border-primary/15 rounded-xl p-3.5 text-xs text-zinc-600 leading-relaxed">
                    <strong className="text-primary font-semibold">Nota:</strong> Apresente o seu documento de identificação original no momento do levantamento. Os inscritos nas categorias de Federados, Juvenis e Portadores de Deficiência levantarão na Associação de Atletismo da Cidade de Maputo.
                </div>
            </div>
        ) : (
            <div className="w-full bg-amber-50 border border-amber-200 rounded-2xl p-5 text-xs sm:text-sm text-amber-900 space-y-2 text-left">
                <p className="font-semibold text-sm">Inscrições Presenciais</p>
                <p className="text-xs text-amber-800 leading-relaxed">
                    As inscrições para Juvenis, Federados e Portadores de Deficiência decorrem exclusivamente na Associação de Atletismo da Cidade de Maputo (Parque dos Continuadores). O levantamento dos respectivos kits será também realizado na Associação, de 21 a 23 de Outubro.
                </p>
            </div>
        )}

        <div className="flex justify-center pt-2">
            <Link
                href="/"
                className="btn text-white bg-gradient-to-br from-primary to-secondary px-8 py-3 rounded-xl font-medium shadow-md shadow-primary/20 hover:opacity-95 transition-all text-xs sm:text-sm inline-flex items-center gap-2"
            >
                <span>Voltar à Página Inicial</span>
            </Link>
        </div>
    </div>
);
