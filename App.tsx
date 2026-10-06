// App.tsx
import React, { useState, useEffect } from 'react';
import { Linking } from 'react-native';
import HomeScreen from './src/screens/HomeScreen';
import ContactsScreen from './src/screens/ContactsScreen';
import SettingsScreen from './src/screens/SettingsScreen';
import FavoritesManagerScreen from './src/screens/FavoritesManagerScreen';
import { useBackHandler } from './src/hooks/useBackHandler';

export type ScreenName =
  | 'home'
  | 'contacts'
  | 'settings'
  | 'favoritesManager';

const App = () => {
  const [navStack, setNavStack] = useState<ScreenName[]>(['home']);

  const navigate = (screen: ScreenName) => {
    setNavStack((prev) => [...prev, screen]);
  };

  const goBack = () => {
    setNavStack((prev) => {
      // Se só tem Home na pilha, NÃO faz nada (deixa fechar)
      if (prev.length <= 1) return prev;
      // Senão, volta uma tela
      return prev.slice(0, -1);
    });
  };

  const currentScreen = navStack[navStack.length - 1];
  const isOnHomeScreen = currentScreen === 'home' && navStack.length === 1;

  useBackHandler({ 
    isOnHomeScreen,  // SÓ TRUE quando é exatamente Home sem pilha
    onBack: goBack 
  });

  useEffect(() => {
    const handleDeepLink = ({ url }: { url: string }) => {
      if (!url) return;

      // Verifica se o link pede a tela de contatos
      if (url.includes('obalauncher://contacts')) {
        // Navega para contatos (se já não estiver lá)
        setNavStack((prev) => {
          if (prev[prev.length - 1] === 'contacts') return prev;
          return [...prev, 'contacts'];
        });
      }
    };

    // 1. Trata link se o app já estiver aberto (background)
    const subscription = Linking.addEventListener('url', handleDeepLink);

    // 2. Trata link se o app estava fechado (cold start)
    Linking.getInitialURL().then((url) => {
      if (url) handleDeepLink({ url });
    });

    return () => {
      subscription.remove();
    };
  }, []);

  switch (currentScreen) {
    case 'contacts':
      return <ContactsScreen onBack={goBack} />;
    case 'settings':
      return <SettingsScreen onBack={goBack} onNavigate={navigate} />;
    case 'favoritesManager':
      return <FavoritesManagerScreen onBack={goBack} />;
    default:
      return <HomeScreen onNavigate={navigate} />;
  }
};

export default App;
