import { IconPack } from "@/components/common/IconPack";
import CustomLink from "@/components/common/Link";
import { links } from "@/utils/links";
import Image from "next/image";
import Link from "next/link";

export default function Header() {
    return (
        <header className="container mx-auto bg-zinc-600 text-white py-9 flex justify-between">
            <nav className="flex space-x-12">
                <Link href={"/"}>
                    <Image
                        alt="Millenium BIM"
                        src={"/brand-white.svg"}
                        width={103}
                        height={113}
                    />
                </Link>
                <ul className="flex mt-7 space-x-6">
                    {links.map(({ label, href }, idx) => (
                        <li key={idx}>
                            <CustomLink
                                twClasses="font-semibold text-lg"
                                activeClassName="text-primary"
                                href={href}
                            >
                                {label}
                            </CustomLink>
                        </li>
                    ))}
                </ul>
            </nav>
            <Link
                href={"/inscricao"}
                className="text-lg flex items-center py-4 px-5 space-x-1 font-semibold bg-gradient-to-br from-primary to-secondary rounded-lg h-min"
            >
                <span>Inscreva-se</span> <IconPack.ArrowRight />
            </Link>
        </header>
    );
}
