import React from 'react';
import { Text, StyleSheet, View, Pressable, Linking } from 'react-native';
import { Layout } from '../components/Layout';
import { Card, SectionTitle, TinyTag } from '../components/UI';
import { points } from '../data/content';
import { C } from '../data/theme';
function openMap(address: string) {
  const url = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`;
  void Linking.openURL(url);
}
export default function Points() {
  return <Layout title="Parques e áreas verdes" subtitle="Encontre áreas verdes e confira informações da Prefeitura de Osasco.">
    <Card style={{backgroundColor:'#E7F5EE'}}><Text style={styles.infoTitle}>🌳  Informações da Prefeitura</Text><Text style={styles.info}>Endereços, horários publicados e estruturas dos parques. A existência de bebedouros ou espaços de acolhimento térmico não foi informada nestes registros.</Text></Card>
    <SectionTitle title="Parques de Osasco" note={`${points.length} locais`} />
    {points.map(p => <Card key={p.id}>
      <View style={styles.top}><Text style={styles.icon}>🌳</Text><TinyTag text={p.tipo}/></View>
      <Text style={styles.title}>{p.nome}</Text>
      <Text style={styles.bairro}>📍 {p.endereco}</Text>
      <Text style={styles.text}>{p.descricao}</Text>
      <Text style={styles.detail}>🕒 Horários publicados: {p.horario}</Text>
      <Text style={styles.detail}>✅ Estrutura informada: {p.estrutura}</Text>
      <View style={styles.buttons}>
        <Pressable accessibilityRole="button" accessibilityLabel={`Ver rota para ${p.nome}`} style={styles.action} onPress={()=>openMap(p.endereco)}><Text style={styles.actionText}>📍 Ver no mapa</Text></Pressable>
        <Pressable accessibilityRole="link" accessibilityLabel={`Fonte oficial sobre ${p.nome}`} style={styles.secondary} onPress={()=>{void Linking.openURL(p.fonte);}}><Text style={styles.secondaryText}>Fonte oficial ↗</Text></Pressable>
      </View>
    </Card>)}
    <Text style={styles.foot}>Fonte: Secretaria de Meio Ambiente e Recursos Hídricos de Osasco. Horários podem mudar por manutenção ou eventos; consulte a fonte antes da visita.</Text>
  </Layout>;
}
const styles=StyleSheet.create({
 infoTitle:{color:C.green,fontWeight:'850',fontSize:16,marginBottom:7},info:{color:C.navy,fontSize:13,lineHeight:21},
 top:{flexDirection:'row',justifyContent:'space-between',alignItems:'center'},icon:{fontSize:27},title:{fontWeight:'850',color:C.ink,fontSize:17,marginTop:12},
 bairro:{color:C.muted,fontSize:12,marginTop:9,lineHeight:19},text:{color:C.muted,fontSize:13,lineHeight:20,marginTop:9},
 detail:{color:C.ink,fontSize:12,lineHeight:19,marginTop:10},buttons:{flexDirection:'row',flexWrap:'wrap',gap:9,marginTop:15},
 action:{backgroundColor:C.coral,paddingVertical:12,paddingHorizontal:16,borderRadius:12,minHeight:44,justifyContent:'center'},actionText:{color:'#fff',fontWeight:'800',fontSize:12},
 secondary:{paddingVertical:12,paddingHorizontal:16,borderWidth:1,borderColor:'#DCE3EC',borderRadius:12,minHeight:44,justifyContent:'center'},secondaryText:{color:C.navy,fontWeight:'750',fontSize:12},
 foot:{fontSize:11,color:C.muted,lineHeight:17,marginVertical:12}
});
