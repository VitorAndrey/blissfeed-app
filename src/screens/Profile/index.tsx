// import { useState } from "react";
// import { FlatList } from "react-native";
import { Image, TouchableOpacity } from 'react-native';

import { useNavigation } from '@react-navigation/native';
import { useTheme } from '@shopify/restyle';

import { AppNavigationRoutesProps } from '@routes/app.routes';

import {
  HeartIcon,
  MoreHorizontalIcon,
  UserPlus2Icon,
} from 'lucide-react-native';

import { Box, Text, ThemeProps } from '@theme/index';

export function Profile() {
  // const [data, setData] = useState([{ id: "1", name: "jhon" }]);
  const navigation = useNavigation<AppNavigationRoutesProps>();

  const theme = useTheme<ThemeProps>();
  const { primary } = theme.colors;

  function handleNavigateToEditProfile() {
    navigation.navigate('EditProfile');
  }

  return (
    <Box flex={1}>
      <Box style={{ position: 'relative', height: 120, width: '100%' }}>
        <Image
          source={{ uri: 'https://github.com/X.png' }}
          style={{ height: '100%', width: '100%' }}
        />

        <TouchableOpacity
          onPress={handleNavigateToEditProfile}
          activeOpacity={0.8}
          style={{
            position: 'absolute',
            top: 4,
            right: 4,
            height: 28,
            width: 28,
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: 9999,
          }}>
          <MoreHorizontalIcon color={'black'} size={18} />
        </TouchableOpacity>
      </Box>
      <Box mx="4" alignItems="center">
        <Box
          style={{
            marginTop: -32,
            height: 60,
            width: 60,
            borderRadius: 9999,
            borderWidth: 12,
            borderColor: 'white',
          }}>
          <Image
            source={{ uri: 'https://github.com/Mat.png' }}
            style={{ height: '100%', width: '100%', borderRadius: 9999 }}
          />
        </Box>

        <Text mt="1">Jhon Doe</Text>

        <Box flexDirection="row" alignItems="center" gap="1">
          <Text variant="text_xs">Vencerei a Ansiedade</Text>
          <HeartIcon fill={primary} color={primary} size={14} />
        </Box>

        {/* <Box className="my-8 flex-row">
          <ProfileAnalyticsItem value="54h" description="assistidas" />

          <Box className="mx-2 h-full w-px bg-theme-gray-light" />

          <ProfileAnalyticsItem value="22" description="desabafos" />

          <Box className="mx-2 h-full w-px bg-theme-gray-light" />

          <ProfileAnalyticsItem value="8" description="ajudas" />
        </Box> */}

        <Box flexDirection="row">
          <TouchableOpacity>
            <UserPlus2Icon color={'white'} size={16} />
            <Text>Seguir</Text>
          </TouchableOpacity>
          <TouchableOpacity>
            <UserPlus2Icon color={'white'} size={16} />
            <Text>Menssagem</Text>
          </TouchableOpacity>
        </Box>

        {/* <FlatList
          data={data}
          renderItem={({ item }) => <Text>{item.name}</Text>}
          keyExtractor={(item) => item.id}
        /> */}
      </Box>
    </Box>
  );
}
