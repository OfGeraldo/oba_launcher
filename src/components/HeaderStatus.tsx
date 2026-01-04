// src/components/HeaderStatus.tsx
import React from 'react';
import { View, Text } from 'react-native';
import { StatusInfo } from '../utils/useStatusInfo';
import styles from './HeaderStatus.styles';

type Props = {
  dateText: string;
  timeText: string;
  statusInfo: StatusInfo;
};

const HeaderStatus: React.FC<Props> = ({ dateText, timeText, statusInfo }) => {
  const { batteryLevel, signalLevel } = statusInfo;
  const batteryFillWidth = `${Math.min(Math.max(batteryLevel, 0), 100)}%`;

const renderSignalBars = () => {
  const barHeights = [12, 18, 24, 30]; // progressivo, como o ícone
  return barHeights.map((height, index) => {
    const barNumber = index + 1;          // 1..4
    const active = signalLevel >= barNumber;
    return (
      <View
        key={barNumber}
        style={[
          styles.signalBar,
          { height },
          active ? styles.signalBarActive : styles.signalBarInactive,
        ]}
      />
    );
  });
};


  const [weekdayLine, dateLine] = dateText.split('\n');

  return (
    <View style={styles.container}>
      <View style={styles.topRow}>
        <View style={styles.batteryContainer}>
          <View style={styles.batteryBody}>
            <View style={[styles.batteryFill, { width: batteryFillWidth }]} />
          </View>
          <View style={styles.batteryCap} />
        </View>

        <View style={{ flex: 1 }} />

        <View style={styles.signalContainer}>{renderSignalBars()}</View>
      </View>

      <View style={styles.bottomRow}>
        <View style={styles.dateArea}>
          <Text style={styles.weekdayText}>{weekdayLine}</Text>
          <Text style={styles.dateText}>{dateLine}</Text>
        </View>
        <View style={styles.timeArea}>
          <Text style={styles.timeText}>{timeText}</Text>
        </View>
      </View>
    </View>
  );
};

export default HeaderStatus;
