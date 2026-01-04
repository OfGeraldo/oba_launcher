// src/hooks/useBackHandler.ts
import { useEffect } from 'react';
import { BackHandler, EmitterSubscription } from 'react-native';

type Props = {
  isOnHomeScreen: boolean;
  onBack: () => void;
};

export const useBackHandler = ({ isOnHomeScreen, onBack }: Props) => {
  useEffect(() => {
    const handleBack = () => {
      if (isOnHomeScreen) {
        return false; // deixa fechar normalmente
      }
      onBack(); // volta para home
      return true; // previne fechamento
    };

    // NOVA API: addEventListener retorna subscription
    const subscription: EmitterSubscription = BackHandler.addEventListener(
      'hardwareBackPress',
      handleBack,
    );

    return () => {
      // chama .remove() na subscription, não removeEventListener
      subscription.remove();
    };
  }, [isOnHomeScreen, onBack]);
};
