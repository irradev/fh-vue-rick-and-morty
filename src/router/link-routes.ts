export interface RouteLink {
  path: string
  name: string
  title: string
}

export const routeLinks: RouteLink[] = [
  { path: '/', name: 'home', title: 'Inicio' },
  { path: '/about', name: 'about', title: 'Sobre' },
  { path: '/characters', name: 'characters', title: 'Personajes' }
]
