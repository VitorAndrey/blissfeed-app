import {Button, Text, View} from 'react-native';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {MMKV} from 'react-native-mmkv';
import {SafeAreaProvider} from 'react-native-safe-area-context';

import {NavigationContainer} from '@react-navigation/native';
import {
  createNativeStackNavigator,
  NativeStackNavigationProp,
} from '@react-navigation/native-stack';
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';

export const storage = new MMKV();
const Stack = createNativeStackNavigator();
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
          <NavigationContainer>
            <Stack.Navigator>
              <Stack.Screen name="Home" component={HomeScreen} />
              <Stack.Screen name="Posts" component={PostScreen} />
            </Stack.Navigator>
          </NavigationContainer>
        </QueryClientProvider>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}

function HomeScreen({navigation}: {navigation: NavigationProp}) {
  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <Text>Home Screen</Text>
      <Button
        title="Go to Details... again"
        onPress={() => navigation.navigate('Home')}
      />
    </View>
  );
}

function PostScreen({navigation}: {navigation: NavigationProp}) {
  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <Text>Posts Screen</Text>
      <Button
        title="Go to Details... again"
        onPress={() => navigation.navigate('Posts')}
      />
    </View>
  );
}
