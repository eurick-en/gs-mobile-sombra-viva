import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Layout } from '../components/Layout';
import { Card, SectionTitle, TinyTag } from '../components/UI';
import { tips } from '../data/content';
import { C } from '../data/theme';
export default function Alerts() {
  return <Layout title="Cuidados com o calor" subtitle="Orientações práticas para dias quentes.">
    <Card style={{ backgroundColor: '#FFF0DF' }}><Text style={styles.big}>☀️  Atenção às altas temperaturas</Text><Text style={styles.lead}>O calor intenso pode afetar sua saúde. Fique atento a sinais de mal-estar e procure ajuda quando necessário.</Text><TinyTag text="INFORMAÇÕES EDUCATIVAS" accent /></Card>
    <SectionTitle title="5 formas de se proteger" note="Dicas gerais" />
    {tips.map((tip, i) => <Card key={tip.title} style={{ flexDirection: 'row', gap: 14, alignItems: 'flex-start' }}><View style={styles.emojiBox}><Text style={{ fontSize: 26 }}>{tip.emoji}</Text></View><View style={{ flex: 1 }}><Text style={styles.number}>DICA {String(i + 1).padStart(2, '0')}</Text><Text style={styles.title}>{tip.title}</Text><Text style={styles.desc}>{tip.body}</Text></View></Card>)}
    <Card style={{ backgroundColor: '#EAF3F7' }}><Text style={styles.title}>Precisa de ajuda?</Text><Text style={styles.desc}>Em emergência médica, ligue 192 (SAMU). Para informações locais, acompanhe os canais oficiais de Osasco e da Defesa Civil.</Text></Card>
  </Layout>;
}
const styles = StyleSheet.create({ big: { color: '#9B5115', fontWeight: '850', fontSize: 19, marginBottom: 10 }, lead: { color: '#6F5C51', lineHeight: 21, fontSize: 13, marginBottom: 14 }, emojiBox: { width: 57, height: 57, borderRadius: 15, backgroundColor: C.bg, alignItems: 'center', justifyContent: 'center' }, number: { color: C.coral, fontSize: 10, fontWeight: '900', letterSpacing: 1.1 }, title: { color: C.ink, fontSize: 16, fontWeight: '850', marginTop: 5, marginBottom: 6 }, desc: { color: C.muted, fontSize: 13, lineHeight: 20 } });
