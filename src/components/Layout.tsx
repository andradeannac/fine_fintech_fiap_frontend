
import React from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { useAuth } from '@/contexts/AuthContext'

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user, logout } = useAuth()
  const navigate = useNavigate()
  return (
    <div className="container">
      <header className="topbar">
        <div style={{ display: 'flex', alignItems: 'center', gap: '.6rem' }}>
          <span style={{ fontWeight: 800 }}>fine</span>
          <span style={{ fontSize: '.85rem', opacity: .8 }}>fintech</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '.6rem' }}>
          <span style={{ fontSize: '.9rem' }}>{user?.nome}</span>
          <button className="btn ghost" onClick={() => { logout(); navigate('/login') }}>Sair</button>
        </div>
      </header>

      <div className="layout">
        <aside className="sidebar card" style={{color:'#fff', background:'#6c8a96'}}>
          <div className="sb-brand">☰ Menu</div>
          <nav className="sb-nav" style={{ marginTop: '1rem' }}>
            <NavLink to="/" end className={({isActive}) => isActive ? 'active' : ''}>Página Inicial</NavLink>
            <NavLink to="/usuarios" className={({isActive}) => isActive ? 'active' : ''}>Usuários</NavLink>
            <NavLink to="/recebimentos" className={({isActive}) => isActive ? 'active' : ''}>Recebimentos</NavLink>
            <NavLink to="/gastos" className={({isActive}) => isActive ? 'active' : ''}>Gastos</NavLink>
          </nav>
        </aside>

        <main style={{ paddingRight: '1rem' }}>
          {children}
        </main>
      </div>
    </div>
  )
}

export default Layout
