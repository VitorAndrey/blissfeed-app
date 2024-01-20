import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Appearance, StatusBar } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { MMKV } from 'react-native-mmkv';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import { ThemeProvider } from '@shopify/restyle';
import { useBoundStore } from '@store/index';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import { Routes } from '@routes/index';

import { darkTheme, theme } from '@theme/index';

export const storage = new MMKV();
const queryClient = new QueryClient();

export default function App() {
  const colorScheme = Appearance.getColorScheme();
  const onLoadUser = useBoundStore(state => state.onLoadUser);
  const onLoadOnboarding = useBoundStore(state => state.onLoadOnboarding);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        await Promise.all([onLoadUser(), onLoadOnboarding()]);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [onLoadUser, onLoadOnboarding]);

  if (loading) {
    return (
      <ActivityIndicator
        style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
        size="large"
        color="#0000ff"
      />
    );
  }

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaProvider>
        <QueryClientProvider client={queryClient}>
          <ThemeProvider theme={colorScheme === 'dark' ? darkTheme : theme}>
            <StatusBar
              barStyle="dark-content"
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
