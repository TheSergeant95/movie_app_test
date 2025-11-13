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

export const HTTP_STATUS = {
  OK: 200,
  NOT_FOUND: 404,
  UNAUTHORIZED: 401,
  INTERNAL_SERVER_ERROR: 500
};

export const TIME = {
  MAX_AGE: 3600,
  DEFAULT_PAYMENT_LIMIT: 180,
};