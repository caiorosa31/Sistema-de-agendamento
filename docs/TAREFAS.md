# 📋 Organização de Tarefas - Sistema de Agendamento

## 👥 Divisão da Equipe

| Membro | Foco Principal | Tecnologias |
|--------|----------------|-------------|
| **Caio Rosa** | Backend | Node.js, Express, Prisma, MySQL |
| **Heitor Reis** | Frontend | React.js, Axios, CSS |

---

## 🗓️ Sprint 1 - Setup e Autenticação (Semana 1)

### Caio - Backend
- [ ] Inicializar projeto Node.js com Express
- [ ] Configurar Prisma e conexão com MySQL
- [ ] Criar schema do banco (Usuário, Agenda, Agendamento, Log)
- [ ] Executar migrations
- [ ] Implementar CRUD básico de Usuários
- [ ] Implementar autenticação com JWT
- [ ] Criar middleware de autenticação
- [ ] Criar middleware de autorização (Cliente, Prestador, Admin)

### Heitor - Frontend
- [ ] Inicializar projeto React (Vite ou CRA)
- [ ] Configurar estrutura de pastas
- [ ] Criar layout base (Header, Footer, Layout)
- [ ] Configurar React Router
- [ ] Criar tela de Login
- [ ] Criar tela de Cadastro
- [ ] Implementar contexto de autenticação
- [ ] Proteger rotas privadas

### Entregáveis Sprint 1
- [ ] Projeto configurado
- [ ] Cadastro funcionando
- [ ] Login funcionando end-to-end
- [ ] Controle de acesso por tipo de usuário

---

## 🗓️ Sprint 2 - Gestão de Agenda (Semana 2)

### Caio - Backend
- [ ] Implementar CRUD de Agenda
  - [ ] Criar horário disponível
  - [ ] Listar horários do prestador
  - [ ] Remover horário
- [ ] Implementar validações
- [ ] Garantir que apenas o prestador gerencie sua agenda

### Heitor - Frontend
- [ ] Criar página "Minha Agenda"
- [ ] Criar formulário para adicionar horários
- [ ] Criar listagem de horários disponíveis
- [ ] Implementar remoção de horários
- [ ] Conectar com API (Axios)

### Entregáveis Sprint 2
- [ ] Prestador consegue cadastrar horários
- [ ] Horários aparecem corretamente no sistema

---

## 🗓️ Sprint 3 - Sistema de Agendamento (Semana 3)

### Caio - Backend
- [ ] Implementar listagem de prestadores
- [ ] Implementar listagem de agenda pública
- [ ] **Implementar transação de agendamento (CRÍTICO)**
  - [ ] Verificar disponibilidade com lock
  - [ ] Criar agendamento
  - [ ] Bloquear horário
  - [ ] Registrar log
  - [ ] Rollback em caso de erro
- [ ] Implementar listagem de agendamentos
- [ ] Implementar cancelamento de agendamento

### Heitor - Frontend
- [ ] Criar página de listagem de prestadores
- [ ] Criar página de perfil do prestador
- [ ] Criar componente de calendário
- [ ] Implementar fluxo de agendamento:
  - [ ] Selecionar data e horário
  - [ ] Confirmar agendamento
  - [ ] Exibir feedback de sucesso/erro
- [ ] Criar página "Meus Agendamentos"

### Entregáveis Sprint 3
- [ ] Sistema de agendamento funcionando
- [ ] Transação garantindo que não existam conflitos

---

## 🗓️ Sprint 4 - Cancelamentos e Logs (Semana 4)

### Caio - Backend
- [ ] Implementar cancelamento com atualização de status
- [ ] Liberar horário automaticamente após cancelamento
- [ ] Implementar registro de logs
- [ ] Criar endpoint para visualizar logs (Admin)
- [ ] Implementar tratamento global de erros

### Heitor - Frontend
- [ ] Implementar botão de cancelamento
- [ ] Exibir status do agendamento (Pendente, Confirmado, Cancelado)
- [ ] Criar página de visualização de logs (Admin)
- [ ] Melhorar feedback visual (loading e mensagens)

### Entregáveis Sprint 4
- [ ] Cancelamento funcionando corretamente
- [ ] Logs registrados
- [ ] Sistema estável

---

## 🗓️ Sprint 5 - Painel Administrativo (Semana 5)

### Caio - Backend
- [ ] Criar endpoints administrativos
  - [ ] GET /api/admin/usuarios
  - [ ] PUT /api/admin/usuarios/:id
  - [ ] DELETE /api/admin/usuarios/:id
- [ ] Implementar dashboard com estatísticas
- [ ] Garantir que apenas Admin acesse rotas administrativas

### Heitor - Frontend
- [ ] Criar Dashboard Admin
- [ ] Criar tabela de usuários
- [ ] Implementar filtros e busca
- [ ] Implementar proteção de rotas admin

### Entregáveis Sprint 5
- [ ] Painel administrativo funcional
- [ ] Gestão de usuários funcionando

---

## 📊 Quadro Kanban

### 📥 Backlog
- Sistema de avaliações
- Histórico detalhado de alterações
- Relatórios em PDF

### 🚧 Em Progresso

(Atualizar durante o desenvolvimento)

### 👀 Em Revisão

(Atualizar durante o desenvolvimento)

### ✅ Concluído

(Atualizar durante o desenvolvimento)

---

## 🎯 Critérios de Aceite por Feature

### Agendamento
- [ ] Sistema verifica disponibilidade antes de confirmar
- [ ] Horário é bloqueado após confirmação
- [ ] Dois usuários não conseguem reservar o mesmo horário
- [ ] Em caso de erro, nenhuma alteração é salva
- [ ] Log da operação é registrado

### Cancelamento
- [ ] Usuário pode cancelar agendamento existente
- [ ] Status é atualizado corretamente
- [ ] Horário volta a ficar disponível
- [ ] Log é registrado

---

## ⚠️ Riscos Identificados

| Risco | Impacto | Mitigação |
|-------|---------|-----------|
| Conflito de horários | Alto | Implementar transação com lock |
| Problemas de autenticação | Alto | Testar middleware e tokens |
| Conflito de merge | Médio | PRs pequenos e commits frequentes |
| Erros de concorrência | Alto | Testar múltiplos agendamentos simultâneos |