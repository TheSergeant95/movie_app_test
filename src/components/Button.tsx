"use client";

import React, { ButtonHTMLAttributes, FC } from "react";
import Link from "next/link";
import { UrlObject } from "url";
import { Route } from "next";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    className?: string;
    sizeClass?: string;
    fontSize?: string;
    //
    disabled?: boolean;
    type?: ButtonHTMLAttributes<HTMLButtonElement>["type"];
    href?: string;
    targetBlank?: boolean;
    onClick?: () => void;
    children?: React.ReactNode;
}

const Button: FC<ButtonProps> = ({
    className = "flex-shrink-0 relative h-auto inline-flex items-center justify-center rounded-md border border-white",
    sizeClass = "p-[10px]",
    fontSize = "text-[12px] font-medium leading-none",
    disabled = false,
    href,
    children,
    type,
    onClick = () => { },
}) => {

    if (!!href) {
        return (
            <Link href={href as Route} className={`${fontSize} ${sizeClass} ${className}`} onClick={onClick} type={type}>
                {children || ``}
            </Link>
        );
    }

    return (
        <button
            disabled={disabled}
            className={`${fontSize} ${sizeClass} ${className} ${disabled && "opacity-50 cursor-not-allowed"}`}
            onClick={onClick}
            type={type}
        >
            {children || `Button default`}
        </button>
    );
};

export default Button;
