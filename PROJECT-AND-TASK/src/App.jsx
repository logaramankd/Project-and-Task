import { useState } from 'react'
import Login from './Pages/Login'
import AppRoutes from './routes/AppRoutes '


function App() {
  const [count, setCount] = useState(0)

  return (
  <div>
    <AppRoutes/>
  </div>
  )
}

export default App
