# Portfólio • Luana Lamonica

Aplicação de portfólio pessoal desenvolvida para apresentar minha trajetória na área de TI, principais projetos e formas de contato. O foco é em desenvolvimento front-end, com uma interface moderna e responsiva, e um backend simples para receber mensagens do formulário de contato.

## 🚀 Demo

- Site publicado: https://portifolio-luanalamonica.vercel.app/

## ✨ Funcionalidades

- **Layout em seções:** Home, experiências, projetos em destaque, mais projetos do GitHub e contato.
- **Idioma PT/EN:** Alternância entre português e inglês pelo seletor no topo da página.
- **Lista de projetos em destaque:** Cards com descrição, tecnologias e links para os repositórios principais.
- **Integração com GitHub:** Lista automática dos repositórios públicos mais recentes (via API do GitHub).
- **Formulário de contato funcional:** Envio de mensagem para o meu e-mail via backend Node/Express.
- **Design responsivo:** Pensado para telas desktop e se adaptando para diferentes larguras.
- **Links para redes sociais:** GitHub, LinkedIn e Instagram destacados no topo do portfólio.

## 🧱 Tecnologias utilizadas

### Frontend

- React 19
- TypeScript
- Vite
- CSS (estilização customizada em App.css)

### Backend

- Node.js
- Express
- Nodemailer
- Resend (opcional, para envio de e-mail via API)
- dotenv
- cors

### Deploy

- Frontend hospedado na **Vercel**.
- Backend configurado para rodar em Node/Express (pode ser hospedado em serviços como Render, Railway, etc.).

## 📂 Estrutura do projeto

```bash
portifolio/
├── backend/
│   ├── package.json
│   ├── tsconfig.json
│   └── src/
│       └── index.ts        # API Express com rota /contact para o formulário
│
└── frontend/
    ├── package.json
    ├── index.html
    ├── public/
    │   └── perfil.jpeg     # Foto usada na seção principal (hero)
    └── src/
        ├── main.tsx
        ├── App.tsx         # Layout completo do portfólio
        ├── App.css         # Estilização da página
        └── assets/
```

## 🧩 Visão geral das seções

- **Header / Hero**
  - Título: "Front-end Developer".
  - Chips de tecnologias que uso (React, TypeScript, JavaScript, Node.js, HTML, CSS).
  - Foto de perfil e texto "about me" em PT/EN.
  - Navegação interna: `home`, `experiences`, `projects`, `contact`.

- **Experiences**
  - Linha do tempo com experiências profissionais em suporte/assistência de TI.
  - Bloco de **skills** com nível em cada tecnologia.
  - Bloco de **formações & certificados**, incluindo bootcamps e projetos relevantes.

- **Projects**
  - Lista de **projetos em destaque** (Tiny Swords, To-Do List, Projeto Fórmula 1, Nurture), com:
    - imagem animada/print do projeto,
    - resumo do que foi desenvolvido,
    - bullets com detalhes técnicos,
    - chips das tecnologias usadas,
    - link para o repositório (e deploy quando existir).
  - Grade com **mais projetos** carregados diretamente da API do GitHub.

- **Contact**
  - Formulário com campos de **nome**, **email** e **mensagem**.
  - Envio via POST para o backend (`/contact`).
  - Feedback de carregamento ("enviando...") e mensagem de sucesso/erro para o usuário.

## 🔧 Como rodar o projeto localmente

### Pré-requisitos

- Node.js (versão LTS recomendada)
- npm ou yarn

### 1. Clonar o repositório

```bash
git clone https://github.com/luanalamonica/portifolio.git
cd portifolio
```

### 2. Instalar dependências

#### Backend

```bash
cd backend
npm install
```

#### Frontend

```bash
cd ../frontend
npm install
```

### 3. Configurar variáveis de ambiente

#### Backend (`backend/.env`)

Crie um arquivo `.env` dentro da pasta `backend` com as variáveis necessárias para o envio de e-mails:

```env
PORT=3333

# Configurações SMTP (exemplo: Gmail com senha de app)
MAIL_HOST=smtp.gmail.com
MAIL_PORT=587
MAIL_USER=seu-email@gmail.com
MAIL_PASS=sua-senha-ou-app-password

# Para onde as mensagens do formulário serão enviadas
MAIL_TO=destino-das-mensagens@gmail.com

# (Opcional) Envio via Resend
RESEND_API_KEY=sua_resend_api_key_opcional
RESEND_FROM_EMAIL="Portfolio da Luana <seu-email@dominio.com>"
```

> Se você não configurar SMTP nem Resend, o backend ainda responde a requisição, mas não conseguirá encaminhar o e-mail de fato.

#### Frontend (`frontend/.env.local` ou `.env`)

Crie um arquivo `.env.local` (ou `.env`) dentro da pasta `frontend` para apontar a URL da API do backend:

```env
VITE_API_URL=http://localhost:3333
```

### 4. Rodar o backend

```bash
cd backend
npm run dev
```

O servidor rodará por padrão em `http://localhost:3333` com as rotas:

- `GET /` → teste rápido para ver se a API está no ar.
- `POST /contact` → rota usada pelo formulário de contato do portfólio.

### 5. Rodar o frontend

Em outro terminal:

```bash
cd frontend
npm run dev
```

A aplicação React ficará disponível em algo como:

- http://localhost:5173/

Certifique-se de que o backend está rodando para que o formulário de contato funcione corretamente.

## 📝 Como adicionar mais imagens no README

Atualmente, o README usa a imagem `perfil.jpeg` que está em `frontend/public`. Se quiser adicionar mais prints das seções do site:

1. Tire screenshots das áreas que deseja destacar (experiences, projects, contact, etc.).
2. Salve os arquivos em `frontend/public` (por exemplo, `home.png`, `projects.png`).
3. Adicione no README, por exemplo:

```markdown
![Seção de projetos](./frontend/public/projects.png)
```

## 📫 Contato

- Portfólio online: https://portifolio-luanalamonica.vercel.app/
- GitHub: https://github.com/luanalamonica
- LinkedIn: https://www.linkedin.com/in/luana-lamonica
- Instagram: https://www.instagram.com/luanalamonica_

Sinta-se à vontade para abrir issues ou enviar sugestões de melhoria para o portfólio! 😊
