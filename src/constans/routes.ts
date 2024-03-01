interface contentRoute {
  name: string
  route: string
}

type navbarRouteTypes = {
  home: contentRoute
  about: contentRoute
  contact: contentRoute
  balloons: contentRoute
  flowers: contentRoute
  [key: string]: contentRoute
}

type footerInfoRouteTypes = {
  privacityNotice: contentRoute
  usagePolicies: contentRoute
  about: contentRoute
  [key: string]: contentRoute
}

export const NavbarRoutes: navbarRouteTypes = {
  home: { name: 'Home', route: '/' },
  about: { name: 'Nosotros', route: '/nosotros' },
  balloons: { name: 'Globos', route: '/globos' },
  flowers: { name: 'Flores', route: '/flores' },
  contact: { name: 'Contacto', route: '/contacto' },
}

export const InfoFooterRoutes: footerInfoRouteTypes = {
  privacityNotice: { name: 'Aviso de privacidad', route: '/aviso-privacidad' },
  usagePolicies: { name: 'Politicas de uso', route: '/politicas-uso' },
  about: { name: 'Nosotros', route: '/nosotros' },
}
