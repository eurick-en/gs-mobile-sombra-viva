import React, { useState } from 'react';
import { View, Text, TextInput, Pressable, StyleSheet, Alert, KeyboardAvoidingView, Platform } from 'react-native';
import { router } from 'expo-router';
import { Layout } from '../components/Layout';
import { Card, SectionTitle, PrimaryButton } from '../components/UI';
import { categories } from '../data/content';
import { saveReport } from '../database/db';
import { ReportType } from '../types';
import { C } from '../data/theme';
export default function NewReport() {
  const [titulo, setTitulo] = useState(''); const [bairro, setBairro] = useState('');
  const [descricao, setDescricao] = useState(''); const [categoria, setCategoria] = useState<ReportType>('Falta de árvores');
  const [saving, setSaving] = useState(false);
  const [feedback, setFeedback] = useState('');
  const send = () => {
    if (saving) return;
    if (!titulo.trim() || !bairro.trim() || !descricao.trim()) {
      setFeedback('Preencha o título, o bairro e a descrição.');
      return;
    }
    if (titulo.trim().length < 4 || descricao.trim().length < 10) {
      setFeedback('O título precisa de 4 caracteres e a descrição de pelo menos 10.');
      return;
    }
    setFeedback('');
    setSaving(true);
    try {
      saveReport({ titulo, bairro, descricao, categoria });
      // A confirmação por Alert.alert não aparece corretamente no navegador.
      // Navegar diretamente após salvar funciona no web e no Android/iOS.
      router.replace('/relatos');
    } catch (error) {
      console.error('Erro ao salvar relato:', error);
      setFeedback('Erro ao salvar relato. Verifique o console e tente novamente.');
    } finally {
      setSaving(false);
    }
  };
  return <Layout title="Novo relato" subtitle="Conte o que acontece na sua rua ou bairro.">
    <Card><SectionTitle title="Qual é o problema?" /><Text style={styles.label}>Tipo de ocorrência</Text>
      <View style={styles.chips}>{categories.map(c => <Pressable accessibilityRole="button" accessibilityState={{ selected: categoria === c }} key={c} onPress={() => setCategoria(c)} style={[styles.chip, categoria === c && styles.selected]}><Text style={[styles.chipLabel, categoria === c && styles.selectedLabel]}>{c}</Text></Pressable>)}</View>
      <Text style={styles.label}>Título *</Text><TextInput accessibilityLabel="Título do relato" placeholder="Ex.: Ponto de ônibus sem sombra" placeholderTextColor="#9DA6B4" value={titulo} maxLength={90} onChangeText={setTitulo} style={styles.input} />
      <Text style={styles.label}>Bairro *</Text><TextInput accessibilityLabel="Bairro" placeholder="Ex.: Centro" placeholderTextColor="#9DA6B4" value={bairro} maxLength={60} onChangeText={setBairro} style={styles.input} />
      <Text style={styles.label}>Descrição *</Text><TextInput accessibilityLabel="Descrição do problema" placeholder="Descreva o local e o problema, sem dados pessoais" placeholderTextColor="#9DA6B4" value={descricao} onChangeText={setDescricao} multiline textAlignVertical="top" maxLength={600} style={[styles.input, styles.area]} />
      <Text style={styles.hint}>{descricao.length}/600 caracteres • Os dados ficam somente neste aparelho.</Text>
      {feedback ? <Text accessibilityRole="alert" style={styles.feedback}>{feedback}</Text> : null}
      <PrimaryButton label={saving ? 'Salvando...' : 'Salvar relato'} disabled={saving} onPress={send} />
    </Card>
    <Text style={styles.footer}>Use relatos reais observados. Não informe nomes, telefones ou endereços residenciais de outras pessoas.</Text>
  </Layout>;
}
const styles = StyleSheet.create({ feedback: { color: '#B42318', fontSize: 13, marginVertical: 10, fontWeight: '700' }, label: { color: C.ink, fontSize: 13, fontWeight: '800', marginBottom: 8, marginTop: 18 }, input: { borderRadius: 12, borderWidth: 1, borderColor: C.line, backgroundColor: '#FAFBFD', minHeight: 50, paddingHorizontal: 14, paddingVertical: 10, color: C.ink, fontSize: 14 }, area: { minHeight: 120 }, hint: { color: C.muted, fontSize: 11, marginVertical: 13 }, chips: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 }, chip: { paddingHorizontal: 12, paddingVertical: 10, borderRadius: 12, borderColor: C.line, borderWidth: 1, backgroundColor: C.white }, selected: { backgroundColor: C.pale, borderColor: C.coral }, chipLabel: { fontSize: 12, color: C.navy, fontWeight: '650' }, selectedLabel: { color: C.deep }, footer: { fontSize: 12, color: C.muted, lineHeight: 20 } });
