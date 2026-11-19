/** Persistência exclusiva da versão web. No Android/iOS, db.ts usa SQLite. */
import type { Report, ReportType } from '../types';

const STORAGE_KEY = 'climacidadao.relatos.v1';

function readReports(): Report[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed: unknown = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed as Report[] : [];
  } catch (error) {
    console.error('Erro ao ler os relatos do armazenamento web:', error);
    throw new Error('Não foi possível acessar os relatos armazenados neste navegador.');
  }
}
function writeReports(reports: Report[]): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(reports));
  } catch (error) {
    console.error('Erro ao salvar relatos no armazenamento web:', error);
    throw new Error('Não foi possível salvar no armazenamento do navegador.');
  }
}
export function listReports(): Report[] {
  return readReports().sort((a, b) => b.id - a.id);
}
export function saveReport(data: { titulo: string; bairro: string; descricao: string; categoria: ReportType }): void {
  const reports = readReports();
  const newReport: Report = {
    id: reports.reduce((max, r) => Math.max(max, r.id), 0) + 1,
    titulo: data.titulo.trim(), bairro: data.bairro.trim(),
    descricao: data.descricao.trim(), categoria: data.categoria,
    criado_em: new Date().toISOString()
  };
  writeReports([newReport, ...reports]);
}
export function deleteReport(id: number): void {
  writeReports(readReports().filter((r) => r.id !== id));
}
