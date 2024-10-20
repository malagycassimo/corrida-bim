import { IconPackWrapper } from "@/components/common/IconPack";
import CustomLink from "@/components/common/Link";
import { links, socials } from "@/utils/links";
import Image from "next/image";
import Link from "next/link";

export default function Footer() {
    return (
        <footer className="bg-tertiary pt-12 space-y-12 overflow-hidden">
            <div className="flex flex-col lg:flex-row lg:justify-between justify-center items-center gap-y-12 container mx-auto">
                <Image
                    alt="Millenium BIM - Aqui consigo"
                    src={"/assets/brand/brand-main.png"}
                    width={166}
                    height={64}
                />
                <ul className="flex space-x-6">
                    {links.map(({ label, href }, idx) => (
                        <li key={idx}>
                            <CustomLink
                                twClasses="ltext-lg text-white font-medium"
                                activeClassName="text-primary"
                                href={href}
                            >
                                {label}
                            </CustomLink>
                        </li>
                    ))}
                </ul>
                <ul className="space-x-4 flex">
                    {socials.map(({ label, href }, idx) => (
                        <li key={idx}>
                            <Link href={href}>
                                <IconPackWrapper componentName={label} />
                            </Link>
                        </li>
                    ))}
                </ul>
            </div>
            <div className="px-4 lg:px-0">
                <p className="border-t-2 border-white py-6 text-center container mx-auto text-wrap text-white">
                    Copyright © 2025{" "}
                    <b>Banco Internacional de Moçambique SA.</b> | Todos os
                    Direitos Reservados
                </p>
            </div>
        </footer>
    );
}
