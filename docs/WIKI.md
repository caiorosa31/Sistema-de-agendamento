# 📚 Wiki - Sistema de Agendamento

## Sumário

1. [Visão Geral](#visão-geral)
2. [Casos de Uso](#casos-de-uso)
3. [Detalhamento Técnico](#detalhamento-técnico)
4. [Guia de Contribuição](#guia-de-contribuição)

---

## Visão Geral

### O Problema

O agendamento manual de serviços pode gerar diversos problemas, como:

- Dificuldade para encontrar horários disponíveis  
- Conflitos de agenda  
- Falta de organização  
- Perda de informações importantes  

Clientes têm dificuldade para marcar serviços de forma prática, enquanto prestadores enfrentam desafios para organizar seus horários e evitar sobreposição de atendimentos.

### A Solução

O Sistema de Agendamento oferece uma plataforma centralizada que:

- Conecta clientes e prestadores  
- Permite visualizar horários disponíveis em tempo real  
- Evita conflitos de agenda  
- Organiza todos os agendamentos  
- Garante integridade dos dados através de transações no banco  

---

## Casos de Uso

### UC01 - Cadastro de Usuário

**Ator:** Cliente ou Prestador  

**Pré-condição:** Nenhuma  

**Fluxo Principal:**

1. Usuário acessa a tela de cadastro  
2. Preenche nome, email, senha e tipo de conta  
3. Clica em "Cadastrar"  
4. Sistema valida os dados  
5. Sistema salva no banco  
6. Sistema confirma cadastro  

**Fluxo Alternativo - Dados inválidos:**

- Sistema exibe mensagem de erro  
- Usuário corrige as informações  

---

### UC02 - Criar Agendamento

**Ator:** Cliente  

**Pré-condições:**

- Usuário autenticado  
- Prestador cadastrado  

**Fluxo Principal:**

1. Cliente acessa lista de prestadores  
2. Seleciona um prestador  
3. Visualiza agenda disponível  
4. Escolhe data e horário  
5. Confirma agendamento  
6. Sistema inicia transação  
7. Sistema verifica disponibilidade  
8. Sistema cria o agendamento  
9. Sistema bloqueia o horário  
10. Sistema confirma a operação  

**Fluxo Alternativo - Horário indisponível:**

- Sistema identifica conflito  
- Cancela a transação  
- Exibe mensagem de horário indisponível  

---

### UC03 - Gerenciar Agenda (Prestador)

**Ator:** Prestador  

**Pré-condição:** Usuário autenticado como Prestador  

**Fluxo Principal:**

1. Prestador acessa painel  
2. Define dias e horários disponíveis  
3. Salva agenda  
4. Sistema registra no banco  

---

### UC04 - Cancelar Agendamento

**Ator:** Cliente ou Prestador  

**Pré-condição:** Agendamento existente  

**Fluxo Principal:**

1. Usuário acessa seus agendamentos  
2. Seleciona um agendamento  
3. Clica em cancelar  
4. Sistema atualiza status  
5. Sistema libera o horário na agenda  

---

### UC05 - Gestão Administrativa

**Ator:** Administrador  

**Pré-condição:** Usuário autenticado como Admin  

**Fluxo Principal:**

1. Admin acessa painel administrativo  
2. Visualiza usuários cadastrados  
3. Pode editar ou desativar contas  
4. Pode visualizar agendamentos  
5. Sistema registra ações em log  

---

## Detalhamento Técnico

### Transação de Agendamento (Conceito)

O sistema utiliza transações no banco de dados para garantir que:

- O horário esteja realmente disponível  
- O agendamento seja criado corretamente  
- O horário seja bloqueado  
- Não ocorram conflitos simultâneos  

Se qualquer etapa falhar, toda a operação é cancelada (ROLLBACK).  
Se tudo ocorrer corretamente, a operação é confirmada (COMMIT).

---

### Principais Entidades do Sistema

- **Usuário** → Cliente, Prestador ou Admin  
- **Agenda** → Horários disponíveis do prestador  
- **Agendamento** → Reserva feita pelo cliente  
- **Log** → Registro de ações importantes  

---

### Endpoints da API

#### Autenticação

| Método | Rota | Descrição |
|--------|------|-----------|
| POST | `/api/auth/register` | Registrar usuário |
| POST | `/api/auth/login` | Login |
| GET | `/api/auth/me` | Dados do usuário logado |

#### Agendamentos

| Método | Rota | Descrição |
|--------|------|-----------|
| GET | `/api/agendamentos` | Listar agendamentos |
| GET | `/api/agendamentos/:id` | Detalhar agendamento |
| POST | `/api/agendamentos` | Criar agendamento |
| PATCH | `/api/agendamentos/:id/cancelar` | Cancelar agendamento |

#### Agenda do Prestador

| Método | Rota | Descrição |
|--------|------|-----------|
| GET | `/api/agenda` | Listar horários |
| POST | `/api/agenda` | Criar horário disponível |
| DELETE | `/api/agenda/:id` | Remover horário |

#### Admin

| Método | Rota | Descrição |
|--------|------|-----------|
| GET | `/api/admin/usuarios` | Listar usuários |
| PUT | `/api/admin/usuarios/:id` | Atualizar usuário |
| DELETE | `/api/admin/usuarios/:id` | Desativar usuário |
| GET | `/api/admin/logs` | Visualizar logs |

---

## Glossário

| Termo | Definição |
|-------|-----------|
| **Cliente** | Usuário que agenda um serviço |
| **Prestador** | Usuário que oferece serviços |
| **Admin** | Usuário com acesso total ao sistema |
| **Agendamento** | Reserva de um horário |
| **Agenda** | Horários disponíveis de um prestador |
| **Transação** | Operação segura no banco que evita inconsistências |
| **Log** | Registro de ações importantes |

---

## Guia de Contribuição

1. Faça um fork do projeto  
2. Crie uma branch para sua feature (`feature/nome-da-feature`)  
3. Faça commits claros e organizados  
4. Abra um Pull Request descrevendo as alterações  