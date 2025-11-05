
import React, { useEffect, useMemo, useState } from 'react'
import FormField from './FormField'

type ID = number | string
type Primitive = any

interface Column<T> {
  key: keyof T
  label: string
  render?: (row: T) => React.ReactNode
}
interface Props<T extends Record<string, any>> {
  title: string
  columns: Column<T>[]
  load: () => Promise<T[]>
  create: (payload: T) => Promise<any>
  update: (id: ID, payload: Partial<T>) => Promise<any>
  remove: (id: ID) => Promise<any>
  blank: T
  idKey?: keyof T
  fieldTypes?: Partial<Record<keyof T, 'text' | 'number' | 'date'>>
}

function toInputType(v: any, ft?: string) {
  if (ft) return ft
  if (typeof v === 'number') return 'number'
  if (String(v).match(/^\d{4}-\d{2}-\d{2}$/)) return 'date'
  return 'text'
}

export default function EntityCrud<T extends Record<string, Primitive>> (props: Props<T>) {
  const { title, columns, load, create, update, remove, blank, idKey = 'id' as keyof T, fieldTypes } = props
  const [rows, setRows] = useState<T[]>([])
  const [q, setQ] = useState('')
  const [editing, setEditing] = useState<T | null>(null)
  const [form, setForm] = useState<T>(blank)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function refresh() {
    setLoading(true); setError(null)
    try { const data = await load(); setRows(data) }
    catch (e:any) { setError(e?.response?.data?.message || 'Erro ao carregar dados') }
    finally { setLoading(false) }
  }

  useEffect(() => { refresh() }, [])

  const filtered = useMemo(() => !q ? rows : rows.filter(r => JSON.stringify(r).toLowerCase().includes(q.toLowerCase())), [rows, q])
  function openCreate() { setEditing(null); setForm({ ...blank }) }
  function openEdit(row: T) { setEditing(row); setForm({ ...row }) }

  async function submit(e: React.FormEvent) {
    e.preventDefault()
    try {
      if (editing) { // @ts-ignore
        await update(editing[idKey], form)
      } else { await create(form) }
      await refresh(); setEditing(null); setForm({ ...blank })
    } catch (e:any) { setError(e?.response?.data?.message || 'Erro ao enviar dados') }
  }

  async function doRemove(row: T) { // @ts-ignore
    await remove(row[idKey]); await refresh() }

  return (
    <div className="card">
      <div className="toolbar">
        <h2 style={{ margin: 0 }}>{title}</h2>
        <div className="spacer" />
        <input className="input" placeholder="Buscar..." value={q} onChange={e=>setQ(e.target.value)} style={{ maxWidth: 240 }} />
        <button className="btn secondary" onClick={openCreate}>Novo</button>
      </div>

      {error && <div style={{ color:'var(--danger)', marginTop:'.5rem' }}>{error}</div>}

      <div style={{ overflowX:'auto', marginTop:'1rem' }}>
        <table className="table">
          <thead>
            <tr>
              {columns.map(c => <th key={String(c.key)}>{c.label}</th>)}
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {loading ? <tr><td colSpan={columns.length+1}>Carregando...</td></tr> :
              filtered.map((row, i) => (
                <tr key={i}>
                  {columns.map(c => <td key={String(c.key)}>{c.render ? c.render(row) : String((row as any)[c.key] ?? '')}</td>)}
                  <td className="chips">
                    <button className="btn ghost" onClick={() => openEdit(row)}>Editar</button>
                    <button className="btn danger" onClick={() => doRemove(row)}>Excluir</button>
                  </td>
                </tr>
              ))
            }
          </tbody>
        </table>
      </div>

      <details open={editing !== null || JSON.stringify(form) !== JSON.stringify(blank)} style={{ marginTop:'1rem' }}>
        <summary style={{ cursor:'pointer', color:'var(--muted)' }}>{editing ? 'Editar registro' : 'Novo registro'}</summary>
        <form onSubmit={submit} className="grid cols-2" style={{ gap:'.8rem', marginTop:'.8rem' }}>
          {Object.keys(blank).map((k) => {
            const key = k as keyof T
            if (key === idKey) return null
            const val = form[key]
            const type = toInputType(val, fieldTypes?.[key])
            return (
              <div key={String(key)}>
                <label className="label">{String(key)}</label>
                <input className="input" type={type} value={val as any}
                  onChange={e=> setForm({ ...form, [key]: type==='number' ? Number(e.target.value) : e.target.value } as T)} />
              </div>
            )
          })}
          <div className="chips">
            <button className="btn" type="submit">{editing ? 'Salvar' : 'Cadastrar'}</button>
            <button className="btn ghost" type="button" onClick={() => { setEditing(null); setForm({ ...blank }) }}>Cancelar</button>
          </div>
        </form>
      </details>
    </div>
  )
}
