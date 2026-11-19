# Testes manuais de aceitação (Mobile)

- [ ] Abrir app, verificar Home e navegação inferior
- [ ] Com internet, verificar temperatura e sensação térmica via Open-Meteo
- [ ] Desligar internet e verificar cache de última consulta com horário e sem dados inventados
- [ ] Abrir cuidados, verificar orientações e legibilidade
- [ ] Abrir locais, verificar endereços e links para fontes oficiais
- [ ] Abrir novo relato e tentar salvar campos vazios: impedir
- [ ] Salvar um relato válido: aparecer na lista
- [ ] Fechar e reabrir app: registro deve persistir via SQLite
- [ ] Excluir registro: exigir confirmação e remover item
- [ ] Testar rolagem e campos em celular com tela pequena
- [ ] Repetir no Android (emulador ou celular) e registrar prints

## Persistência web x mobile

- [ ] No navegador: cadastrar relato, atualizar a página, confirmar que continua salvo e testar exclusão (usa localStorage).
- [ ] No Android (Expo Go): cadastrar relato, fechar completamente, reabrir, confirmar persistência e testar exclusão (usa SQLite).
- [ ] Não usar o teste web como prova do banco SQLite mobile.


## Dados reais e modo offline
1. Online: carregar Home, confirmar temperatura, umidade, vento e três dias de previsão, com fonte Open-Meteo.
2. Desconectar a internet e tocar em Atualizar clima: última consulta aparece com aviso e timestamp.
3. Primeira execução offline sem cache: informar indisponibilidade sem inventar números.
4. Locais: validar 6 parques, endereço, horário e botão Ver no mapa; verificar Fonte oficial.
5. Android: repetir fluxo de conexão e persistência (SQLite).
