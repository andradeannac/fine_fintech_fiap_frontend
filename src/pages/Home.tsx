
import React, { useEffect, useMemo, useState } from 'react'
import Layout from '@/components/Layout'
import { Gastos, Recebimentos } from '@/api/services'
import type { Gasto, Recebimento } from '@/types'

const Home: React.FC = () => {
  const [gastos, setGastos] = useState<Gasto[]>([])
  const [receb, setReceb] = useState<Recebimento[]>([])

  useEffect(() => {
    (async () => {
      try {
        const [g, r] = await Promise.all([Gastos.list(), Recebimentos.list()])
        setGastos(g); setReceb(r)
      } catch (e) { /* ignore */ }
    })()
  }, [])

  const totalGastos = useMemo(() => gastos.reduce((s,g)=>s+Number(g.valor||0),0), [gastos])
  const totalReceb = useMemo(() => receb.reduce((s,r)=>s+Number(r.valor||0),0), [receb])

  return (
    <Layout>
      <div className="grid cols-2">
        <div className="card stat">
          <span className="label">Recebimentos</span>
          <span className="kpi">R$ {totalReceb.toFixed(2)}</span>
        </div>
        <div className="card stat">
          <span className="label">Gastos</span>
          <span className="kpi">R$ {totalGastos.toFixed(2)}</span>
        </div>
      </div>

      <div className="grid cols-2">
        <div className="card">
          <h3>Últimos recebimentos</h3>
          <table className="table">
            <thead><tr><th>Data</th><th>Descrição</th><th>Valor</th></tr></thead>
            <tbody>
              {receb.slice(0,5).map(r => <tr key={String(r.id)}>
                <td>{new Date(r.data).toLocaleDateString()}</td>
                <td>{r.descricao}</td>
                <td>R$ {Number(r.valor).toFixed(2)}</td>
              </tr>)}
            </tbody>
          </table>
        </div>
        <div className="card">
          <h3>Últimos gastos</h3>
          <table className="table">
            <thead><tr><th>Data</th><th>Descrição</th><th>Valor</th></tr></thead>
            <tbody>
              {gastos.slice(0,5).map(g => <tr key={String(g.id)}>
                <td>{new Date(g.data).toLocaleDateString()}</td>
                <td>{g.descricao}</td>
                <td>R$ {Number(g.valor).toFixed(2)}</td>
              </tr>)}
            </tbody>
          </table>
        </div>
      </div>
    </Layout>
  )
}
export default Home
