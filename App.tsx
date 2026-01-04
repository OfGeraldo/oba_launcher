// App.tsx
import React, { useState } from 'react';
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
