import React, { useCallback, useState } from 'react';
import { Text, View, Modal, Pressable, StyleSheet } from 'react-native';
import { useFocusEffect, router } from 'expo-router';
import { Layout } from '../components/Layout';
import { Card, SectionTitle, PrimaryButton, TinyTag } from '../components/UI';
import { listReports, deleteReport } from '../database/db';
import { Report } from '../types';
import { C } from '../data/theme';
export default function Reports() {
  const [reports, setReports] = useState<Report[]>([]);
  const [error, setError] = useState('');
  const [pendingDeleteId, setPendingDeleteId] = useState<number | null>(null);
  const refresh = useCallback(() => { try { setReports(listReports()); setError(''); } catch { setError('Não foi possível carregar os relatos neste dispositivo.'); } }, []);
  useFocusEffect(useCallback(() => { refresh(); }, [refresh]));
  const remove = (id: number) => {
    try { deleteReport(id); refresh(); }
    catch (error) { console.error('Erro ao excluir relato:', error); setError('Não foi possível excluir o relato.'); }
  };
  const confirmDelete = (id: number) => setPendingDeleteId(id);
  const performDelete = () => {
    if (pendingDeleteId === null) return;
    const id = pendingDeleteId;
    setPendingDeleteId(null);
    remove(id);
  };
  return <Layout title="Relatos do bairro" subtitle="Registre problemas de calor que você vê de perto.">
    <Card style={{ backgroundColor: C.pale }}><Text style={styles.title}>Sua voz faz diferença 🌿</Text><Text style={styles.description}>Relatos ficam salvos apenas no seu celular, sem publicação na internet. Não envie dados pessoais de terceiros.</Text><PrimaryButton label="+ Registrar novo problema" onPress={() => router.push('/novo-relato')} /></Card>
    <SectionTitle title="Meus registros" note={`${reports.length} ${reports.length === 1 ? 'relato' : 'relatos'}`} />
    {error ? <Text style={styles.error}>{error}</Text> : null}
    {reports.length === 0 ? <Card style={{ alignItems: 'center', paddingVertical: 36 }}><Text style={{ fontSize: 38 }}>📝</Text><Text style={styles.emptyTitle}>Nenhum relato ainda</Text><Text style={styles.emptyText}>Registre um ponto sem sombra ou outro problema de calor no seu bairro.</Text></Card> : reports.map(r => <Card key={r.id}>
      <View style={styles.heading}><TinyTag text={r.categoria} accent /><Pressable onPress={() => confirmDelete(r.id)} accessibilityRole="button" accessibilityLabel={`Excluir relato ${r.titulo}`}><Text style={styles.delete}>Excluir</Text></Pressable></View>
      <Text style={styles.reportTitle}>{r.titulo}</Text><Text style={styles.bairro}>📍 {r.bairro} • Osasco</Text><Text style={styles.description}>{r.descricao}</Text>
      <Text style={styles.date}>{new Date(r.criado_em).toLocaleDateString('pt-BR')}</Text>
    </Card>)}
    <Modal transparent animationType="fade" visible={pendingDeleteId !== null} onRequestClose={() => setPendingDeleteId(null)} accessibilityViewIsModal>
      <View style={styles.overlay}>
        <Pressable style={StyleSheet.absoluteFillObject} onPress={() => setPendingDeleteId(null)} accessibilityLabel="Fechar confirmação" />
        <View style={styles.modalCard}>
          <View style={styles.modalIcon}><Text style={styles.modalIconText}>🗑️</Text></View>
          <Text style={styles.modalTitle}>Excluir relato?</Text>
          <Text style={styles.modalDescription}>Esse registro será removido deste dispositivo. Esta ação não pode ser desfeita.</Text>
          <View style={styles.modalButtons}>
            <Pressable style={[styles.modalButton, styles.cancelButton]} onPress={() => setPendingDeleteId(null)} accessibilityRole="button" accessibilityLabel="Cancelar exclusão">
              <Text style={styles.cancelText}>Cancelar</Text>
            </Pressable>
            <Pressable style={[styles.modalButton, styles.confirmButton]} onPress={performDelete} accessibilityRole="button" accessibilityLabel="Confirmar exclusão do relato">
              <Text style={styles.confirmText}>Excluir relato</Text>
            </Pressable>
          </View>
        </View>
      </View>
    </Modal>
  </Layout>;
}
const styles = StyleSheet.create({ title: { fontSize: 19, fontWeight: '850', color: C.ink, marginBottom: 9 }, description: { fontSize: 13, color: C.muted, lineHeight: 21, marginBottom: 14 }, heading: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }, delete: { color: C.deep, fontSize: 12, fontWeight: '750', padding: 8 }, reportTitle: { color: C.ink, fontSize: 18, fontWeight: '850', marginTop: 11 }, bairro: { color: C.muted, fontSize: 12, marginTop: 5, marginBottom: 13 }, date: { color: C.muted, fontSize: 11 }, emptyTitle: { fontSize: 17, fontWeight: '850', color: C.ink, marginTop: 9 }, emptyText: { textAlign: 'center', color: C.muted, fontSize: 13, lineHeight: 20, marginTop: 7 }, error: { color: C.deep },
  overlay: { flex: 1, backgroundColor: 'rgba(13,24,39,0.58)', alignItems: 'center', justifyContent: 'center', padding: 20 },
  modalCard: { width: '100%', maxWidth: 390, backgroundColor: C.white, borderRadius: 24, padding: 24, alignItems: 'center', shadowColor: '#000', shadowOpacity: 0.18, shadowRadius: 22, elevation: 10 },
  modalIcon: { width: 58, height: 58, borderRadius: 20, backgroundColor: C.pale, alignItems: 'center', justifyContent: 'center', marginBottom: 16 },
  modalIconText: { fontSize: 28 },
  modalTitle: { fontSize: 22, fontWeight: '850', color: C.ink, textAlign: 'center' },
  modalDescription: { fontSize: 14, color: C.muted, lineHeight: 22, textAlign: 'center', marginTop: 10, marginBottom: 24 },
  modalButtons: { flexDirection: 'row', gap: 10, width: '100%' },
  modalButton: { flex: 1, minHeight: 48, paddingHorizontal: 10, borderRadius: 13, alignItems: 'center', justifyContent: 'center' },
  cancelButton: { backgroundColor: '#EFF2F7' },
  confirmButton: { backgroundColor: C.deep },
  cancelText: { color: C.ink, fontWeight: '750', fontSize: 14 },
  confirmText: { color: C.white, fontWeight: '800', fontSize: 14 }
});
