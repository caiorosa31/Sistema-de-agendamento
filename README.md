# 🗓️ Sistema de Agendamento

link para download projeto full no DRIVE: https://drive.google.com/file/d/1NhVWnvIojiG6-pnBGp31ObjAsisLsfEw/view?usp=sharing

link para acessar online: https://comfy-babka-4c83f9.netlify.app/

> Plataforma intuitiva e eficiente para agendamento online de serviços, conectando clientes a prestadores de serviço e facilitando a gestão de horários.

![Status](https://img.shields.io/badge/status-em%20desenvolvimento-yellow)
![Frontend](https://img.shields.io/badge/Frontend-React%20%2B%20Vite-blue)
![Styling](https://img.shields.io/badge/Styling-TailwindCSS-4F46E5)
![Backend](https://img.shields.io/badge/Backend-Node.js%20%2B%20Express-green)
![Database](https://img.shields.io/badge/Database-PostgreSQL-316192)
![ORM](https://img.shields.io/badge/ORM-Prisma-5A67D8)

---

## 📋 Índice

- [Visão Geral](#-visão-geral)
- [Domínio do Problema](#-domínio-do-problema)
- [Requisitos Funcionais](#-requisitos-funcionais)
- [Requisitos Não Funcionais](#-requisitos-não-funcionais)
- [Tecnologias Utilizadas](#-tecnologias-utilizadas)
- [Arquitetura do Sistema](#-arquitetura-do-sistema)
- [Modelagem de Dados](#-modelagem-de-dados)
- [Organização de Tarefas](#-organização-de-tarefas)
- [Como Executar](#-como-executar)
- [Equipe](#-equipe)

---

## ✨ Visão Geral

O **Sistema de Agendamento** é uma aplicação web criada para facilitar o agendamento de serviços. Ele conecta clientes que procuram serviços com prestadores que os oferecem, garantindo uma experiência simples e eficiente. O sistema prioriza a facilidade de uso e a segurança dos dados, assegurando que os agendamentos sejam realizados corretamente e que a disponibilidade dos prestadores esteja sempre atualizada.

---

## 🎯 Escopo do Problema

O desenvolvimento deste sistema tem como objetivo resolver problemas do agendamento manual ou pouco eficiente. Clientes muitas vezes têm dificuldade para encontrar prestadores disponíveis e organizar seus compromissos. Já os prestadores enfrentam desafios para gerenciar suas agendas, evitar conflitos de horários e aproveitar melhor o tempo. A proposta é uma plataforma centralizada que digitaliza e automatiza esse processo, tornando a experiência mais simples e eficiente para ambos.

---

## ✅ Requisitos Funcionais

| ID | Descrição |
|----|-----------|
| RF001 | O sistema deve permitir o **cadastro e login de usuários** (clientes e prestadores de serviço) com diferentes níveis de acesso. |
| RF002 | Usuários devem poder **visualizar e editar suas informações de perfil**, incluindo dados pessoais e de contato. |
| RF003 | Clientes devem poder **buscar por serviços ou prestadores de serviço** com base em critérios como tipo de serviço, localização, disponibilidade e avaliações. |
| RF004 | Clientes devem poder **visualizar a agenda de disponibilidade** dos prestadores de serviço em tempo real. |
| RF005 | Clientes devem poder **selecionar um serviço, data e horário disponíveis e confirmar o agendamento** de forma segura. |
| RF006 | O sistema deve **enviar confirmações de agendamento** (e-mail/notificação) para clientes e prestadores após a reserva. |
| RF007 | Clientes e prestadores devem poder **cancelar ou reagendar um serviço**, respeitando regras de antecedência configuráveis. |
| RF008 | Prestadores de serviço devem poder **definir seus horários de trabalho, bloquear períodos na agenda** e visualizar seus agendamentos confirmados. |
| RF009 | Clientes devem poder **avaliar os serviços prestados e os prestadores**, contribuindo para um sistema de reputação. |
| RF010 | Clientes e prestadores devem poder **visualizar o histórico completo de seus agendamentos** e serviços realizados. |

---

## 🔒 Requisitos Não Funcionais

| ID | Descrição |
|----|-----------|
| RNF001 | A interface do usuário deve ser intuitiva, fácil de usar e responsiva, adaptando-se a diferentes dispositivos (desktop, tablet, mobile). |
| RNF002 | O sistema deve responder a requisições em no máximo 2 segundos e ser capaz de suportar um volume crescente de usuários e agendamentos sem degradação significativa de performance. |
| RNF003 | O sistema deve proteger os dados dos usuários (senhas com hash bcrypt, autenticação via JWT) e as informações de agendamento contra acessos não autorizados e vulnerabilidades, com validação de permissões de acesso nas APIs. |
| RNF005 | A arquitetura do sistema deve ser modular e permitir a expansão futura para suportar novas funcionalidades e um maior número de usuários e prestadores. |
| RNF006 | O código deve ser bem documentado, seguir padrões de codificação (ex: ESLint), ser modular e fácil de manter e estender por novos desenvolvedores. |

---

## 🛠 Tecnologias Utilizadas

| Camada | Tecnologia | Versão | Justificativa |
|--------|------------|--------|---------------|
| Frontend | **React.js** | 18+ | Biblioteca JavaScript para construção de interfaces de usuário reativas e componentizadas, ideal para SPAs (Single Page Applications). |
| Frontend Tooling | **Next.js** | 5+ | Ferramenta de build frontend de próxima geração que oferece um ambiente de desenvolvimento extremamente rápido e otimizado para produção. |
| Estilização | **Tailwind CSS** | 3+ | Framework CSS utilitário que permite construir designs personalizados rapidamente, sem sair do HTML, promovendo consistência e agilidade no desenvolvimento da UI. |
| Backend | **Node.js** | 18+ | Ambiente de execução JavaScript server-side, permitindo o uso da mesma linguagem em todo o stack (full-stack JavaScript/TypeScript). |
| Backend Framework | **Express.js** | 4+ | Framework web minimalista e flexível para Node.js, facilitando a criação de APIs RESTful robustas e escaláveis. |
| Banco de Dados | **PostgreSQL** | 14+ | Sistema de gerenciamento de banco de dados relacional (SGBDR) open-source, conhecido por sua robustez, confiabilidade, conformidade com ACID e extensibilidade. |
| ORM | **Prisma** | 5+ | ORM (Object-Relational Mapper) de próxima geração para Node.js e TypeScript, que simplifica o acesso ao banco de dados, gera tipos automaticamente e oferece um sistema de migrações poderoso. |
| Autenticação | **JWT (JSON Web Tokens)** | - | Padrão seguro e stateless para autenticação e autorização, ideal para APIs RESTful e aplicações distribuídas. |
| HTTP Client | **Axios** | 1+ | Cliente HTTP baseado em Promises para o navegador e Node.js, com uma API simples e poderosa para fazer requisições a APIs. |

---

## 🏗 Arquitetura do Sistema

O sistema adota uma arquitetura **cliente-servidor** com uma abordagem **API-first**, onde o frontend (cliente) se comunica com o backend (servidor) através de uma API RESTful. Essa separação clara de responsabilidades permite o desenvolvimento independente das camadas e facilita a escalabilidade e manutenção.

### Estrutura de Pastas

A organização do código segue uma estrutura modular para facilitar a navegação e a colaboração:

```
SistemaAgendamento/
├── backend/                         # Aplicação Node.js (API REST)
│   ├── prisma/                      # Definições do schema do banco de dados e migrações
│   │   └── schema.prisma
│   ├── src/
│   │   ├── controllers/             # Lógica de manipulação de requisições HTTP
│   │   ├── services/                # Regras de negócio e interação com o banco de dados
│   │   ├── routes/                  # Definição das rotas da API
│   │   ├── middlewares/             # Funções intermediárias (autenticação, validação)
│   │   ├── utils/                   # Funções utilitárias e helpers
│   │   └── server.ts                # Ponto de entrada da aplicação backend
│   ├── .env.example                 # Exemplo de variáveis de ambiente
│   ├── package.json                 # Dependências e scripts do backend
│   └── tsconfig.json                # Configurações TypeScript
│
├── frontend/                        # Aplicação React com Vite
│   ├── public/                      # Arquivos estáticos (ícones, imagens)
│   ├── src/
│   │   ├── components/              # Componentes React reutilizáveis
│   │   ├── pages/                   # Páginas da aplicação (rotas principais)
│   │   ├── services/                # Funções para interação com a API backend
│   │   ├── contexts/                # Contextos React para gerenciamento de estado global
│   │   ├── hooks/                   # Hooks personalizados React
│   │   ├── assets/                  # Imagens, ícones específicos do frontend
│   │   ├── App.tsx                  # Componente principal da aplicação
│   │   └── main.tsx                 # Ponto de entrada do React
│   ├── .env.example                 # Exemplo de variáveis de ambiente do frontend
│   ├── package.json                 # Dependências e scripts do frontend
│   ├── tailwind.config.js           # Configurações do Tailwind CSS
│   └── tsconfig.json                # Configurações TypeScript
│
└── README.md                        # Este arquivo
```

---

## 📊 Modelagem de Dados

A modelagem de dados é fundamental para a estrutura do sistema. As principais entidades e seus relacionamentos serão gerenciados pelo Prisma ORM e armazenados no PostgreSQL.

| Entidade | Descrição | Atributos Chave (Exemplos) |
|----------|-----------|----------------------------|
| **Usuario** | Representa clientes e prestadores de serviço. Contém informações de autenticação e perfil. | `id`, `nome`, `email`, `senhaHash`, `tipo` (`cliente`/`prestador`), `telefone`, `endereco` |
| **Servico** | Define os tipos de serviços que um prestador pode oferecer. | `id`, `nome`, `descricao`, `preco`, `duracaoEstimada` |
| **PrestadorServico** | Informações adicionais específicas para prestadores de serviço. | `id`, `usuarioId`, `bio`, `areaAtuacao` |
| **Disponibilidade** | Slots de tempo que um prestador está disponível para agendamentos. | `id`, `prestadorId`, `data`, `horaInicio`, `horaFim`, `disponivel` (booleano) |
| **Agendamento** | Registro de um serviço agendado entre um cliente e um prestador. | `id`, `clienteId`, `prestadorId`, `servicoId`, `data`, `horaInicio`, `horaFim`, `status` (`pendente`/`confirmado`/`cancelado`), `observacoes` |
| **Avaliacao** | Feedback de clientes sobre os serviços prestados e prestadores. | `id`, `agendamentoId`, `clienteId`, `prestadorId`, `nota`, `comentario`, `dataAvaliacao` |

---

## 🚀 Como Executar

Para configurar e executar o **Sistema de Agendamento** localmente, siga os passos abaixo. Certifique-se de ter Node.js (versão 18+) e um servidor PostgreSQL instalados e configurados em sua máquina.

### Pré-requisitos

-   Node.js (v18+)
-   npm ou Yarn
-   PostgreSQL (v14+)
-   Um editor de texto/IDE (ex: VS Code)

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# o
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

---

## 👥 Equipe

Este projeto foi desenvolvido por:

| Nome | Responsabilidade |
|------|------------------|
| Heitor Reis | Co-desenvolvedor |
| Caio Rosa | Co-desenvolvedor |

Professor: Luiz Carlos Camargo

