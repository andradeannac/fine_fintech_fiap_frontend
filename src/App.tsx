import React from 'react'
import { Route, Routes, Navigate } from 'react-router-dom'
import { AuthProvider } from '@/contexts/AuthContext'
import ProtectedRoute from '@/components/ProtectedRoute'
import Login from '@/pages/Login'
import Home from '@/pages/Home'
import UsuariosPage from '@/pages/UsuariosPage'
import RecebimentosPage from '@/pages/RecebimentosPage'
import GastosPage from '@/pages/GastosPage'
import ErrorPage from '@/pages/ErrorPage'
import Register from '@/pages/Register' // <-- NOVO

const App: React.FC = () => {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/cadastro" element={<Register />} /> {/* <-- NOVO */}
        <Route element={<ProtectedRoute />}>
          <Route path="/" element={<Home />} />
          <Route path="/usuarios" element={<UsuariosPage />} />
          <Route path="/recebimentos" element={<RecebimentosPage />} />
          <Route path="/gastos" element={<GastosPage />} />
        </Route>
        <Route path="/404" element={<ErrorPage />} />
        <Route path="*" element={<Navigate to="/404" replace />} />
      </Routes>
    </AuthProvider>
  )
}
export default App
