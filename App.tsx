import React, { useEffect, useState } from 'react';
import { Appearance, StatusBar } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { MMKV } from 'react-native-mmkv';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import { ThemeProvider } from '@shopify/restyle';
import { useBoundStore } from '@store/index';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import { Routes } from '@routes/index';

import { darkTheme, theme } from '@theme/index';

import { Loading } from '@components/Loadig';

export const storage = new MMKV();
const queryClient = new QueryClient();

export default function App() {
  const [colorScheme, setColorScheme] = useState(Appearance.getColorScheme());
  const handleOnLoadUser = useBoundStore(state => state.handleOnLoadUser);
  const onLoadOnboarding = useBoundStore(state => state.onLoadOnboarding);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        await Promise.all([handleOnLoadUser(), onLoadOnboarding()]);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [handleOnLoadUser, onLoadOnboarding]);

  useEffect(() => {
    const appearanceChangeListener = Appearance.addChangeListener(
      ({ colorScheme }) => {
        setColorScheme(colorScheme);
      },
    );

    return () => appearanceChangeListener.remove();
  }, []);

  if (loading) {
    return <Loading />;
  }

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaProvider>
        <QueryClientProvider client={queryClient}>
          <ThemeProvider theme={colorScheme === 'dark' ? darkTheme : theme}>
            <StatusBar
              barStyle={
                colorScheme === 'dark' ? 'light-content' : 'dark-content'
              }
              backgroundColor="transparent"
              translucent
            />
            <Routes />
          </ThemeProvider>
        </QueryClientProvider>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}
