// import React from 'react'
import routesConfig from './router'
import { useRoutes } from 'react-router-dom'
import { Watermark } from 'antd';
const App = () => {
  const routes = useRoutes(routesConfig)
  return (
    <Watermark content="八维研修学院">
      {routes}
    </Watermark>
    )
}

export default App