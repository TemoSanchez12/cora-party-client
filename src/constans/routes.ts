interface contentRoute {
  name: string
  route: string
}

type routeTypes = {
  home: contentRoute
  about: contentRoute
  contact: contentRoute
  balloons: contentRoute
  flowers: contentRoute
  [key: string]: contentRoute
}

const Routes: routeTypes = {
  home: { name: 'Home', route: '/' },
  about: { name: 'Nosotros', route: '/nosotros' },
  balloons: { name: 'Globos', route: '/globos' },
  flowers: { name: 'Flores', route: '/flores' },
  contact: { name: 'Contacto', route: '/contacto' },
}

export default Routes
