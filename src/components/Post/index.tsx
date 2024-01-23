import { useState } from 'react';
import { Image, StyleSheet, TouchableOpacity } from 'react-native';

import { useTheme } from '@shopify/restyle';
import { formatDistanceToNow } from 'date-fns';
import { ptBR } from 'date-fns/locale';

import { Post as PostType } from '@models/post';

import { HeartIcon } from 'lucide-react-native';

import { Box, Text, ThemeProps } from '@theme/index';

export function Post({ post }: { post: PostType }) {
  const [liked, setLiked] = useState(false);
  const theme = useTheme<ThemeProps>();
  const { primary, mainBackground, bgInput } = theme.colors;

  const formattedCreatedAt = formatDistanceToNow(new Date(post.created_at), {
    addSuffix: true,
    locale: ptBR,
  });

  return (
    <Box style={styles.post_container}>
      <Box flexDirection="row" mb="1" gap="2" alignItems="center">
        {post.author?.profile_img ? (
          <Image
            style={styles.avatar}
            source={{ uri: post.author.profile_img }}
          />
        ) : (
          <Box style={{ backgroundColor: bgInput, ...styles.avatar }} />
        )}
        <Text style={{ flex: 1 }} numberOfLines={1} ellipsizeMode="tail">
          {post.author?.name}
        </Text>
        <Text variant="text_xs" color="mutedForeground">
          {formattedCreatedAt}
        </Text>
      </Box>
      <Box flexDirection="row">
        <Box width={1} height="100%" bg="bgInput" mx="3" />
        <Text style={{ flex: 1, opacity: 0.6 }}>{post.content}</Text>
      </Box>
      <Box flexDirection="row" alignItems="center" pt="3" px="6">
        <TouchableOpacity onPress={() => setLiked(prev => !prev)}>
          <Box flexDirection="row" alignItems="center" gap="1">
            <Text variant="text_sm">
              {!liked ? post.likes : post.likes + 1}
            </Text>
            <HeartIcon
              color={primary}
              fill={liked ? primary : mainBackground}
              size={14}
            />
          </Box>
        </TouchableOpacity>
      </Box>
    </Box>
  );
}

const styles = StyleSheet.create({
  avatar: {
    width: 24,
    height: 24,
    borderRadius: 9999,
  },
  post_container: {},
});
