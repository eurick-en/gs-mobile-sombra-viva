import * as SQLite from 'expo-sqlite';
import { Report, ReportType } from '../types';

let db: SQLite.SQLiteDatabase | undefined;
function database() {
  if (!db) {
    db = SQLite.openDatabaseSync('climacidadao.db');
    db.execSync(`CREATE TABLE IF NOT EXISTS relatos (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      titulo TEXT NOT NULL,
      bairro TEXT NOT NULL,
      descricao TEXT NOT NULL,
      categoria TEXT NOT NULL,
      criado_em TEXT NOT NULL
    );`);
  }
  return db;
}
export function listReports(): Report[] {
  return database().getAllSync<Report>('SELECT * FROM relatos ORDER BY id DESC');
}
export function saveReport(data: { titulo: string; bairro: string; descricao: string; categoria: ReportType }) {
  database().runSync(
    'INSERT INTO relatos (titulo,bairro,descricao,categoria,criado_em) VALUES (?,?,?,?,?)',
    [data.titulo.trim(), data.bairro.trim(), data.descricao.trim(), data.categoria, new Date().toISOString()]
  );
}
export function deleteReport(id: number) {
  database().runSync('DELETE FROM relatos WHERE id = ?', [id]);
}
