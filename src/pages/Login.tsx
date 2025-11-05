import React, { useState } from 'react'
import { useNavigate, Navigate, Link } from 'react-router-dom'
import { useAuth } from '@/contexts/AuthContext'
import FormField from '@/components/FormField'

const Login: React.FC = () => {
  const { login, token } = useAuth()
  const [email, setEmail] = useState('')
  const [senha, setSenha] = useState('')
  const [error, setError] = useState<string | null>(null)
  const navigate = useNavigate()

  if (token) return <Navigate to="/" replace />

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError(null)
    try {
      await login(email, senha)
      navigate('/')
    } catch (err:any) {
      setError(err?.response?.data?.message || 'Falha ao autenticar. Verifique credenciais e a API.')
    }
  }

  return (
    <div style={{ maxWidth: 420, margin: '4rem auto' }}>
      <div className="card">
        <div style={{ display:'flex', justifyContent:'center', marginBottom:'1rem' }}>
          <h1 style={{ margin:0 }}>fine</h1>
        </div>
        <form onSubmit={handleSubmit} className="grid" style={{ gap:'.8rem' }}>
          <FormField label="E-mail" type="email" placeholder="exemplo@exemplo.com" value={email} onChange={e=>setEmail(e.target.value)} />
          <FormField label="Senha" type="password" placeholder="••••••••" value={senha} onChange={e=>setSenha(e.target.value)} />
          {error && <div style={{ color:'var(--danger)', fontSize:'.9rem' }}>{error}</div>}
          <button className="btn" type="submit">Entrar</button>
        </form>

        <div style={{ marginTop: '1rem', textAlign: 'center' }}>
          <span className="label">Não tem conta?</span>{' '}
          <Link to="/cadastro" style={{ textDecoration: 'underline' }}>Criar conta</Link>
        </div>
      </div>
    </div>
  )
}

export default Login
