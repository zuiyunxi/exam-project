import './App.scss'
import config from './router/index'
import { useRoutes } from 'react-router-dom'

function App() {
  const routes = useRoutes(config)
  return routes
}

export default App