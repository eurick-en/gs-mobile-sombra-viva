export type ReportType = 'Falta de árvores' | 'Falta de sombra' | 'Calor intenso' | 'Sem ponto de hidratação';
export type Report = { id: number; titulo: string; bairro: string; descricao: string; categoria: ReportType; criado_em: string; };
export type WeatherDay = { date: string; min: number; max: number; weatherCode: number };
export type Weather = {
  temperature: number; apparent: number; humidity: number; wind: number;
  time: string; fetchedAt: string; forecast: WeatherDay[];
};
export type SupportPoint = {
 id: string; nome: string; tipo: string; bairro: string; descricao: string;
 endereco: string; horario: string; estrutura: string; fonte: string;
};
