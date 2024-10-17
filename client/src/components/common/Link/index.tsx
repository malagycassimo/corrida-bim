"use client";
import Link, { LinkProps } from "next/link";
import { usePathname } from "next/navigation";
import React, { PropsWithChildren } from "react";

interface CustomLinkProps extends LinkProps {
    activeClassName?: string;
    twClasses?: string;
}

const CustomLink: React.FC<PropsWithChildren<CustomLinkProps>> = ({
    children,
    activeClassName,
    twClasses,
    href,
    ...props
}) => {
    const pathname = usePathname();
    return (
        <Link
            {...props}
            href={href}
            className={`${href === pathname && activeClassName} ${twClasses}`}
        >
            {children}
        </Link>
    );
};

export default CustomLink;
