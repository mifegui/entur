Planejamento de Testes                 Chatbot Tutor de Idiomas
1. Introdução
O sistema é um site Svelte onde o usuário conversa com um chatbot integrado à API do Gemini. O chatbot conduz prática de idiomas, realiza correções breves e sugestões de vocabulário.
Aqui é descrita a arquitetura adotada e apresentado o Plano de Execução dos Testes, cobrindo modelo de IA, regras/algoritmos de orquestração e interfaces de usuário, garantindo aderência aos Requisitos Funcionais (RF) e Não Funcionais (RNF).
2. Arquitetura Proposta (Svelte + Gemini)
2.1 Diagrama

2.2 Explicação das etapas
UI (Svelte): chat responsivo, acessível (WCAG), seleção de idioma e nível (RF-05/06, RNF-12/13).
Endpoint leve (/api/chat): protege a chave do Gemini, aplica rate limit e normaliza prompts/respostas (RNF-06/07/18).
API do Gemini: gera respostas, correções breves (com explicação curta) e sugestões de vocabulário; produz exercícios quando solicitado (RF-08/09/10/13/14).
Portal de Dados Abertos: busca on-demand e exibição de links relevantes (RF-14/23).
Privacidade e segurança: TLS, minimização de dados, sem persistir conversas no backend no MVP (RNF-06/09/10/11).

3. Plano de Execução dos Testes
3.1 Testes do Modelo de IA (saídas do Gemini)
Datasets de avaliação (goldens): quatro conjuntos pequenos e versionados: (A) correção breve, (B) vocabulário contextual, (C) exercícios (3–5 itens + gabarito), (D) coerência de conversa/persona/tópico/nível.
Tratamento: limpeza, anonimização, etiquetação de erro→correção, marcação de nível e tópico.
Procedimentos: execução offline pré-release (100–300 itens) + amostragem humana (5–10%).
Métricas de aceite:
Correção correta ≥ 85%; falso positivo < 5% (RF-09/14).
Explicação ≤ 30 palavras em ≥ 95% (RF-14).
Vocabulário: 1–2 alternativas úteis em ≥ 90% (RF-10).
Exercícios válidos + gabarito consistente ≥ 95% (RF-13).
Segurança: 0 saídas tóxicas/bloqueadas (RF-19).
Latência p95 (UI→Gemini) ≤ 3 s (RNF-01).
3.2 Testes de Integração App ↔ Modelo
Estratégia: testes de contrato (schema), integração (prompts/saídas), resiliência (timeouts, 5xx), latência e moderação.
Casos de teste:
TI-01 Correção breve retorna trechos corrigidos + explicação curta + 1–2 alternativas (RF-09/14/10).
TI-02 Nível (A1/B1/C1) altera complexidade lexical/sintática (RF-06).
TI-03 Tópico/persona corretos na abertura (RF-07/08/13).
TI-04 Exercícios on-demand com 3–5 itens e gabarito (RF-13).
TI-05 Moderação bloqueia entrada proibida (RF-19; RNF-22).
TI-06 Latência p95 ≤ 3 s sob 50 chamadas concorrentes (RNF-01).
TI-07 Rate limit para anônimo com 429 amigável (RF-21; RNF-18).
TI-08 Timeouts do Gemini geram fallback/mensagem segura (resiliência).
3.3 Testes de Interação Usuário ↔ Sistema
Estratégia: E2E funcional + usabilidade + acessibilidade (WCAG 2.2 AA) + i18n + offline limitado.
Casos de teste:
TU-01 Início de conversa em ≤ 3 cliques (RNF-12).
TU-02 Seleção de idioma/nível persiste na sessão e afeta resposta (RF-05/06).
TU-03 Correções não intrusivas com explicação curta (RF-09/14).
TU-04 Vocabulário: botão “ver alternativas” (RF-10).
TU-05 Exercícios: gerar, responder e ver gabarito (RF-13).
TU-06 Materiais abertos: links com fonte e data (RF-14/23).
TU-07 Acessibilidade: teclado total, foco visível, ARIA, contraste AA (RNF-13).
TU-08 Offline limitado: rascunho e reenvio ao reconectar (RNF-15).
TU-09 HTTPS e ausência de conteúdo misto/XSS refletido (RNF-06/07).
TU-10 Indicador “IA em uso” e aviso de limitações (RNF-22).
Critério geral de aceite: 0 bloqueadores; ≤ 3 médios resolvidos antes da entrega; metas de latência e WCAG AA cumpridas.
4. Tabela de Responsáveis
Atividade Principal
Descrição
Responsável
Entregável
Planejamento e Coordenação do Projeto
Organização geral das etapas, consolidação de requisitos, acompanhamento do cronograma e validação das entregas finais.
Vinícius Augusto
Documento final consolidado e plano de execução validado.
Desenvolvimento da Interface e Experiência do Usuário
Implementação da interface Svelte, design do chatbot, acessibilidade, usabilidade e integração com o endpoint da API.
Eric Miranda
Interface web funcional e testada, com chat interativo.
Integração e Comunicação com a API do Gemini
Configuração do endpoint /api/chat, chamadas seguras à API do Gemini, tratamento das respostas e integração com o frontend.
Gustavo Lorenzo
Backend leve funcional e integração completa com o modelo de IA.
Testes, Validação e Documentação Técnica
Planejamento e execução dos testes do modelo, integração e interação; registro dos resultados e criação da documentação final.
Leonardo Kamei
Relatórios de testes e documentação final para entrega.



