// src/native/SignalModule.ts
import { NativeModules } from 'react-native';

type SignalModuleType = {
  getCurrentLevel: () => Promise<number>; // 0–4
};

const { SignalModule } = NativeModules as { SignalModule: SignalModuleType };

export default SignalModule;
