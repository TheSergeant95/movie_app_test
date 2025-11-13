"use client"
import { Route } from "next";
import { usePathname } from "next/navigation";
import { FC } from "react";

type RouteObject = {
    path: Route;
    title: string;
}

const routeTitles: RouteObject[] = [
    { path: '/', title: 'Фильмы / Главная' },
    { path: '/movies', title: 'Фильмы / Главная' },
    { path: '/cinemas', title: 'Кинотеатры' },
    { path: '/bookings', title: 'Мои билеты' },
    { path: '/movies/:id', title: 'Фильм' },
    { path: '/cinemas/:id', title: 'Кинотеатр' },
    { path: '/sessions/:id', title: 'Сеанс' },
    { path: '/login', title: 'Вход' },
    { path: '/register', title: 'Регистрация' }
]

interface TitleBlockProps {
    className?: string;
}

const TitleBlock: FC<TitleBlockProps> = ({ className }) => {
    const pathname = usePathname();
    return (
        <div className={className}>
            <h1 className="text-white text-2xl font-bold mb-4">{routeTitles.find(item => item.path === pathname || ((item.path as string).startsWith(pathname) && /\/\:id$/.test(item.path)))?.title}</h1>
        </div>
    )
}

export default TitleBlock;