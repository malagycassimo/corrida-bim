import { IconPack } from "@/components/common/IconPack";
import CustomLink from "@/components/common/Link";
import { links } from "@/utils/links";
import Image from "next/image";
import Link from "next/link";
import StaggeredDropDown from "../StaggeredDropdown";

export default function Header() {
    return (
        <header className="absolute top-0 left-0 right-0 z-50">
            <div className="container mx-auto text-white pr-7 pl-12 py-4 lg:py-9 flex justify-between">
                <nav className="flex space-x-12">
                    <Link href={"/"}>
                        <Image
                            alt="Millennium bim"
                            src={"assets/brand/brand-white.svg"}
                            width={103}
                            height={113}
                            className="lg:block hidden"
                        />
                        <Image
                            alt="Millennium bim"
                            src={"assets/brand/brand-red.svg"}
                            width={55.96}
                            height={60.78}
                            className="block lg:hidden"
                        />
                    </Link>
                    <ul className="mt-7 space-x-6 lg:flex hidden">
                        {links.map(({ label, href }, idx) => (
                            <li key={idx}>
                                <CustomLink
                                    twClasses="font-semibold text-lg hover:text-primary transition-colors duration-300 cursor-pointer"
                                    activeClassName="text-primary"
                                    href={href}
                                >
                                    {label}
                                </CustomLink>
                            </li>
                        ))}
                    </ul>
                </nav>
                <div className="space-x-6 flex items-center">
                    <Link
                        href={"/inscricao"}
                        className="btn bg-gradient-to-br from-primary to-secondary hidden lg:flex"
                    >
                        <span>Inscreva-se</span> <IconPack.ArrowRight />
                    </Link>
                    <span className="lg:hidden">
                        <StaggeredDropDown />
                    </span>
                </div>
            </div>
        </header>
    );
}
