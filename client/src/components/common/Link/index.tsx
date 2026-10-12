"use client";
import Link, { LinkProps } from "next/link";
import { usePathname } from "next/navigation";
import React, { PropsWithChildren } from "react";

import { useRegistrationModal } from "../RegistrationClosedModal";

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
    const { isRegistrationOpen, openClosedModal } = useRegistrationModal();

    const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
        if (props.onClick) props.onClick(e);
        if (href === "/inscricao" && isRegistrationOpen === false) {
            e.preventDefault();
            openClosedModal();
        }
    };

    return (
        <Link
            {...props}
            href={href}
            onClick={handleClick}
            className={`${href === pathname && activeClassName} ${twClasses}`}
        >
            {children}
        </Link>
    );
};

export default CustomLink;
