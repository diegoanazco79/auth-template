import { Navigate, Outlet } from "react-router-dom"

import { User } from "../store/authStore"

interface ProtectedRoutesProps {
  user: User | null;
}

export const ProtectedRoutes = ({ user }: ProtectedRoutesProps) => {
  if (!user) return <Navigate to='/login' />
  return <Outlet />
}
