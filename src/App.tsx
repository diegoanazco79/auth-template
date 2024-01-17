import { BrowserRouter, Route, Routes } from "react-router-dom"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { ThemeProvider } from '@mui/material/styles'

import DashboardPage from "./pages/dashboard"
import ForgotPasswordPage from "./pages/forgot-password"
import LoginPage from "./pages/login"
import ResetPasswordPage from "./pages/reset-password"
import SignupPage from "./pages/signup"
import VerifyEmailPage from "./pages/verify-email"
import { ProtectedRoutes } from "./routes/ProtectedRoutes"

import { useAuthStore } from "./store/authStore"

import theme from "./theme"
import "./App.css"


const queryClient = new QueryClient()

function App() {
  const user = useAuthStore((state) => state.user)

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>
        <BrowserRouter>
          <Routes>
            <Route path='/login' element={<LoginPage />} />
            <Route path='/signup' element={<SignupPage />} />
            <Route path='/verify/:token' element={<VerifyEmailPage />} />
            <Route path='/forgot-password' element={<ForgotPasswordPage />} />
            <Route path='/change-password/:token' element={<ResetPasswordPage />} />
            <Route element={<ProtectedRoutes user={user} />}>
              <Route path='/' element={<DashboardPage />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </ThemeProvider>
    </QueryClientProvider>
  )
}

export default App
