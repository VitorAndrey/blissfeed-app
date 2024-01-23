import React from 'react';
import { Image, StyleSheet } from 'react-native';

import { Article as ArticleType } from '@models/article';

import { Box, Text } from '@theme/index';

export function Article({ article }: { article: ArticleType }) {
  return (
    <Box flexDirection="row" gap="4" alignItems="center">
      <Image style={styles.image} source={{ uri: article.cover_img }} />
      <Box flex={1} gap="1">
        <Text numberOfLines={1}>{article.title}</Text>
        <Text color="mutedForeground" variant="text_xs" numberOfLines={1}>
          {article.author_name}
        </Text>
      </Box>
    </Box>
  );
}

const styles = StyleSheet.create({
  image: {
    width: 50,
    height: 50,
    borderRadius: 18,
  },
});
