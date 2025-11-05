
import React from 'react'
import Layout from '@/components/Layout'
import EntityCrud from '@/components/EntityCrud'
import { Recebimentos } from '@/api/services'
import type { Recebimento } from '@/types'

const blank: Recebimento = { usuarioId: '', data: new Date().toISOString().slice(0,10), descricao: '', valor: 0 }

const RecebimentosPage: React.FC = () => (
  <Layout>
    <EntityCrud<Recebimento>
      title="Recebimentos"
      columns={[
        { key: 'id', label: 'ID' },
        { key: 'usuarioId', label: 'Usuário ID' },
        { key: 'data', label: 'Data' },
        { key: 'descricao', label: 'Descrição' },
        { key: 'valor', label: 'Valor' },
      ]}
      load={Recebimentos.list}
      create={Recebimentos.create}
      update={Recebimentos.update}
      remove={Recebimentos.remove}
      blank={blank}
      fieldTypes={{ data: 'date', valor: 'number' }}
    />
  </Layout>
)
export default RecebimentosPage
