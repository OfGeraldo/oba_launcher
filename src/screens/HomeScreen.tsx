// src/screens/HomeScreen.tsx
import React, { useEffect, useState } from 'react';
import { SafeAreaView, View, Text } from 'react-native';
import HeaderStatus from '../components/HeaderStatus';
import HomeGrid from '../components/HomeGrid';
import { useStatusInfo } from '../utils/useStatusInfo';
import styles from './HomeScreen.styles';
import { fetchMissedCallsToday } from '../utils/missedCalls';

const HomeScreen: React.FC<{ onNavigate: (screen: ScreenName) => void }> = ({ onNavigate }) => {
//const HomeScreen: React.FC = () => {
  const [timeText, setTimeText] = useState('');
  const [dateText, setDateText] = useState('');
  const [missedCallsToday, setMissedCallsToday] = useState(0);
  const statusInfo = useStatusInfo();

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const horas = now.toLocaleTimeString('pt-BR', {
        hour: '2-digit',
        minute: '2-digit',
      });

      const diaSemana = now
        .toLocaleDateString('pt-BR', { weekday: 'long' })
        .toUpperCase();
      const dia = now.getDate().toString().padStart(2, '0');
      const mes = now
        .toLocaleDateString('pt-BR', { month: 'long' })
        .toUpperCase();

      setTimeText(horas);
      setDateText(`${diaSemana}\n${dia} - ${mes}`);
    };

    updateTime();
    const id = setInterval(updateTime, 30_000);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    const loadMissed = async () => {
      const qtd = await fetchMissedCallsToday();
      setMissedCallsToday(qtd);
    };
    loadMissed();

    const id = setInterval(loadMissed, 60 * 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <HeaderStatus dateText={dateText} timeText={timeText} statusInfo={statusInfo} />

      <View style={styles.separator} />

      <HomeGrid onNavigate={onNavigate} />

      <View style={styles.missedCallsBar}>
        <Text style={styles.missedCallsText}>
          {missedCallsToday} Ligações Perdidas
        </Text>
      </View>
    </SafeAreaView>
  );
};

export default HomeScreen;
