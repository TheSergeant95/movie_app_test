import { Route } from "next";
import Link from "next/link";
import React, { FC } from "react";
import { UrlObject } from "url";

interface NavItemProps {
  className?: string;
  activeClassName?: string;
  sizeClass?: string;
  fontSize?: string;
  href: string;
  isActive?: boolean;
  children?: React.ReactNode;
}

const NavItem: FC<NavItemProps> = ({
    className = "",
    activeClassName = "",
    sizeClass = "",
    fontSize = "text-sm sm:text-base font-medium",
    href,
    isActive = false,
    children
}) => {
    return (
        <Link href={href as Route} className={`${fontSize} ${sizeClass} ${className} ${isActive && activeClassName}`} >
            {children || ""}
        </Link>
    )
}

export default NavItem;