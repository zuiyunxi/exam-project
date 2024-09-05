// import React from 'react'
import routesConfig from './router'
import { useRoutes } from 'react-router-dom'

const App = () => {
  const routes = useRoutes(routesConfig)
  return routes
}

export default App