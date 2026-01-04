// src/utils/useStatusInfo.ts
import { useEffect, useState } from 'react';
import { PermissionsAndroid, Platform } from 'react-native';
import SignalModule from '../native/SignalModule';
import BatteryModule from '../native/BatteryModule';

export type StatusInfo = {
  batteryLevel: number;          // 0–100 real
  signalLevel: 0 | 1 | 2 | 3 | 4;
};

export const useStatusInfo = (): StatusInfo => {
  const [batteryLevel, setBatteryLevel] = useState(0);
  const [signalLevel, setSignalLevel] =
    useState<StatusInfo['signalLevel']>(0);

  useEffect(() => {
    if (Platform.OS !== 'android') return;

    const requestPerms = async () => {
      await PermissionsAndroid.requestMultiple([
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        PermissionsAndroid.PERMISSIONS.READ_PHONE_STATE,
      ]);
    };

    const updateStatus = async () => {
      try {
        const [levelRaw, signalRaw] = await Promise.all([
          BatteryModule.getBatteryLevel(),
          SignalModule.getCurrentLevel(),
        ]);

        const battery = Math.max(0, Math.min(100, levelRaw));
        const signal = Math.max(0, Math.min(4, signalRaw)) as StatusInfo['signalLevel'];

        setBatteryLevel(battery);
        setSignalLevel(signal);
      } catch {
        // mantém valores atuais se der erro
      }
    };

    requestPerms().then(updateStatus);

    const id = setInterval(updateStatus, 10_000); // atualiza a cada 10s
    return () => clearInterval(id);
  }, []);

  return { batteryLevel, signalLevel };
};
