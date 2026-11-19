import { SupportPoint } from '../types';
export const tips = [
  { emoji: '💧', title: 'Hidrate-se com frequência', body: 'Beba água regularmente ao longo do dia, mesmo antes de sentir sede.' },
  { emoji: '🌳', title: 'Procure sombra', body: 'Reduza a exposição prolongada ao sol, especialmente no período mais quente.' },
  { emoji: '👒', title: 'Proteja-se do sol', body: 'Prefira roupas leves e use chapéu e proteção solar.' },
  { emoji: '👵', title: 'Cuide de pessoas vulneráveis', body: 'Confira como estão crianças, idosos e pessoas com doenças crônicas.' },
  { emoji: '🚨', title: 'Identifique emergências', body: 'Confusão mental, desmaio ou mal-estar grave exigem ajuda imediata. SAMU: 192.' },
];
const fonte = 'https://osasco.sp.gov.br/secretaria-de-meio-ambiente-e-recursos-hidricos/';
// Endereços, horários e estruturas publicados pela Prefeitura de Osasco em sua página de parques.
// Não afirmar existência de bebedouros, atendimento médico ou vaga de abrigo onde não consta na fonte.
export const points: SupportPoint[] = [
  { id:'chico', nome:'Parque Chico Mendes', tipo:'Parque público', bairro:'City Bussocaba', endereco:'Rua Lázaro Suave, 15 – City Bussocaba, Osasco – SP, Brasil', horario:'Todos os dias, 6h às 18h', estrutura:'Pista de caminhada, playground, academia ao ar livre e quadras', descricao:'Área verde com espaços de caminhada e lazer.', fonte },
  { id:'fito', nome:'Parque Ecológico Dionísio Alvarez Mateos (Parque da FITO)', tipo:'Parque público', bairro:'Jardim das Flores', endereco:'Rua Georgina, 64 – Jardim das Flores, Osasco – SP, Brasil', horario:'Seg–sex, 6h às 20h; sáb, dom e feriados, 6h às 18h', estrutura:'Rampas, banheiros adaptados, piso tátil, pista de caminhada e academia', descricao:'Parque ecológico com infraestrutura de caminhada e acessibilidade publicada.', fonte },
  { id:'piratininga', nome:'Parque Ecológico Ana Luiza Moura Freitas', tipo:'Parque público', bairro:'Piratininga', endereco:'Rua David da Silva, 111 – Piratininga, Osasco – SP, Brasil', horario:'Todos os dias, 6h às 18h', estrutura:'Academia ao ar livre, banheiros acessíveis e lago', descricao:'Área verde no bairro Piratininga; o borboletário possui horário próprio.', fonte },
  { id:'nelson', nome:'Parque Nelson Villa Dias', tipo:'Parque público', bairro:'Mutinga', endereco:'Avenida das Esmeraldas, 100 – Mutinga, Osasco – SP, Brasil', horario:'Todos os dias, 6h às 18h', estrutura:'Pista de caminhada, banheiro acessível, rampas e academia', descricao:'Parque com estrutura de lazer e acessibilidade divulgada pela Prefeitura.', fonte },
  { id:'joao', nome:'Parque João Agostinho Bezerra', tipo:'Parque público', bairro:'Bela Vista', endereco:'Rua José Scalco, 150 – Bela Vista, Osasco – SP, Brasil', horario:'Todos os dias, 6h às 18h', estrutura:'Pista de caminhada, areninha de basquete e academia', descricao:'Área verde e de lazer no bairro Bela Vista.', fonte },
  { id:'clovis', nome:'Parque Clóvis Assaf', tipo:'Parque público', bairro:'Cidade das Flores', endereco:'Avenida Ipê, s/n – Cidade das Flores, Osasco – SP, Brasil', horario:'Todos os dias, 6h às 18h', estrutura:'Pista de caminhada, banheiro com acessibilidade e academia', descricao:'Parque municipal com áreas de caminhada e atividades físicas.', fonte },
];
export const categories = ['Falta de árvores', 'Falta de sombra', 'Calor intenso', 'Sem ponto de hidratação'] as const;
