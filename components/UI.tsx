import React from 'react';
import { View, Text, Pressable, StyleSheet, type ViewStyle } from 'react-native';
import { C, shadow } from '../data/theme';
export function Card({ children, style }: { children: React.ReactNode; style?: ViewStyle }) {
  return <View style={[styles.card, style]}>{children}</View>;
}
export function SectionTitle({ title, note }: { title: string; note?: string }) {
  return <View style={styles.section}><Text style={styles.sectionTitle}>{title}</Text>{note ? <Text style={styles.note}>{note}</Text> : null}</View>;
}
export function PrimaryButton({ label, onPress, disabled = false }: { label: string; onPress: () => void; disabled?: boolean }) {
  return <Pressable accessibilityRole="button" accessibilityLabel={label} onPress={onPress} disabled={disabled} style={[styles.button, disabled && { opacity: 0.5 }]}><Text style={styles.buttonText}>{label}</Text></Pressable>;
}
export function TinyTag({ text, accent = false }: { text: string; accent?: boolean }) {
  return <View style={[styles.tag, accent && { backgroundColor: C.pale }]}><Text style={[styles.tagText, accent && { color: C.deep }]}>{text}</Text></View>;
}
const styles = StyleSheet.create({
  card: { borderRadius: 20, backgroundColor: C.white, padding: 18, ...shadow },
  section: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 7, marginBottom: 1 },
  sectionTitle: { fontSize: 18, fontWeight: '850', color: C.ink },
  note: { color: C.muted, fontSize: 11 },
  button: { backgroundColor: C.coral, borderRadius: 14, paddingVertical: 16, alignItems: 'center', minHeight: 52, justifyContent: 'center' },
  buttonText: { color: C.white, fontSize: 15, fontWeight: '800' },
  tag: { backgroundColor: '#F0F3F7', paddingHorizontal: 10, paddingVertical: 6, borderRadius: 999, alignSelf: 'flex-start' },
  tagText: { color: C.muted, fontWeight: '750', fontSize: 11 },
});
