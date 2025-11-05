
import { api } from './axios'
import type { Usuario, Recebimento, Gasto, ID } from '@/types'

export async function login(email: string, senha: string) {
  const { data } = await api.post('/usuarios/login', { email, senha })
  return data as { token: string; usuario: Usuario }
}

export const Usuarios = {
  async list() { const { data } = await api.get('/usuarios'); return data as Usuario[] },
  async get(id: ID) { const { data } = await api.get(`/usuarios/${id}`); return data as Usuario },
  async create(payload: Usuario) { const { data } = await api.post('/usuarios', payload); return data as Usuario },
  async update(id: ID, payload: Partial<Usuario>) { const { data } = await api.put(`/usuarios/${id}`, payload); return data as Usuario },
  async remove(id: ID) { await api.delete(`/usuarios/${id}`) }
}

export const Recebimentos = {
  async list() { const { data } = await api.get('/recebimento'); return data as Recebimento[] },
  async get(id: ID) { const { data } = await api.get(`/recebimento/${id}`); return data as Recebimento },
  async create(payload: Recebimento) { const { data } = await api.post('/recebimento', payload); return data as Recebimento },
  async update(id: ID, payload: Partial<Recebimento>) { const { data } = await api.put(`/recebimento/${id}`, payload); return data as Recebimento },
  async remove(id: ID) { await api.delete(`/recebimento/${id}`) }
}

export const Gastos = {
  async list() { const { data } = await api.get('/gastos'); return data as Gasto[] },
  async get(id: ID) { const { data } = await api.get(`/gastos/${id}`); return data as Gasto },
  async create(payload: Gasto) { const { data } = await api.post('/gastos', payload); return data as Gasto },
  async update(id: ID, payload: Partial<Gasto>) { const { data } = await api.put(`/gastos/${id}`, payload); return data as Gasto },
  async remove(id: ID) { await api.delete(`/gastos/${id}`) }
}
