import { IconPackWrapper } from "@/components/common/IconPack";
import CustomLink from "@/components/common/Link";
import { links, socials } from "@/utils/links";
import Image from "next/image";
import Link from "next/link";

export default function Footer() {
    return (
        <footer className="bg-tertiary pt-12 space-y-12 overflow-hidden">
            <div className="flex flex-col lg:flex-row lg:justify-between justify-center items-center gap-y-12 container mx-auto px-6">
                <Image
                    alt="16ª Corrida Millennium bim"
                    src={"/assets/brand/logo-16-white.png"}
                    width={160}
                    height={160}
                    className="h-32 w-32 object-contain"
                />
                <ul className="flex space-x-6">
                    {links.map(({ label, href }, idx) => (
                        <li key={idx}>
                            <CustomLink
                                twClasses="text-lg text-white font-medium hover:text-primary transition-colors"
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
                    Copyright © 2026{" "}
                    <b>Banco Internacional de Moçambique SA.</b> | Todos os
                    Direitos Reservados
                </p>
            </div>
        </footer>
    );
}