Especificação de Publicação e Roadmap
Software: Tutor de Idiomas (Time 2)
Alunos: Eric Miranda, Gustavo Lorenzo, Leonardo Kamei, Vinícius Augusto

1. Visão Geral
Este documento descreve a estratégia de publicação (deploy) e o roadmap de evolução para o software "Tutor de Idiomas". A estratégia prioriza plataformas que oferecem tiers gratuitos robustos ("no cost"), alinhando-se aos requisitos do projeto, e utiliza a arquitetura base (SvelteKit + API Gemini) definida pela equipe.

2. Especificação de Publicação (MVP)
2.1. Plataforma de Publicação (Hosting)
Plataforma Principal Recomendada: Vercel
Descrição: Vercel é uma plataforma de nuvem otimizada para frameworks de frontend modernos, como o SvelteKit.

Justificativa (Custo Zero): O plano "Hobby" (gratuito) da Vercel é ideal para este projeto. Ele oferece:
Hospedagem de sites estáticos (frontend SvelteKit) via CDN global.
Execução de Funções Serverless (necessárias para o endpoint /api/chat que protege a chave da API Gemini).
Integração contínua (CI/CD) direta com repositórios Git (GitHub, GitLab), automatizando a publicação a cada atualização.

Como Funciona: O Vercel detecta automaticamente o SvelteKit no repositório, compila o frontend e implantará o endpoint /api/chat como uma função serverless, tudo sem necessidade de configuração manual de servidores.

Plataformas Alternativas (Também com Tiers Gratuitos):
Netlify: Similar ao Vercel, oferece hospedagem estática e funções serverless (Netlify Functions) em seu plano gratuito.
Azure Static Web Apps: Solução da Microsoft (Azure) que combina hospedagem de arquivos estáticos com Funções Azure (serverless) integradas, possuindo um plano gratuito.
Firebase Hosting + Google Cloud Functions: O Firebase (Google Cloud) pode hospedar os arquivos estáticos, e o endpoint /api/chat pode ser publicado como uma Cloud Function.
2.2. Plataforma de IA (Modelo de Linguagem)
A aplicação não hospeda seu próprio modelo, mas consome um serviço de terceiros.

Tecnologia: Google Gemini API (acessada via Google AI Studio ou Vertex AI).

Publicação e Custo: Esta é uma API externa. O "custo" está associado ao uso (quantidade de tokens processados), não à publicação.

Gerenciamento de Chaves: Conforme a arquitetura definida, a chave da API Gemini NÃO ficará exposta no frontend. Ela será armazenada de forma segura como uma Variável de Ambiente na plataforma de publicação (Vercel, Netlify, etc.). O endpoint serverless /api/chat será o único a ter acesso a essa chave, agindo como um proxy seguro.

3. Roadmap de Evolução (Trabalhos Futuros)
O roadmap descreve a evolução do sistema desde o MVP atual até as duas entregas futuras.

3.1. Versão 1 (MVP - Entrega Atual)
Foco: Funcionalidade principal de conversação e correção.

Recursos: Interface de chat em SvelteKit, seleção de idioma/nível, integração direta com a API Gemini (via endpoint proxy), correções breves, sugestões de vocabulário e links para o Portal de Dados Abertos.

Limitação: A aplicação é stateless (sem memória). O histórico de conversa não é salvo entre as sessões (conforme documento "Tabela de Responsáveis").

3.2. Versão 2 (Próxima Entrega - Foco em Personalização e Persistência)
Foco: Tornar a experiência do usuário persistente e personalizada.

Tecnologias Planejadas:
Autenticação: Implementação de login (ex: Google, Email) utilizando Firebase Authentication (serviço gratuito da Google Cloud).
Banco de Dados: Adição de um banco de dados NoSQL para salvar o histórico de conversas e preferências do usuário (nível, idioma).
Tecnologia Recomendada: Firebase Firestore (plataforma de banco de dados serverless da Google Cloud, com um generoso tier gratuito).

Novos Recursos:
Histórico de chat salvo e recuperado por usuário.
A IA (Gemini) passará a receber o histórico anterior para manter o contexto entre sessões.
Início de um perfil de aprendizado do usuário.

3.3. Versão 3 (Entrega Futura - Foco em Interatividade e RAG)
Foco: Interatividade avançada e respostas baseadas em conhecimento profundo (RAG).

Tecnologias Planejadas:
RAG (Retrieval-Augmented Generation): Em vez de apenas linkar para o Portal de Dados Abertos, esta versão irá ingerir esses materiais.
Banco de Dados Vetorial: Utilização de uma solução de embeddings (ex: Pinecone tier gratuito, ou funções de busca vetorial em bancos como Firestore/Supabase) para encontrar os materiais mais relevantes.
APIs de Mídia: APIs de Speech-to-Text (STT) e Text-to-Speech (TTS) (ex: Google Cloud Speech/Text-to-Speech).

Novos Recursos:
Tutor por Voz: O usuário poderá conversar com o tutor usando a voz.
Respostas Contextuais (RAG): O Gemini usará os documentos do Portal de Dados Abertos para fornecer respostas e exercícios baseados em materiais específicos.
Planos de Estudo Proativos: A IA analisará o histórico (V2) e sugerirá ativamente tópicos de estudo ou revisões.

