import { useState } from 'react';
import { Image, StyleSheet, TouchableOpacity } from 'react-native';

import { useTheme } from '@shopify/restyle';
import { formatDistanceToNow } from 'date-fns';
import { ptBR } from 'date-fns/locale';

import { Comment as CommentType } from '@models/comment';

import { HeartIcon } from 'lucide-react-native';

import { Box, Text, ThemeProps } from '@theme/index';

export function Comment({ comment }: { comment: CommentType }) {
  const [liked, setLiked] = useState(false);
  const theme = useTheme<ThemeProps>();
  const { primary, mainBackground, bgInput } = theme.colors;

  const formattedCreatedAt = formatDistanceToNow(new Date(comment.created_at), {
    addSuffix: true,
    locale: ptBR,
  });

  return (
    <Box style={styles.comment_container}>
      <Box flexDirection="row" mb="1" gap="2" alignItems="center">
        {comment.author?.profile_img ? (
          <Image
            style={styles.avatar}
            source={{ uri: comment.author.profile_img }}
          />
        ) : (
          <Box style={{ backgroundColor: bgInput, ...styles.avatar }} />
        )}
        <Text style={{ flex: 1 }} numberOfLines={1} ellipsizeMode="tail">
          {comment.author?.name}
        </Text>
        <Text variant="text_xs" color="mutedForeground">
          {formattedCreatedAt}
        </Text>
      </Box>
      <Box flexDirection="row">
        <Box width={1} height="100%" bg="bgInput" mx="3" />
        <Text style={{ flex: 1, opacity: 0.6 }}>{comment.content}</Text>

        <TouchableOpacity
          style={styles.like_button}
          onPress={() => setLiked(prev => !prev)}>
          <Box flexDirection="row" alignItems="center" gap="1">
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
  comment_container: {},
  like_button: {
    alignSelf: 'center',
  },
});
