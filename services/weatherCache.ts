import * as SQLite from 'expo-sqlite';
import { Weather } from '../types';
let db: SQLite.SQLiteDatabase | undefined;
function database() {
  if (!db) {
    db = SQLite.openDatabaseSync('climacidadao.db');
    db.execSync('CREATE TABLE IF NOT EXISTS weather_cache (key TEXT PRIMARY KEY, payload TEXT NOT NULL);');
  }
  return db;
}
export function readCachedWeather(): Weather | null {
  try {
    const item = database().getFirstSync<{payload: string}>('SELECT payload FROM weather_cache WHERE key = ?', ['osasco']);
    return item ? JSON.parse(item.payload) as Weather : null;
  } catch { return null; }
}
export function saveCachedWeather(value: Weather): void {
  try { database().runSync('INSERT OR REPLACE INTO weather_cache (key,payload) VALUES (?,?)', ['osasco', JSON.stringify(value)]); }
  catch (error) { console.warn('Não foi possível manter o clima em cache', error); }
}
