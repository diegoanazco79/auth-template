import { BrowserRouter, Route, Routes} from 'react-router-dom'

import DashboardPage from './pages/dashboard'
import LoginPage from './pages/login'
 
import './App.css'

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<DashboardPage />}/>
        <Route path='/login' element={<LoginPage />}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App
