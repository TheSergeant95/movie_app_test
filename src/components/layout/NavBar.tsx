"use client"
import React, { FC, useCallback } from "react";
import { loginNavItems, navItems } from "../constants/nav-items";
import NavItem from "../NavItem";
import { usePathname, useRouter } from "next/navigation";
import Button from "../Button";
import { useAuth } from "@/hooks/useAuth";

const NavBar: FC = () => {
    const pathname = usePathname();
    const router = useRouter();
    const { isAuth, logoutUser } = useAuth();

    const logout = async () => {
        await logoutUser();
        router.push('/');
    }

    return (
        <nav className="flex flex-col gap-[6px] pt-[36px]">
            {navItems.map((item, index) => (
                <NavItem key={index} href={item.href} className="py-[10px] px-[30.5px]" activeClassName="border-y-1 border-white bg-[#2D2D2D]" isActive={item.activeRoutes?.some(route => pathname.startsWith(route))}>{item.label}</NavItem>
            ))}
            {loginNavItems.map((item, index) => {
                const isListedRoute = (item.href === "/login" && !isAuth) || item.href !== '/login';
                if (!isListedRoute) return (
                    <Button key={index} className="py-[10px] px-[30.5px] text-sm sm:text-base font-medium text-left" onClick={logout}>Выход</Button>
                )
                return (
                    <NavItem key={index} href={item.href} className="py-[10px] px-[30.5px]" activeClassName="border-y-1 border-white bg-[#2D2D2D]" isActive={item.activeRoutes?.some(route => pathname.startsWith(route))}>{item.label}</NavItem>
                )
            })}
        </nav>
    )
}
export default NavBar;