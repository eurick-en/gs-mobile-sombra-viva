import React, { useCallback, useEffect, useState } from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { router } from 'expo-router';
import { Layout } from '../components/Layout';
import { Card, SectionTitle, PrimaryButton, TinyTag } from '../components/UI';
import { C } from '../data/theme';
import { fetchWeather, getHeatLevel, describeWeather } from '../services/weather';
import { readCachedWeather, saveCachedWeather } from '../services/weatherCache';
import { Weather } from '../types';
function formatMoment(dateString: string): string {
  if (!dateString) return 'horário indisponível';
  const date = new Date(dateString);
  return Number.isNaN(date.getTime()) ? dateString : date.toLocaleString('pt-BR', {day:'2-digit',month:'2-digit',hour:'2-digit',minute:'2-digit',timeZone:'America/Sao_Paulo'});
}
function dayLabel(iso: string): string {
  const date = new Date(`${iso}T12:00:00`);
  return date.toLocaleDateString('pt-BR',{weekday:'short',day:'2-digit',month:'2-digit'});
}
export default function Home() {
  const [weather,setWeather]=useState<Weather|null>(null);
  const [loading,setLoading]=useState(true);
  const [error,setError]=useState('');
  const [offline,setOffline]=useState(false);
  const update=useCallback(async()=>{
    setLoading(true);setError('');
    try {
      const fresh=await fetchWeather();
      setWeather(fresh);setOffline(false);saveCachedWeather(fresh);
    } catch {
      const cache=readCachedWeather();
      if (cache) {setWeather(cache);setOffline(true);setError('Sem conexão com a previsão. Exibindo a última consulta salva.');}
      else {setWeather(null);setOffline(true);setError('Sem acesso à previsão e sem consulta salva neste aparelho. Conecte-se para obter os dados meteorológicos.');}
    } finally {setLoading(false);}
  },[]);
  useEffect(()=>{const cached=readCachedWeather();if(cached){setWeather(cached);setOffline(true);}void update();},[update]);
  const level=weather&&!offline?getHeatLevel(weather.apparent):null;
  return <Layout title="O calor na sua cidade" subtitle="Informação para se cuidar e transformar seu bairro.">
    <View style={styles.hero}>
      <Text style={styles.heroOverline}>CONDIÇÕES METEOROLÓGICAS • OSASCO</Text>
      {loading&&!weather?<ActivityIndicator size="large" color={C.white} style={{marginVertical:35}}/>:weather?<>
        <View style={styles.heroRow}><Text style={styles.temp}>{Math.round(weather.temperature)}°</Text><Text style={styles.sun}>☀</Text></View>
        <Text style={styles.apparent}>Sensação térmica de {Math.round(weather.apparent)}°C</Text>
        <View style={styles.heroDivider}/>
        <View style={styles.metrics}><Text style={styles.metric}>💧  Umidade {Math.round(weather.humidity)}%</Text><Text style={styles.metric}>〰  Vento {Math.round(weather.wind)} km/h</Text></View>
      </>:<Text style={styles.heroError}>Dados não disponíveis</Text>}
      <Text style={styles.source}>Open-Meteo • {weather?`medição estimada ${weather.time.replace('T',' às ')} • ${offline?'ÚLTIMO REGISTRO SALVO':'consulta online'}`:'aguardando primeira consulta'}</Text>
    </View>
    {offline&&weather?<Card style={{backgroundColor:'#FFF0DA'}}><Text style={styles.warning}>📴  Você está vendo dados anteriores</Text><Text style={styles.warningText}>Última consulta em {formatMoment(weather.fetchedAt)}. As condições podem ter mudado. A previsão só será atualizada quando a conexão voltar.</Text><PrimaryButton label="Atualizar clima" onPress={()=>void update()}/></Card>:null}
    {error&&!weather?<Card><Text style={styles.err}>{error}</Text><PrimaryButton label="Tentar novamente" onPress={()=>void update()}/></Card>:null}
    {level?<Card style={{backgroundColor:level.bg,borderWidth:1,borderColor:level.bg}}>
      <TinyTag text="ÍNDICE INFORMATIVO DE CALOR" accent/>
      <View style={styles.alertTitleRow}><Text style={styles.alertIcon}>{level.icon}</Text><Text style={[styles.alertTitle,{color:level.fg}]}>{level.title}</Text></View>
      <Text style={styles.alertDescription}>{level.text}</Text>
      <Text style={styles.smallText}>Classificação do aplicativo pela sensação térmica; não é alerta emitido pela Defesa Civil.</Text>
    </Card>:null}
    {weather?.forecast?.length?<>
      <SectionTitle title="Próximos 3 dias" note="Previsão Open-Meteo"/>
      <View style={styles.forecast}>{weather.forecast.map(day=><Card key={day.date} style={{flex:1,minWidth:95}}><Text style={styles.day}>{dayLabel(day.date)}</Text><Text style={styles.forecastTemp}>{Math.round(day.max)}° <Text style={styles.min}>/ {Math.round(day.min)}°</Text></Text><Text style={styles.forecastText}>{describeWeather(day.weatherCode)}</Text></Card>)}</View>
      {offline?<Text style={styles.smallText}>Previsão armazenada em {formatMoment(weather.fetchedAt)}; pode estar desatualizada.</Text>:null}
    </>:null}
    <SectionTitle title="O que você pode fazer"/>
    <View style={styles.actions}>
      <Card style={{flex:1,gap:10}}><Text style={styles.actionEmoji}>🧊</Text><Text style={styles.actionTitle}>Cuide-se no calor</Text><Text style={styles.actionText}>Dicas simples de proteção.</Text><PrimaryButton label="Ver cuidados" onPress={()=>router.push('/alertas')}/></Card>
      <Card style={{flex:1,gap:10}}><Text style={styles.actionEmoji}>🌿</Text><Text style={styles.actionTitle}>Melhore seu bairro</Text><Text style={styles.actionText}>Registre um local problemático.</Text><PrimaryButton label="Criar relato" onPress={()=>router.push('/novo-relato')}/></Card>
    </View>
    <Card><Text style={styles.footHead}>🌎  Por que isso importa?</Text><Text style={styles.footText}>Calçadas sem sombra e a redução de árvores aumentam a exposição ao sol. Consulte o clima, encontre parques municipais e registre problemas observados no seu bairro.</Text></Card>
    <Text style={styles.disclaimer}>Temperaturas são estimativas meteorológicas para o centro de Osasco, não medições em todas as ruas. Relatos são armazenados apenas neste aparelho.</Text>
  </Layout>;
}
const styles=StyleSheet.create({
 hero:{backgroundColor:C.coral,borderRadius:24,padding:22,minHeight:210,overflow:'hidden'},heroOverline:{color:'#FFECE8',fontSize:10,fontWeight:'900',letterSpacing:1.5},
 heroRow:{flexDirection:'row',justifyContent:'space-between',alignItems:'center',marginTop:12},temp:{color:'#fff',fontSize:83,lineHeight:96,fontWeight:'800'},sun:{fontSize:65,color:'white',marginRight:13},
 apparent:{color:'#fff',fontSize:16,fontWeight:'600'},heroDivider:{height:1,backgroundColor:'#FFFFFF50',marginTop:21,marginBottom:14},metrics:{flexDirection:'row',justifyContent:'space-between',gap:8},
 metric:{color:'white',fontSize:11,fontWeight:'700'},source:{color:'#FFE4DE',fontSize:10,marginTop:17,lineHeight:16},heroError:{color:'white',fontSize:20,marginTop:35},
 err:{color:'#B93526',marginBottom:12,fontSize:13},warning:{color:'#925409',fontWeight:'850',fontSize:15,marginBottom:8},warningText:{color:C.ink,fontSize:13,lineHeight:20,marginBottom:12},
 alertTitleRow:{flexDirection:'row',alignItems:'center',gap:8,marginTop:13},alertIcon:{fontSize:21},alertTitle:{fontSize:21,fontWeight:'850'},alertDescription:{fontSize:13,color:C.ink,marginTop:8,lineHeight:19},
 smallText:{fontSize:11,color:C.muted,marginTop:10,lineHeight:17},forecast:{flexDirection:'row',flexWrap:'wrap',gap:9},day:{color:C.muted,fontWeight:'750',fontSize:11},forecastTemp:{fontSize:20,fontWeight:'850',color:C.ink,marginTop:8},min:{fontSize:13,color:C.muted},forecastText:{fontSize:11,color:C.muted,marginTop:7,lineHeight:17},
 actions:{flexDirection:'row',gap:12},actionEmoji:{fontSize:28},actionTitle:{fontWeight:'850',color:C.ink,fontSize:15,minHeight:35},actionText:{color:C.muted,fontSize:12,lineHeight:18,minHeight:37},
 footHead:{color:C.ink,fontWeight:'850',fontSize:15,marginBottom:9},footText:{color:C.muted,fontSize:13,lineHeight:21},disclaimer:{fontSize:11,color:C.muted,lineHeight:17,textAlign:'center'}
});
