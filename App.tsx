import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {MMKV} from 'react-native-mmkv';
import {SafeAreaProvider} from 'react-native-safe-area-context';

import {QueryClient, QueryClientProvider} from '@tanstack/react-query';

import {Routes} from '@routes/index';

export const storage = new MMKV();
const queryClient = new QueryClient();

export default function App() {
  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <SafeAreaProvider>
        <QueryClientProvider client={queryClient}>
          <Routes />
        </QueryClientProvider>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}
