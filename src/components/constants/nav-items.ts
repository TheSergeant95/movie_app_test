import { Route } from 'next'

type NavItem<T extends string = string> = {
  href: T
  label: string
  activeRoutes?: string[]
}

export const navItems: NavItem<Route>[] = [
  { href: `/movies`, label: 'Фильмы', activeRoutes: ['/movies'] },
  { href: `/cinemas`, label: 'Кинотеатры', activeRoutes: ['/cinemas'] },
  { href: `/bookings`, label: 'Мои билеты', activeRoutes: ['/bookings'] },
]

export const loginNavItems: NavItem<Route>[] = [
  { href: `/login`, label: 'Вход', activeRoutes: ['/login', '/register'] },
]