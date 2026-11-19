# SombraViva — Inteligência Climática Urbana

**FIAP | Global Solution 2026.2 | Engenharia de Software | Mobile Development & IoT**

O **SombraViva** é uma CitizenTech voltada à compreensão da exposição ao calor urbano em Osasco (SP). Esta pasta contém o **aplicativo mobile**, desenvolvido em React Native, TypeScript e Expo. Ele complementa a proposta multidisciplinar da equipe com consulta meteorológica, orientações preventivas, informações de parques e registro local de ocorrências observadas por cidadãos.

> **Escopo e transparência:** o projeto geral da equipe prevê sensores ESP32/DHT22, API em FastAPI, MySQL, processamento de leituras e observatório web. O aplicativo **não se apresenta como integrado a esses sistemas**: hoje consome a Open-Meteo e salva relatos no dispositivo. Leituras de sensores, autenticação da API e eventos de segurança pertencem a outras frentes e só devem ser descritos como integrados após sua implementação e validação.

## Ficha da CitizenTech — proposta comum da equipe

| Campo solicitado | Resposta da equipe |
|---|---|
| **Nome da CitizenTech** | **SombraViva — Inteligência Climática Urbana** |
| **Cidade e bairro** | Osasco (SP), região central. Estudo inicial no Calçadão da Rua Antônio Agú; os locais exatos de futuros sensores dependem de estudo de campo. |
| **Cidadão beneficiado** | Pedestres, trabalhadores expostos ao sol, pessoas idosas, comerciantes e gestores de planejamento urbano. |
| **Problema, em uma frase** | A população e os gestores têm dificuldade de acessar informações contextualizadas e verificáveis sobre exposição ao calor, presença de sombra e vegetação nos espaços públicos. |
| **Como funciona (proposta geral)** | Uma API REST integra leituras de sensores, banco de dados e fontes meteorológicas externas; um observatório web apresenta séries, comparações e limites de proveniência; um painel administrativo registra e investiga eventos de segurança. |
| **O que cada parte faz (proposta geral)** | **SOA:** FastAPI, endpoints REST, autenticação, MySQL, Swagger e migrações. **IoT:** ESP32 e DHT22 (Wokwi), envio de leituras autenticadas, inicialmente simuladas. **Cybersecurity:** proteção de PII, JWT, auditoria e alertas. **Web:** temperaturas e contexto urbano com distinção entre estimativas, dados reais e simulações. **Mobile (este repositório):** consulta ao clima, prevenção, consulta a locais e relatos locais. |
| **Repositório informado pela equipe** | [sprintSoaCyber — SOA/Cybersecurity](https://github.com/JoaoKraideM/sprintSoaCyber). **Não é o link deste repositório Mobile.** |
| **Repositório Mobile** | **[INSERIR LINK DO GITHUB DESTE APLICATIVO]** |
| **Indicador de impacto proposto** | Quantidade de locais com leituras válidas e cobertura temporal do monitoramento por período. Indicadores secundários: estações ativas e utilização do portal. **No mobile**, o número de relatos locais por bairro/categoria pode ser demonstrado, mas não mede cobertura real de sensores. |
| **ODS conectados** | **ODS 3** — Saúde e Bem-Estar; **ODS 11** — Cidades e Comunidades Sustentáveis; **ODS 13** — Ação Contra a Mudança Global do Clima. |

### Contribuição aos ODS

- **ODS 3:** orientações sobre prevenção de efeitos do calor e comunicação de condições meteorológicas.
- **ODS 11:** registros locais de falta de sombra e arborização para informar a discussão sobre qualidade dos espaços urbanos.
- **ODS 13:** acesso contextualizado a informações climáticas e apoio à conscientização; nenhuma redução de emissões é reivindicada.

## Funcionalidades implementadas no aplicativo

1. **Início:** condições meteorológicas aproximadas do centro de Osasco e previsão dos próximos três dias, consultadas pela **API Open-Meteo** (temperatura, sensação térmica, umidade e vento).
2. **Modo offline:** após uma consulta online bem-sucedida, exibe a última consulta armazenada, com indicação de data e horário; **não apresenta valores antigos como medições atuais**. Sem cache prévio, informa indisponibilidade.
3. **Cuidados:** dicas de prevenção e orientações informativas sobre o calor.
4. **Locais:** relação de seis parques de Osasco, com endereços, horários e informações publicadas pela Prefeitura, além de links para mapa e fonte. **Os parques não são anunciados como abrigos climáticos ou pontos de hidratação confirmados.**
5. **Relatos:** cadastro com título, bairro, categoria e descrição; validação de campos; listagem e exclusão por modal personalizado. Os relatos permanecem no dispositivo e **não são enviados ao serviço da equipe ou à Prefeitura**.
6. **Navegação e acessibilidade:** Expo Router, rotas identificadas, contrastes e rótulos de acessibilidade.

**Avisos de calor:** são classificações educativas definidas pelo aplicativo segundo a sensação térmica (abaixo de 30°C, de 30°C a menos de 35°C, 35°C ou mais). **Não representam alertas oficiais da Defesa Civil, limiares clínicos nem previsão de temperatura rua a rua.**

## Tecnologias e arquitetura mobile

| Camada | Tecnologia / implementação |
|---|---|
| Interface | React Native, TypeScript, Expo SDK 58 |
| Navegação | Expo Router |
| Dados meteorológicos | `fetch` + Open-Meteo Forecast API |
| Persistência iOS/Android | `expo-sqlite` (`database/db.ts`) |
| Persistência web | `localStorage` (`database/db.web.ts`) |
| Cache meteorológico | SQLite no mobile; localStorage no navegador |
| Conteúdo de locais | Cadastro local baseado em página pública da Prefeitura de Osasco |

### Origem dos dados e limitações

- **Open-Meteo:** https://open-meteo.com/en/docs. O aplicativo consulta o ponto aproximado de latitude **−23.5329**, longitude **−46.7917**; esses valores **não são leituras de sensores instalados** no Calçadão da Rua Antônio Agú.
- **Prefeitura de Osasco:** https://osasco.sp.gov.br/secretaria-de-meio-ambiente-e-recursos-hidricos/. Endereços, horários e estruturas são informações publicadas que podem mudar; consulte a fonte antes de visitar.
- **Relatos:** dados inseridos localmente pelo próprio usuário. Não são automaticamente corroborados nem compartilhados com outras pessoas.
- **IoT do grupo:** sensores e leituras simuladas de Wokwi devem ser identificados como simulação nas entregas correspondentes.

## Como executar

**Pré-requisitos:** Node.js e npm atualizados, Expo Go compatível com **SDK 58** no iPhone/Android ou emulador configurado.

```bash
npm install
npx expo install --fix
npx expo-doctor
npx expo start --clear
```

- No terminal, pressione `w` para abrir a versão web.
- No iPhone, leia o QR Code usando a câmera e abra no Expo Go, conectado à conta Expo adequada.
- No Android, leia o QR Code com Expo Go ou use `a` com um emulador ativo.
- Caso a conexão local falhe, tente `npx expo start --tunnel` (pode exigir configuração adicional).
- Verificação de TypeScript: `npm run typecheck`.

> O identificador técnico (`slug`, `scheme` e pacote Android) permanece como `climacidadao` para evitar quebrar configurações e dados locais do app previamente testado. **A identidade pública exibida ao usuário é SombraViva.** Não renomear os arquivos/bancos internos sem migração dos registros existentes.

## Estrutura do código

```text
app/                  Rotas: Início, Cuidados, Locais, Relatos e Novo Relato
components/           Layout, navegação e componentes compartilhados
data/                 Informações locais e tema
services/             API Open-Meteo e cache
database/             SQLite mobile e armazenamento web
types/                Tipos TypeScript
assets/screenshots/   Prints reais para a entrega
TESTES_MANUAIS.md     Roteiro de validação
prompts.md            Histórico do uso de IA
```

## Testes e evidências

Marque como concluído **somente após executar no dispositivo correspondente**:

- [ ] Navegação completa entre todas as telas no iPhone ou Android.
- [ ] Consulta online ao clima e previsão de três dias.
- [ ] Modo offline com cache e indicação de data/hora.
- [ ] Lista de locais e links de mapa/fonte.
- [ ] Validação de campos obrigatórios em Novo Relato.
- [ ] Cadastro e exclusão com confirmação por modal.
- [ ] Persistência do relato após fechar e reabrir o app em iOS/Android (**SQLite**).
- [ ] Legibilidade, rolagem, botões e acessibilidade em tela pequena.
- [ ] Capturas de tela incluídas em `assets/screenshots/`.
- [ ] Repositório publicado e link do vídeo adicionado abaixo.

**Observação:** a persistência no navegador usa `localStorage`, portanto o teste web não comprova o SQLite mobile.

## Vídeo de demonstração — até 3 minutos

1. **0:00–0:25** — Apresentar o problema de exposição ao calor na região central de Osasco e a CitizenTech SombraViva.
2. **0:25–1:00** — Mostrar a Home com Open-Meteo, as informações de fonte e o comportamento offline.
3. **1:00–1:30** — Mostrar Cuidados e Locais com referência aos dados oficiais.
4. **1:30–2:25** — Cadastrar, listar e excluir um relato; demonstrar persistência após reabrir no celular.
5. **2:25–3:00** — Explicar SQLite, acessibilidade, ligação com o projeto da equipe e ODS.

**Link do vídeo:** **[INSERIR URL DO VÍDEO ATÉ 3 MINUTOS]**

## Participantes e entrega

**Integrantes e RMs:** **[INSERIR NOMES COMPLETOS E RMs DA EQUIPE]**

Segundo o briefing da FIAP (página 34), a entrega de **Mobile Development & IoT** inclui repositório com código organizado, README com Ficha CitizenTech e instruções, prints das telas e link de vídeo de até três minutos. **Prazo geral informado: 19/11/2026 às 23h55**, via Teams/Portal do Aluno, enviado por um integrante da equipe.

A solução é acadêmica; este repositório documenta o módulo mobile e sua contribuição à CitizenTech comum do grupo, sem afirmar integrações ainda não demonstradas.
