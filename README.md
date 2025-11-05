# 💰 Fine — Fintech Frontend (React + TypeScript + Vite)

Este projeto é o **frontend** de uma aplicação de controle financeiro pessoal desenvolvida como parte de um sistema completo (frontend + backend).  
O objetivo é oferecer uma interface web intuitiva para o gerenciamento de **usuários, recebimentos e gastos**, com autenticação de login integrada à API backend Spring Boot.

---

## 🚀 Instruções de Inicialização do Projeto

### ✅ **Pré-requisitos**
Antes de rodar o frontend, verifique se você possui:
- [Node.js](https://nodejs.org/) (versão 18 ou superior)
- NPM (instalado junto com o Node)
- O **backend (API Spring Boot)** rodando localmente em `http://localhost:8080`

---

### 🧭 **1️⃣ Clonar o projeto (ou descompactar o ZIP)**
Caso tenha recebido o projeto em um arquivo `.zip`, extraia-o em uma pasta de fácil acesso, por exemplo:
```
C:\Users\Anna Clara\Desktop\fintech-frontend
```

Ou, caso utilize Git:
```bash
git clone https://github.com/andradeannac/fine_fintech_fiap_frontend
cd fintech-frontend
```

---

### ⚙️ **2️⃣ Instalar as dependências**
Execute no terminal:
```bash
npm install
```

Isso fará o download de todas as dependências do projeto (React, Axios, React Router, etc.).

---

### 💡 **3️⃣ Configurar a URL da API (opcional)**
Por padrão, o frontend já está configurado para usar:
```
http://localhost:8080
```

Caso o backend esteja em outro endereço ou porta, edite o arquivo `.env` na raiz e atualize a variável:

```
VITE_API_BASE_URL=http://localhost:8080
```

---

### 🖥️ **4️⃣ Rodar o servidor de desenvolvimento**
Execute o comando:

```bash
npm run dev
```

O sistema abrirá automaticamente no navegador:
```
http://localhost:5173
```

Se não abrir, acesse manualmente o endereço acima.

---

### 🧩 **5️⃣ Login e navegação**
Após iniciar o backend e o frontend, acesse a tela de login.

Utilize o usuário de teste abaixo:

| Campo | Valor |
|-------|-------|
| **E-mail** | `anna@example.com` |
| **Senha**  | `123456` |

> 🔹 Caso ainda não exista esse usuário, basta acessar o link **"Criar conta"** na tela de login e realizar um novo cadastro.

---

### 📋 **6️⃣ Estrutura do projeto**
```
fintech-frontend/
├── src/
│   ├── api/               # Integração com API backend (Axios + Services)
│   ├── components/        # Componentes reutilizáveis (Layout, CRUD, etc.)
│   ├── contexts/          # Contexto de autenticação (AuthContext)
│   ├── pages/             # Páginas da aplicação (Login, Cadastro, Home, etc.)
│   ├── styles.css         # Estilos globais do sistema
│   ├── App.tsx            # Definição de rotas
│   └── main.tsx           # Ponto de entrada principal
├── .env.example           # Exemplo de configuração de ambiente
├── package.json           # Dependências e scripts
├── tsconfig.json          # Configuração do TypeScript
└── vite.config.ts         # Configuração do Vite
```

---

### ⚙️ **7️⃣ Scripts disponíveis**
| Comando | Descrição |
|----------|------------|
| `npm run dev` | Inicia o servidor de desenvolvimento |
| `npm run build` | Gera os arquivos otimizados para produção |
| `npm run preview` | Roda a versão final gerada em build localmente |

---

## 🔐 Autenticação
O login utiliza o endpoint:
```
POST /usuarios/login
```
O token JWT retornado é armazenado em `localStorage` e enviado automaticamente nas requisições subsequentes via header:
```
Authorization: Bearer <token>
```

---

## 💡 Tecnologias utilizadas
- **React.js 18**
- **TypeScript**
- **Vite**
- **Axios**
- **React Router DOM v6**
- **CSS puro (responsivo)**

---

## 🧱 Funcionalidades implementadas
✅ Login e autenticação  
✅ Cadastro de usuários  
✅ CRUD completo de **Usuários**, **Recebimentos** e **Gastos**  
✅ Dashboard com totais de valores  
✅ Páginas responsivas e de fácil navegação  
✅ Controle de sessão com `localStorage`  
✅ Rotas protegidas para usuários autenticados  

---

### ✨ Autor
**Anna Clara, Kelvin e Cauan**  
Projeto desenvolvido para o sistema **Fine - Controle Financeiro Pessoal**
