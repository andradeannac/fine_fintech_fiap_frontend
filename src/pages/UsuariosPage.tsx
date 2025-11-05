
import React from 'react'
import Layout from '@/components/Layout'
import EntityCrud from '@/components/EntityCrud'
import { Usuarios } from '@/api/services'
import type { Usuario } from '@/types'

const blank: Usuario = { nome: '', email: '' }

const UsuariosPage: React.FC = () => (
  <Layout>
    <EntityCrud<Usuario>
      title="Usuários"
      columns={[
        { key: 'id', label: 'ID' },
        { key: 'nome', label: 'Nome' },
        { key: 'email', label: 'E-mail' },
      ]}
      load={Usuarios.list}
      create={Usuarios.create}
      update={Usuarios.update}
      remove={Usuarios.remove}
      blank={blank}
    />
  </Layout>
)
export default UsuariosPage
