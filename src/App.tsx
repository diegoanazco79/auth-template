import { BrowserRouter, Route, Routes } from "react-router-dom"
import { ThemeProvider } from '@mui/material/styles'

import DashboardPage from "./pages/dashboard"
import LoginPage from "./pages/login"
import SignupPage from "./pages/signup"
import VerifyEmailPage from "./pages/verify-email"

import theme from "./theme"

import "./App.css"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"

const queryClient = new QueryClient()

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>
        <BrowserRouter>
          <Routes>
            <Route index element={<DashboardPage />} />
            <Route path='/' element={<DashboardPage />} />
            <Route path='/login' element={<LoginPage />} />
            <Route path='/signup' element={<SignupPage />} />
            <Route path='/verify/:token' element={<VerifyEmailPage />} />
          </Routes>
        </BrowserRouter>
      </ThemeProvider>
    </QueryClientProvider>
  )
}

export default App
