import {
  BottomTabNavigationProp,
  createBottomTabNavigator,
} from '@react-navigation/bottom-tabs';

import {Conversation} from '@screens/Conversation';
import {Feed} from '@screens/Feed';
import {Meditate} from '@screens/Meditate';
import {Onboarding} from '@screens/Onboarding';
import {Profile} from '@screens/Profile';
import {Search} from '@screens/Search';

import {
  CoffeeIcon,
  HomeIcon,
  PenSquareIcon,
  SearchIcon,
  User2Icon,
} from 'lucide-react-native';

export type AppRoutes = {
  Conversation: undefined;
  Feed: undefined;
  Meditate: undefined;
  OnBoarding: undefined;
  Profile: undefined;
  Search: undefined;
};

export type AppNavigationRoutesProps = BottomTabNavigationProp<AppRoutes>;

const {Navigator, Screen} = createBottomTabNavigator<AppRoutes>();

export function AppRoutes() {
  return (
    <Navigator
      initialRouteName={'Feed'}
      sceneContainerStyle={{backgroundColor: 'transparent'}}
      backBehavior="history"
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarActiveTintColor: '#111111',
        tabBarInactiveTintColor: '#999999',
        tabBarStyle: {
          backgroundColor: 'transparent',
          elevation: 0,
          height: 60,
        },
      }}>
      <Screen
        name="OnBoarding"
        component={Onboarding}
        options={{
          tabBarButton: () => null,
          tabBarStyle: {display: 'none'},
        }}
      />

      <Screen
        name="Feed"
        component={Feed}
        options={{
          tabBarIcon: ({color}) => <HomeIcon color={color} />,
        }}
      />

      <Screen
        name="Search"
        component={Search}
        options={{
          tabBarIcon: ({color}) => <SearchIcon color={color} />,
        }}
      />

      <Screen
        name="Conversation"
        component={Conversation}
        options={{
          tabBarIcon: ({color}) => <PenSquareIcon color={color} />,
          tabBarStyle: {display: 'none'},
        }}
      />

      <Screen
        name="Meditate"
        component={Meditate}
        options={{
          tabBarIcon: ({color}) => <CoffeeIcon color={color} />,
        }}
      />

      <Screen
        name="Profile"
        component={Profile}
        options={{
          tabBarIcon: ({color}) => <User2Icon color={color} />,
        }}
      />
    </Navigator>
  );
}
