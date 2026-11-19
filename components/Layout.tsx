import React from 'react';
import { View, Text, ScrollView, Pressable, StyleSheet, StatusBar } from 'react-native';
import { router, usePathname } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { C } from '../data/theme';
const nav = [
  { url: '/', name: 'Início', symbol: '⌂' },
  { url: '/alertas', name: 'Cuidados', symbol: '♡' },
  { url: '/pontos', name: 'Locais', symbol: '♧' },
  { url: '/relatos', name: 'Relatos', symbol: '▤' },
] as const;
export function Layout({ children, title, subtitle }: { children: React.ReactNode; title?: string; subtitle?: string }) {
  const pathname = usePathname();
  return <SafeAreaView style={styles.safe} edges={['top', 'bottom']}>
    <StatusBar barStyle="dark-content" backgroundColor={C.bg} />
    <View style={styles.header}>
      <View><Text style={styles.brand}>☀  SOMBRA<Text style={{ color: C.coral }}>VIVA</Text></Text>
      {title ? <Text style={styles.title}>{title}</Text> : null}
      {subtitle ? <Text style={styles.subtitle}>{subtitle}</Text> : null}</View>
      <View style={styles.city}><Text style={styles.cityText}>📍 Osasco</Text></View>
    </View>
    <ScrollView keyboardShouldPersistTaps="handled" contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>{children}</ScrollView>
    <View style={styles.bottom}>{nav.map(n => <Pressable key={n.url} onPress={() => router.replace(n.url)} accessibilityRole="button" accessibilityLabel={`Ir para ${n.name}`} style={styles.navItem}>
      <Text style={[styles.symbol, pathname === n.url && styles.active]}>{n.symbol}</Text>
      <Text style={[styles.navText, pathname === n.url && styles.active]}>{n.name}</Text>
    </Pressable>)}</View>
  </SafeAreaView>;
}
const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: C.bg },
  header: { paddingHorizontal: 20, paddingTop: 14, paddingBottom: 15, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start' },
  brand: { fontSize: 13, fontWeight: '900', color: C.ink, letterSpacing: 0.7 },
  title: { fontSize: 26, fontWeight: '900', color: C.ink, marginTop: 16 },
  subtitle: { fontSize: 13, color: C.muted, marginTop: 5, maxWidth: 260, lineHeight: 19 },
  city: { backgroundColor: '#EBEEF5', paddingHorizontal: 10, paddingVertical: 8, borderRadius: 20, marginTop: 2 },
  cityText: { color: C.navy, fontSize: 11, fontWeight: '700' },
  content: { paddingHorizontal: 20, paddingBottom: 28, gap: 15 },
  bottom: { backgroundColor: C.white, borderTopColor: C.line, borderTopWidth: 1, flexDirection: 'row', paddingTop: 9, paddingBottom: 2 },
  navItem: { flex: 1, alignItems: 'center', paddingVertical: 4, minHeight: 52 },
  symbol: { fontSize: 25, color: '#A2ACB9', lineHeight: 28 },
  navText: { color: '#98A2B3', fontWeight: '700', fontSize: 11, marginTop: 3 },
  active: { color: C.coral },
});
