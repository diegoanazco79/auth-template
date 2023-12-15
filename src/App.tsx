import { BrowserRouter, Route, Routes } from "react-router-dom"
import { ThemeProvider } from '@mui/material/styles'

import DashboardPage from "./pages/dashboard"
import LoginPage from "./pages/login"

import theme from "./theme"

import "./App.css"

function App() {
  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <Routes>
          <Route index element={<DashboardPage />} />
          <Route path='/' element={<DashboardPage />} />
          <Route path='/login' element={<LoginPage />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  )
}

export default App
