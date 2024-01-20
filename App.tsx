import React from 'react';
import { Appearance, StatusBar } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { MMKV } from 'react-native-mmkv';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import { ThemeProvider } from '@shopify/restyle';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import { Routes } from '@routes/index';

import { darkTheme, theme } from '@theme/index';

export const storage = new MMKV();
const queryClient = new QueryClient();

export default function App() {
  const colorScheme = Appearance.getColorScheme();

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
