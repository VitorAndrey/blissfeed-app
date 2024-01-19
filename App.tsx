import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {MMKV} from 'react-native-mmkv';
import {SafeAreaProvider} from 'react-native-safe-area-context';

import {
  createNativeStackNavigator,
  NativeStackNavigationProp,
} from '@react-navigation/native-stack';
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';

import {Routes} from '@/routes';

export const storage = new MMKV();
const queryClient = new QueryClient();

type RootStackParamList = {
  Home: undefined;
  Posts: undefined;
};

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

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
