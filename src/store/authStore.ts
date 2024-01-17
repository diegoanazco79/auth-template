import { create } from "zustand"
import { persist } from "zustand/middleware"

export interface User {
  id: string
  firstName: string
  lastName: string
  email: string
  role: string
}

interface State {
  token: string
  user: User | null
}

interface Actions {
  setToken: (token: string) => void
  setUser: (user: User) => void
}

export const useAuthStore = create(persist<State & Actions>(
  (set) => ({
    token: '',
    user: null,
    setToken: (token) => set({ token }),
    setUser: (user) => set({ user }),
  }),
  {
    name: 'auth',
  }
))