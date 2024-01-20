import {
  BottomTabNavigationProp,
  createBottomTabNavigator,
} from '@react-navigation/bottom-tabs';
import { useTheme } from '@shopify/restyle';
import { useBoundStore } from '@store/index';

import { Article } from '@screens/Article';
import { AudioContent } from '@screens/AudioContent';
import { Conversation } from '@screens/Conversation';
import { EditProfile } from '@screens/EditProfile';
import { Feed } from '@screens/Feed';
import { Onboarding } from '@screens/Onboarding';
import { Profile } from '@screens/Profile';
import { Relaxing } from '@screens/Relaxing';
import { Search } from '@screens/Search';
import { VideoContent } from '@screens/VideoContent';
import { Article as AticleType } from '@models/article';
import { AudioContent as AudioContentType } from '@models/audioContent';
import { VideoContent as VideoContentType } from '@models/videoContent';

import {
  CoffeeIcon,
  HomeIcon,
  PenSquareIcon,
  SearchIcon,
  User2Icon,
} from 'lucide-react-native';

import { ThemeProps } from '@theme/index';

export type AppRoutes = {
  Conversation: undefined;
  Feed: undefined;
  Relaxing: undefined;
  OnBoarding: undefined;
  Profile: undefined;
  Search: undefined;
  EditProfile: undefined;
  Article: { article: AticleType };
  AudioContent: { audioContent: AudioContentType };
  VideoContent: { videoContent: VideoContentType };
};

export type AppNavigationRoutesProps = BottomTabNavigationProp<AppRoutes>;

const { Navigator, Screen } = createBottomTabNavigator<AppRoutes>();

export function AppRoutes() {
  const theme = useTheme<ThemeProps>();
  const { tabBarActiveTintColor, tabBarInactiveTintColor } = theme.colors;
  const alreadyViewedOnboarding = useBoundStore(
    state => state.alreadyViewedOnboarding,
  );
  const isSearchInputFocused = useBoundStore(
    state => state.isSearchInputFocused,
  );

  return (
    <Navigator
      initialRouteName={alreadyViewedOnboarding ? 'Feed' : 'OnBoarding'}
      sceneContainerStyle={{ backgroundColor: 'transparent' }}
      backBehavior="history"
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarActiveTintColor,
        tabBarInactiveTintColor,
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
          tabBarStyle: { display: 'none' },
        }}
      />

      <Screen
        name="Feed"
        component={Feed}
        options={{
          tabBarIcon: ({ color }) => <HomeIcon color={color} />,
        }}
      />

      <Screen
        name="Search"
        component={Search}
        options={{
          tabBarIcon: ({ color }) => <SearchIcon color={color} />,
          tabBarStyle: {
            display: isSearchInputFocused ? 'none' : undefined,
            height: 60,
            backgroundColor: 'transparent',
            elevation: 0,
          },
        }}
      />

      <Screen
        name="Article"
        component={Article}
        options={{
          tabBarButton: () => null,
          tabBarStyle: { display: 'none' },
        }}
      />

      <Screen
        name="Conversation"
        component={Conversation}
        options={{
          tabBarIcon: ({ color }) => <PenSquareIcon color={color} />,
          tabBarStyle: { display: 'none' },
        }}
      />

      <Screen
        name="Relaxing"
        component={Relaxing}
        options={{
          tabBarIcon: ({ color }) => <CoffeeIcon color={color} />,
        }}
      />

      <Screen
        name="AudioContent"
        component={AudioContent}
        options={{
          tabBarButton: () => null,
          tabBarStyle: { display: 'none' },
        }}
      />

      <Screen
        name="VideoContent"
        component={VideoContent}
        options={{
          tabBarButton: () => null,
          tabBarStyle: { display: 'none' },
        }}
      />

      <Screen
        name="Profile"
        component={Profile}
        options={{
          tabBarIcon: ({ color }) => <User2Icon color={color} />,
        }}
      />

      <Screen
        name="EditProfile"
        component={EditProfile}
        options={{
          tabBarButton: () => null,
          tabBarStyle: { display: 'none' },
        }}
      />
    </Navigator>
  );
}
