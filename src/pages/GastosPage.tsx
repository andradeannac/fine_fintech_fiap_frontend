
import React from 'react'
import Layout from '@/components/Layout'
import EntityCrud from '@/components/EntityCrud'
import { Gastos } from '@/api/services'
import type { Gasto } from '@/types'

const blank: Gasto = { usuarioId: '', data: new Date().toISOString().slice(0,10), descricao: '', valor: 0, categoria: '' }

const GastosPage: React.FC = () => (
  <Layout>
    <EntityCrud<Gasto>
      title="Gastos"
      columns={[
        { key: 'id', label: 'ID' },
        { key: 'usuarioId', label: 'Usuário ID' },
        { key: 'data', label: 'Data' },
        { key: 'descricao', label: 'Descrição' },
        { key: 'valor', label: 'Valor' },
        { key: 'categoria', label: 'Categoria' },
      ]}
      load={Gastos.list}
      create={Gastos.create}
      update={Gastos.update}
      remove={Gastos.remove}
      blank={blank}
      fieldTypes={{ data: 'date', valor: 'number' }}
    />
  </Layout>
)
export default GastosPage
