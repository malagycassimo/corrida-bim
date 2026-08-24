import CustomLink from "@/components/common/Link";
import { links } from "@/utils/links";
import Image from "next/image";
import Link from "next/link";
import StaggeredDropDown from "../StaggeredDropdown";

export default function Header() {
    return (
        <header className="absolute top-0 left-0 right-0 z-10">
            <div className="container mx-auto text-white pr-7 pl-6 sm:pl-12 py-4 lg:py-6 flex justify-between items-center">
                <nav className="flex items-center space-x-8 lg:space-x-12">
                    <Link href={"/"} className="flex items-center">
                        <Image
                            alt="16ª Corrida Millennium bim"
                            src={"/assets/brand/logo-16-white.png"}
                            width={160}
                            height={160}
                            className="lg:block hidden h-32 w-32 object-contain"
                        />
                        <Image
                            alt="16ª Corrida Millennium bim"
                            src={"/assets/brand/logo-16-white.png"}
                            width={110}
                            height={110}
                            className="block lg:hidden h-20 w-20 object-contain"
                        />
                    </Link>
                    <ul className="space-x-6 lg:flex hidden items-center">
                        {links.map(({ label, href }, idx) => (
                            <li key={idx}>
                                <CustomLink
                                    twClasses="font-semibold text-xl hover:text-primary transition-colors duration-300 cursor-pointer"
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
                    <span className="lg:hidden">
                        <StaggeredDropDown />
                    </span>
                </div>
            </div>
        </header>
    );
}
