import { Weather } from '../types';
// Centro de Osasco: estimativa meteorológica para um ponto; NÃO representa leitura de cada bairro.
const LAT = -23.5329;
const LON = -46.7917;
const ENDPOINT = `https://api.open-meteo.com/v1/forecast?latitude=${LAT}&longitude=${LON}&current=temperature_2m,relative_humidity_2m,apparent_temperature,wind_speed_10m,weather_code&daily=temperature_2m_max,temperature_2m_min,weather_code&forecast_days=4&timezone=America%2FSao_Paulo`;
export async function fetchWeather(): Promise<Weather> {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), 12000);
  let response: Response;
  try { response = await fetch(ENDPOINT, { signal: controller.signal }); }
  finally { clearTimeout(timer); }
  if (!response.ok) throw new Error(`Serviço meteorológico indisponível (${response.status})`);
  const data = await response.json();
  const current = data?.current;
  if (!current || !['temperature_2m','apparent_temperature','relative_humidity_2m','wind_speed_10m'].every(k => typeof current[k] === 'number')) {
    throw new Error('A API retornou dados incompletos');
  }
  const daily = data.daily;
  const forecast = Array.isArray(daily?.time) ? daily.time.slice(1,4).map((date: string,i: number) => ({
    date, min: daily.temperature_2m_min[i+1], max: daily.temperature_2m_max[i+1], weatherCode: daily.weather_code[i+1],
  })).filter((day: {min:number; max:number}) => Number.isFinite(day.min) && Number.isFinite(day.max)) : [];
  return {
    temperature: current.temperature_2m,
    apparent: current.apparent_temperature,
    humidity: current.relative_humidity_2m,
    wind: current.wind_speed_10m,
    time: current.time ?? '', fetchedAt: new Date().toISOString(), forecast,
  };
}
export function getHeatLevel(apparent: number) {
  // Faixas informativas definidas para o produto, NÃO alertas oficiais nem níveis clínicos.
  if (apparent >= 35) return { title: 'Calor elevado', text: 'Redobre os cuidados com o calor e procure ambientes frescos.', bg: '#FFE6E1', fg: '#B93526', icon: '🔴' };
  if (apparent >= 30) return { title: 'Atenção ao calor', text: 'Hidrate-se e reduza o tempo sob sol direto.', bg: '#FFF0DA', fg: '#925409', icon: '🟠' };
  return { title: 'Condição mais amena', text: 'Continue atento à hidratação durante o dia.', bg: '#E7F5EE', fg: '#167254', icon: '🟢' };
}
export function describeWeather(code: number): string {
  if (code === 0) return 'Céu limpo';
  if ([1,2,3].includes(code)) return 'Parcialmente nublado';
  if ([45,48].includes(code)) return 'Nevoeiro';
  if ([51,53,55,56,57].includes(code)) return 'Garoa';
  if ([61,63,65,66,67,80,81,82].includes(code)) return 'Chuva';
  if ([95,96,99].includes(code)) return 'Trovoadas';
  return 'Condições variáveis';
}
