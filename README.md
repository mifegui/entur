# English Tutor - MVP Chatbot

Um chatbot simples para prática de conversação em inglês com correções automáticas em tempo real.

## Funcionalidades

- ✅ Chat de texto para conversar em inglês
- ✅ Correções automáticas quando você comete erros
- ✅ Interface web responsiva (funciona em desktop e mobile)
- ✅ Conversação natural mantendo o contexto

## Tecnologias

- **Frontend**: SvelteKit (Svelte 5)
- **Backend**: SvelteKit endpoints
- **IA**: Google Gemini API
- **Hospedagem**: Vercel (tier gratuito)

## Setup Local

### 1. Obter chave da API Gemini

1. Acesse: https://makersuite.google.com/app/apikey
2. Faça login com sua conta Google
3. Clique em "Create API Key"
4. Copie a chave gerada

### 2. Configurar variáveis de ambiente

```bash
# Copie o arquivo de exemplo
cp .env.example .env

# Edite o arquivo .env e adicione sua chave:
# GEMINI_API_KEY=sua_chave_aqui
```

### 3. Instalar dependências

```bash
npm install
```

### 4. Rodar em desenvolvimento

```bash
npm run dev
```

A aplicação estará disponível em: http://localhost:5173

## Como usar

1. Abra a aplicação no navegador
2. Digite uma mensagem em inglês no campo de texto
3. Pressione Enter ou clique em "Send"
4. O chatbot responderá e corrigirá seus erros quando necessário
5. Use o botão "Clear Chat" para começar uma nova conversa

## Estrutura do Projeto

```
/src
  /routes
    /api
      /chat
        +server.js          # Endpoint que se conecta ao Gemini
    +page.svelte           # Página principal
    +layout.svelte         # Layout global
  /lib
    /components
      Chat.svelte          # Componente principal do chat
      Message.svelte       # Componente de mensagem individual
  app.css                  # Estilos globais
  app.html                 # Template HTML base
```

## Deploy no Vercel

### 1. Criar conta no Vercel

1. Acesse: https://vercel.com
2. Faça login com sua conta GitHub

### 2. Fazer deploy

```bash
# Instale o CLI do Vercel (opcional)
npm i -g vercel

# Faça deploy
vercel
```

Ou conecte seu repositório GitHub diretamente no painel do Vercel.

### 3. Configurar variável de ambiente

No painel do Vercel:
1. Acesse seu projeto
2. Vá em "Settings" → "Environment Variables"
3. Adicione:
   - Nome: `GEMINI_API_KEY`
   - Valor: sua chave da API Gemini

## Limitações do MVP

Este é um MVP mínimo. **NÃO** inclui:

- Múltiplos idiomas (apenas inglês)
- Níveis de proficiência
- Autenticação de usuário
- Histórico de conversas salvo
- Exercícios gerados
- Estatísticas de progresso

Essas funcionalidades podem ser adicionadas em versões futuras.

## Custos

**Total: R$ 0,00**

- Google Gemini API: Gratuito até 60 requisições/minuto
- Vercel Hosting: Tier "Hobby" gratuito
- GitHub: Gratuito

## Problemas Comuns

### Erro: "GEMINI_API_KEY is not defined"

Certifique-se de que:
1. O arquivo `.env` existe na raiz do projeto
2. A chave está no formato: `GEMINI_API_KEY=sua_chave_aqui`
3. Não há espaços antes ou depois do `=`
4. Você reiniciou o servidor após criar o `.env`

### Erro: "Failed to get response from AI"

Possíveis causas:
1. Chave da API inválida
2. Limite de requisições atingido (60/min)
3. Problemas de conexão com a internet

## Licença

MIT
