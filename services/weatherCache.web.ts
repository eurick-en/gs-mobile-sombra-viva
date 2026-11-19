import { Weather } from '../types';
const KEY = 'climacidadao:weather:osasco:v1';
export function readCachedWeather(): Weather | null {
  try { const text = window.localStorage.getItem(KEY); return text ? JSON.parse(text) as Weather : null; }
  catch { return null; }
}
export function saveCachedWeather(value: Weather): void {
  try { window.localStorage.setItem(KEY, JSON.stringify(value)); }
  catch (error) { console.warn('Não foi possível manter o clima em cache', error); }
}
