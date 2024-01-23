import { useCallback, useRef } from 'react';
import {
  Image,
  RefreshControl,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';

import { useNavigation } from '@react-navigation/native';
import { useTheme } from '@shopify/restyle';
import { useBoundStore } from '@store/index';

import { AppNavigationRoutesProps } from '@routes/app.routes';
import { Post as PostType } from '@models/post';
import { useUserPosts } from '@services/queries';

import {
  // HeartIcon,
  MoreHorizontalIcon,
  // UserPlus2Icon,
} from 'lucide-react-native';

import { Box, Text, ThemeProps } from '@theme/index';

import { Loading } from '@components/Loadig';
import { Post } from '@components/Post';

export function Profile() {
  const scrollView = useRef<ScrollView>(null);
  const navigation = useNavigation<AppNavigationRoutesProps>();
  const user = useBoundStore(state => state.user);
  const { data: userPosts, isLoading, refetch } = useUserPosts(user?.id || '');

  const theme = useTheme<ThemeProps>();
  const { mainBackground } = theme.colors;

  function handleNavigateToEditProfile() {
    navigation.navigate('EditProfile');
  }

  const onRefresh = useCallback(() => {
    refetch();
  }, [refetch]);

  return (
    <ScrollView
      ref={scrollView}
      refreshControl={
        <RefreshControl refreshing={isLoading} onRefresh={onRefresh} />
      }
      style={{ flex: 1 }}>
      <Box style={{ position: 'relative', height: 160, width: '100%' }}>
        <Image
          source={{ uri: user?.banner_img || 'https://github.com/X.png' }}
          style={{ height: '100%', width: '100%' }}
        />

        <TouchableOpacity
          onPress={handleNavigateToEditProfile}
          activeOpacity={0.8}
          style={styles.edit_profile}>
          <MoreHorizontalIcon color={'white'} size={18} />
        </TouchableOpacity>
      </Box>
      <Box mx="4" alignItems="center">
        <Box
          style={{ borderColor: mainBackground, ...styles.avatar_container }}>
          <Image
            source={{ uri: user?.profile_img || 'https://github.com/Mat.png' }}
            style={{ height: '100%', width: '100%', borderRadius: 9999 }}
          />
        </Box>

        <Text mt="1">{user?.name || 'Rodolfo'}</Text>

        {/* <Box flexDirection="row" alignItems="center" gap="1">
          <Text variant="text_xs">Vencerei a Ansiedade</Text>
          <HeartIcon fill={primary} color={primary} size={14} />
        </Box> */}

        <Box my="8" flexDirection="row">
          <Box flex={1}>
            <Text textAlign="center" color="mutedForeground" variant="text_xs">
              54h
            </Text>
            <Text textAlign="center" color="mutedForeground" variant="text_xs">
              assistidas
            </Text>
          </Box>

          <Box mx="2" height="100%" width={1} bg="mutedForeground" />

          <Box flex={1}>
            <Text textAlign="center" color="mutedForeground" variant="text_xs">
              6h
            </Text>
            <Text textAlign="center" color="mutedForeground" variant="text_xs">
              assistidas
            </Text>
          </Box>

          <Box mx="2" height="100%" width={1} bg="mutedForeground" />

          <Box flex={1}>
            <Text textAlign="center" color="mutedForeground" variant="text_xs">
              54h
            </Text>
            <Text textAlign="center" color="mutedForeground" variant="text_xs">
              assistidas
            </Text>
          </Box>
        </Box>

        {/* <Box flexDirection="row" gap="4">
          <TouchableOpacity
            style={{ backgroundColor: primary, ...styles.button }}>
            <UserPlus2Icon color={'white'} size={16} />
            <Text>Seguir</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button}>
            <UserPlus2Icon color={'white'} size={16} />
            <Text>Menssagem</Text>
          </TouchableOpacity>
        </Box> */}
      </Box>
      {!isLoading ? (
        <Box style={styles.contentContainerStyle}>
          {userPosts && userPosts.length > 1 ? (
            <>
              {userPosts?.map((item: PostType) => (
                <Post key={item.id} post={item} />
              ))}
            </>
          ) : (
            <Box
              flex={1}
              height={200}
              alignItems="center"
              justifyContent="center">
              <Text color="mutedForeground">Faça seu primeiro post</Text>
            </Box>
          )}
        </Box>
      ) : (
        <Box height={200}>
          <Loading />
        </Box>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  contentContainerStyle: {
    flex: 1,
    gap: 40,
    paddingVertical: 30,
    paddingHorizontal: 20,
  },
  edit_profile: {
    position: 'absolute',
    top: 12,
    right: 12,
    height: 32,
    width: 32,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 9999,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  avatar_container: {
    marginTop: -32,
    height: 100,
    width: 100,
    borderRadius: 9999,
    borderWidth: 8,
  },
  button: {
    flexDirection: 'row',
    flex: 1,
    borderRadius: 9999,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
  },
});
