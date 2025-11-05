
import React, { createContext, useContext, useEffect, useState } from 'react'
import { login } from '@/api/services'
import type { Usuario } from '@/types'

interface AuthState {
  user: Usuario | null
  token: string | null
  login: (email: string, senha: string) => Promise<void>
  logout: () => void
}

const AuthCtx = createContext<AuthState | null>(null)
export const useAuth = () => { const ctx = useContext(AuthCtx); if (!ctx) throw new Error('AuthContext not found'); return ctx }

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<Usuario | null>(null)
  const [token, setToken] = useState<string | null>(null)

  useEffect(() => {
    const t = localStorage.getItem('token')
    const u = localStorage.getItem('user')
    if (t && u) { setToken(t); setUser(JSON.parse(u)) }
  }, [])

  async function doLogin(email: string, senha: string) {
    const data = await login(email, senha)
    setToken(data.token); setUser(data.usuario)
    localStorage.setItem('token', data.token)
    localStorage.setItem('user', JSON.stringify(data.usuario))
  }

  function logout() { setUser(null); setToken(null); localStorage.removeItem('token'); localStorage.removeItem('user') }

  return <AuthCtx.Provider value={{ user, token, login: doLogin, logout }}>{children}</AuthCtx.Provider>
}
