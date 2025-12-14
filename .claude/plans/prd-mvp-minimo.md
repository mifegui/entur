# PRD - MVP Mínimo: Chatbot Tutor de Idiomas

## 1. Visão Geral
Um chatbot simples para prática de conversação em inglês, com correções automáticas em tempo real. O usuário conversa livremente e recebe feedback quando comete erros.

## 2. Escopo do MVP Mínimo

### O que ESTÁ incluído:
- Chat de texto simples para conversar em inglês
- Correções automáticas quando o usuário comete erros
- Interface web responsiva e limpa
- Uma única sessão de conversa (sem salvar histórico)

### O que NÃO está incluído (para versões futuras):
- Múltiplos idiomas (apenas inglês)
- Níveis de proficiência (A1, B1, C1)
- Seleção de tópicos ou personas
- Exercícios gerados
- Sugestões de vocabulário
- Portal de dados abertos
- Autenticação de usuário
- Histórico de conversas
- Estatísticas de progresso
- Modo voz

## 3. Requisitos Funcionais Mínimos

**RF-01**: O usuário pode digitar mensagens em inglês no chat.

**RF-02**: O chatbot responde de forma natural, mantendo uma conversa em inglês.

**RF-03**: Quando o usuário comete um erro gramatical ou de vocabulário, o chatbot mostra a correção de forma clara (ex: "Você disse X, mas o correto seria Y").

**RF-04**: As correções são breves e não interrompem o fluxo da conversa.

**RF-05**: O usuário pode limpar a conversa e começar do zero.

## 4. Requisitos Não Funcionais Mínimos

**RNF-01**: Tempo de resposta do chatbot inferior a 5 segundos.

**RNF-02**: Interface funcional em navegadores modernos (Chrome, Firefox, Safari).

**RNF-03**: Design responsivo (funciona em desktop e mobile).

**RNF-04**: Chave da API não exposta no código frontend.

## 5. Arquitetura Simplificada

```
┌─────────────────┐
│   Frontend      │
│   (Svelte)      │
│   - Chat UI     │
└────────┬────────┘
         │
         │ (fetch)
         │
┌────────▼────────┐
│   Backend       │
│  (SvelteKit)    │
│   /api/chat     │
└────────┬────────┘
         │
         │ (API call)
         │
┌────────▼────────┐
│   Gemini API    │
│   (Google)      │
└─────────────────┘
```

### Componentes:

1. **Frontend (Svelte)**
   - Caixa de texto para input
   - Área de exibição das mensagens (usuário e chatbot)
   - Botão para limpar conversa
   - CSS minimalista

2. **Backend (SvelteKit endpoint)**
   - Rota `/api/chat` que recebe a mensagem do usuário
   - Envia para a API do Gemini com um prompt otimizado
   - Retorna a resposta do Gemini para o frontend

3. **API Externa**
   - Google Gemini (gratuito até certo limite de uso)

### Prompt Base para o Gemini:
```
Você é um tutor de inglês. Converse naturalmente com o aluno.
Quando ele cometer erros gramaticais ou de vocabulário, corrija de forma
breve no formato: "✓ Correção: [erro] → [correto]" e continue a conversa.
Mantenha um tom amigável e encorajador.
```

## 6. Plano de Implementação

### Fase 1: Setup Básico (1-2 dias)
- [ ] Criar projeto SvelteKit
- [ ] Configurar API do Gemini (obter chave gratuita)
- [ ] Criar variável de ambiente para a chave

### Fase 2: Backend (1 dia)
- [ ] Criar endpoint `/api/chat`
- [ ] Integrar com Gemini API
- [ ] Testar respostas básicas

### Fase 3: Frontend (2-3 dias)
- [ ] Criar componente de chat
- [ ] Input de mensagem
- [ ] Exibição de histórico (só durante a sessão)
- [ ] Botão limpar conversa
- [ ] CSS responsivo básico

### Fase 4: Testes e Ajustes (1 dia)
- [ ] Testar correções
- [ ] Ajustar prompts se necessário
- [ ] Testar em mobile
- [ ] Deploy no Vercel (gratuito)

**Total estimado: 5-7 dias de trabalho**

## 7. Deploy

**Plataforma**: Vercel (tier gratuito)
- Deploy automático via GitHub
- Variável de ambiente `GEMINI_API_KEY` configurada no painel
- HTTPS por padrão

**Configuração necessária**:
- Conta GitHub (gratuita)
- Conta Vercel (gratuita)
- Chave API Gemini (gratuita até 60 req/min)

## 8. Critérios de Sucesso do MVP

✓ Usuário consegue conversar em inglês com o chatbot
✓ Correções aparecem quando há erros
✓ Interface funciona em mobile e desktop
✓ Deploy feito com sucesso
✓ Sem expor chaves de API

## 9. Roadmap Pós-MVP

**Versão 1.1** (curto prazo):
- Adicionar mais idiomas
- Níveis de proficiência

**Versão 2.0** (médio prazo):
- Autenticação
- Salvar histórico
- Estatísticas de progresso

**Versão 3.0** (longo prazo):
- Exercícios personalizados
- Modo voz
- Gamificação

## 10. Tecnologias Escolhidas

| Componente | Tecnologia | Custo |
|------------|-----------|-------|
| Frontend | SvelteKit | Grátis |
| Backend | SvelteKit (endpoints) | Grátis |
| IA | Google Gemini API | Grátis (com limites) |
| Hospedagem | Vercel | Grátis |
| Repositório | GitHub | Grátis |

**Total de custos: R$ 0,00**

## 11. Estrutura de Arquivos

```
/src
  /routes
    /api
      /chat
        +server.js          # Endpoint backend
    +page.svelte           # Página principal do chat
  /lib
    /components
      Chat.svelte          # Componente de chat
      Message.svelte       # Componente de mensagem individual
/static
  /styles
    global.css             # CSS global
.env                       # Chave da API (não commitar!)
svelte.config.js
vite.config.js
```

## 12. Diferencial deste MVP

**Simplicidade extrema**:
- Uma só API (Gemini)
- Uma só linguagem (inglês)
- Sem banco de dados
- Sem autenticação
- Deploy em 1 clique
- Código limpo e fácil de manter

**Tempo de desenvolvimento**: 1 semana ao invés de 1 mês
**Complexidade técnica**: Baixa
**Curva de aprendizado**: Mínima
**Viabilidade**: 100%
