// src/native/BatteryModule.ts
import { NativeModules } from 'react-native';

const { BatteryModule } = NativeModules;
console.log('BatteryModule ->', BatteryModule); // teste

export default BatteryModule as {
  getBatteryLevel: () => Promise<number>;
};
