# 📘 Projeto Milkflix — Style Guide

Este guia define o padrão de organização, nomenclatura e estrutura para o projeto **Milkflix**, tanto no **frontend React** quanto no **backend Node.js/Express**.

---

## 📁 Estrutura Geral de Pastas

```
/project-root
|── backend
|   |── src/
|   |   ├── controllers/
|   |   ├── routes/
|   |   ├── services/
|   |   ├── models/
|   |   ├── config/
|   |   └── app.js
|   └── tests/
|
|── frontend/
|   |── src/
|   |   ├── pages/
|   |   ├── components/
|   |   ├── services/
|   |   └── App.js
|   └── public/
```

---

## 🔆 Frontend (React)

### 📄 Nome de Arquivos

- Componentes: `UserCard.jsx`, `LoginForm.jsx`
- Páginas: `LoginPage.jsx`, `DashboardPage.jsx`
- CSS Modules: `UserCard.module.css`

### 💡 Funções e Componentes

- Componentes React: `PascalCase`
- Hooks personalizados: `useCamelCase`
- Funções utilitárias/API: `camelCase`

### 🔌 Serviços/API

- Local: `/frontend/services`
- Arquivos: `authService.js`, `userService.js`
- Funções: `sendRecoveryEmail`, `getUserProfile`

### 🥪 Testes (Sugestão)

- Diretório: `__tests__` dentro da pasta do componente ou serviço
- Exemplo de nome: `LoginForm.test.jsx`

---

## 📈 Backend (Node.js/Express)

### 📄 Nome de Arquivos

- Use `kebab-case`
  - `user-controller.js`
  - `auth-service.js`
  - `email-service.js`
  - `user-routes.js`

### 💡 Funções e Classes

- Funções: `camelCase`
- Classes (se usadas): `PascalCase`

### 🧱 Estrutura Sugerida

```
/backend
├── controllers/
│   └── user-controller.js
├── routes/
│   └── user-routes.js
├── services/
│   └── email-service.js
├── models/
│   └── user-model.js
└── app.js
```

### 🥪 Testes (Sugestão)

- Diretório: `tests/` na raiz do backend
- Exemplo de nome: `email-service.test.js`

### 🔒 Autenticação e Validações

- Middleware de autenticação em `/middlewares/auth-middleware.js`
- Validações com `express-validator` ou `joi`
- Nome dos arquivos: `auth-middleware.js`, `validate-user.js`

---

## 🔗 Comunicação Frontend <-> Backend

### 🌐 Endpoints REST

- Usar `kebab-case` ou `snake_case`
  ```
  POST /api/forgot-password
  GET  /api/user/profile
  ```

### 📄 Dados JSON

- Usar `camelCase`

```json
{
  "userId": 1,
  "userName": "Maria"
}
```

---

## 📂 Banco de Dados (MySQL)

### 🗂️ Nome de tabelas e colunas

- Tabelas: `snake_case` no plural — ex: `user_profiles`, `user_accounts`
- Colunas: `snake_case` — ex: `user_id`, `created_at`

### 🔑 Chaves e Índices

- PK: `id` (padrão autoincremento)
- FK: `referencia_id` — ex: `user_id`, `account_id`

---

## 🔢 Mensagens de Commit (Conventional Commits)

### ✍️ Prefixos

- `feat:` nova funcionalidade
- `fix:` correção de bug
- `chore:` tarefas menores, sem impacto no código final
- `docs:` alteração na documentação
- `refactor:` refatoramento sem alteração de funcionalidade
- `test:` cria ou altera testes

### 🔹 Exemplo

```
feat: criar página de recuperação de senha
fix: corrigir validação do campo de e-mail
```

---

## ✅ Checklist de Consistência

| Item                                        | OK |
| ------------------------------------------- | -- |
| Arquivos React em PascalCase                | ✅  |
| CSS Modules com o nome do componente        | ✅  |
| Funções em camelCase                        | ✅  |
| Arquivos backend em kebab-case              | ✅  |
| Páginas React em `/pages/`                  | ✅  |
| Componentes reutilizáveis em `/components/` | ✅  |
| Serviços backend em `/services/`            | ✅  |
| Controllers backend em `/controllers/`      | ✅  |
| Testes com sufixo `.test.js/.test.jsx`      | ✅  |
| Tabelas e colunas em snake_case             | ✅  |
| Endpoints REST claros e padronizados        | ✅  |
| Middleware de autenticação centralizado     | ✅  |
| Validações separadas por contexto           | ✅  |
| Commits com padrão `feat/fix/...`            | ✅  |


