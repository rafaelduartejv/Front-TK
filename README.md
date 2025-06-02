# Tokio Frontend

Este é o aplicativo frontend do sistema Tokio, construído com Angular. Ele fornece uma interface de usuário para autenticação (login e registro) e gerenciamento de endereços (operações CRUD). A aplicação interage com uma API backend, mas nem todas as funcionalidades do backend foram implementadas, limitando alguns recursos ao que atualmente é suportado pela API.

## Sumário

* Visão Geral do Projeto
* Funcionalidades
* Status do Backend
* Requisitos
* Instalação
* Execução da Aplicação
* Estrutura do Projeto
* Testes
* Problemas Conhecidos
* Contribuição
* Licença

## Visão Geral do Projeto

O Tokio Frontend é uma aplicação de página única (SPA) desenvolvida para permitir que usuários:

* Se registrem e façam login no sistema.
* Gerenciem seus endereços (criar, ler, atualizar, deletar).
* Naveguem por um painel simples com acesso ao gerenciamento de endereços.

A aplicação é construída com Angular 18, utilizando componentes independentes, Bootstrap para estilização, e RxJS para requisições HTTP. Ela se comunica com uma API backend em [http://localhost:8080](http://localhost:8080).

## Funcionalidades

* **Login**: Usuários fazem login com e-mail e senha via POST /auth/login. Ao autenticar com sucesso, um token JWT é armazenado no localStorage e o usuário é redirecionado para a página inicial.
* **Registro**: Registro com nome, e-mail e senha via POST /api/users/register. Após o registro, o usuário é redirecionado para a página de login.
* **Gerenciamento de Endereços**: CRUD completo via GET/POST/PUT/DELETE /api/addresses. É possível adicionar, editar, listar e deletar endereços.
* **Rotas Protegidas**: As rotas / (home) e /enderecos são protegidas por AuthGuard, exigindo token válido.
* **Interface Responsiva**: Estilização com Bootstrap para uma interface limpa e amigável.

## Status do Backend

**Importante**: A API backend não está completamente implementada, o que afeta a funcionalidade do frontend. Os seguintes endpoints estão assumidos como disponíveis e testados:

* POST /auth/login: Autentica usuários e retorna JWT.
* POST /api/users/register: Registra novos usuários.
* GET /api/addresses: Lista endereços.
* POST /api/addresses: Cria um novo endereço.
* PUT /api/addresses/\:id: Atualiza endereço existente.
* DELETE /api/addresses/\:id: Remove um endereço.

Outros endpoints como /api/users/me (dados do perfil), /api/users/promote, /api/users/demote (gerenciamento de roles) **não estão implementados**, portanto:

* Funcionalidades baseadas em roles (admin vs. usuário) foram removidas do frontend.
* Gerenciamento de perfil foi excluído.
* Outros recursos dependentes do backend não são suportados.

Certifique-se de que o backend está em execução e configurado com os endpoints listados antes de usar o frontend.

## Requisitos

* **Node.js**: Versão 18.x ou superior
* **Angular CLI**: Versão 18.x (npm install -g @angular/cli)
* **API Backend**: Em execução em [http://localhost:8080](http://localhost:8080) com endpoints suportados
* **Git**: Para clonar o repositório

## Instalação

Clone o Repositório:

```bash
git clone <url-do-repositorio>
cd tokio-frontend
```

Instale as dependências:

```bash
npm install
```

Configure o Ambiente:

A aplicação assume que a API está em [http://localhost:8080](http://localhost:8080). Atualize o `baseUrl` em `src/app/services/auth.service.ts` e `apiUrl` em `src/app/services/endereco.service.ts` e `src/app/services/usuario.service.ts` caso o backend esteja hospedado em outro local.

## Execução da Aplicação

Inicie o Backend:

Certifique-se de que o backend está em execução em [http://localhost:8080](http://localhost:8080) com os endpoints necessários.

Execute o Frontend:

```bash
ng serve
```

A aplicação estará disponível em [http://localhost:4200](http://localhost:4200).

Acesse a Aplicação:
Abra o navegador e acesse [http://localhost:4200](http://localhost:4200)
Use as páginas /login ou /registrar para começar.

## Estrutura do Projeto

```
src/app/
├── login/
│   ├── login.component.ts     # Página de login
│   ├── login.component.html   # Template
│   ├── login.component.css    # Estilos
├── pages/
│   ├── enderecos/
│   │    ├── enderecos.component.ts  # CRUD de endereços
│   │    ├── enderecos.component.css # Estilos
│   ├── home/
│       ├── home.component.ts      # Painel principal
│       ├── home.component.css     # Estilos
├── registro/
│   ├── registrar.component.ts # Registro de usuário
│   ├── registrar.component.html # Template
│   ├── registrar.component.css  # Estilos
├── services/
│   ├── auth.service.ts        # Login/logout
│   ├── endereco.service.ts    # CRUD de endereço
│   ├── usuario.service.ts     # Registro de usuário
├── app.component.ts           # Componente raiz
├── app.routes.ts              # Rotas da aplicação
├── auth.guard.ts          # Proteção de rotas
├── auth.interceptor.ts    # Adiciona JWT nas requisições
```

## Testes

**Registro:**

* Acesse /registrar
* Registre um usuário (ex: nome: "João Silva", email: "[joao@test.com](mailto:joao@test.com)", senha: "123456")
* Verifique redirecionamento para /login após 2 segundos com mensagem de sucesso

**Login:**

* Acesse com credenciais válidas (ex: [joao@test.com](mailto:joao@test.com)/123456 ou [admin@tokio.com](mailto:admin@tokio.com)/admin123)
* Verifique redirecionamento para a página inicial (/)

**Gerenciamento de Endereços:**

* Acesse /enderecos
* Crie um endereço (ex: CEP: 12345-678, Número: 100, Complemento: Apt 101)
* Edite o endereço (ex: mude o número para 200)
* Delete o endereço
* Verifique mensagens de erro para operações falhas

**Logs no Console:**

* Verifique logs como:

  * Resposta completa: {token: "..."}
  * Navegação bem-sucedida: true
  * Erro no login: ...
  * Erro ao carregar endereços: ...

## Problemas Conhecidos

* **Dependência do Backend**: A aplicação depende totalmente do backend. Se os endpoints estiverem indisponíveis ou com falhas, mensagens genéricas serão exibidas (ex: "Erro ao carregar endereços").
* **Sem Gerenciamento de Roles**: Recursos como distinção admin vs. usuário não estão disponíveis.
