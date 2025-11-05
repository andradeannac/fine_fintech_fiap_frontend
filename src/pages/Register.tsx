import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { Usuarios } from '@/api/services'
import type { Usuario } from '@/types'

const Register: React.FC = () => {
    const navigate = useNavigate()
    const [form, setForm] = useState<{ nome: string; email: string; senha: string; confirmarSenha: string }>({
        nome: '', email: '', senha: '', confirmarSenha: ''
    })
    const [error, setError] = useState<string | null>(null)
    const [loading, setLoading] = useState(false)

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault()
        setError(null)

        if (!form.nome || !form.email || !form.senha) {
            setError('Preencha todos os campos obrigatórios.')
            return
        }
        if (form.senha !== form.confirmarSenha) {
            setError('As senhas não coincidem.')
            return
        }

        try {
            setLoading(true)
            const payload: Usuario = { nome: form.nome, email: form.email, senha: form.senha }
            await Usuarios.create(payload) // POST /usuarios
            // após cadastrar, leve para o login
            navigate('/login', { replace: true })
        } catch (err: any) {
            setError(err?.response?.data?.message || 'Não foi possível cadastrar. Verifique a API.')
        } finally {
            setLoading(false)
        }
    }

    return (
        <div style={{ maxWidth: 520, margin: '3rem auto' }}>
            <div className="card">
                <h2 style={{ marginTop: 0 }}>Criar conta</h2>
                <form onSubmit={handleSubmit} className="grid" style={{ gap: '.8rem' }}>
                    <div>
                        <label className="label">Nome</label>
                        <input
                            className="input"
                            placeholder="Seu nome completo"
                            value={form.nome}
                            onChange={(e) => setForm({ ...form, nome: e.target.value })}
                        />
                    </div>

                    <div>
                        <label className="label">E-mail</label>
                        <input
                            className="input"
                            type="email"
                            placeholder="voce@exemplo.com"
                            value={form.email}
                            onChange={(e) => setForm({ ...form, email: e.target.value })}
                        />
                    </div>

                    <div>
                        <label className="label">Senha</label>
                        <input
                            className="input"
                            type="password"
                            placeholder="••••••••"
                            value={form.senha}
                            onChange={(e) => setForm({ ...form, senha: e.target.value })}
                        />
                    </div>

                    <div>
                        <label className="label">Confirmar senha</label>
                        <input
                            className="input"
                            type="password"
                            placeholder="••••••••"
                            value={form.confirmarSenha}
                            onChange={(e) => setForm({ ...form, confirmarSenha: e.target.value })}
                        />
                    </div>

                    {error && <div style={{ color: 'var(--danger)' }}>{error}</div>}

                    <div className="chips">
                        <button className="btn" type="submit" disabled={loading}>
                            {loading ? 'Cadastrando...' : 'Cadastrar'}
                        </button>
                        <Link to="/login" className="btn ghost">Voltar ao login</Link>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Register
