import React from 'react';
import {
  Image,
  Linking,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';

import { useNavigation } from '@react-navigation/native';
import { useTheme } from '@shopify/restyle';
import { formatDistanceToNow } from 'date-fns';

import { Article as ArticleType } from '@models/article';

import { X } from 'lucide-react-native';

import { Box, Text, ThemeProps } from '@theme/index';

import { CommentSection } from '@components/CommentSection';

interface ArticleProps {
  route: {
    params: {
      article: ArticleType;
    };
  };
}

export function Article({ route }: ArticleProps) {
  const { article } = route.params;
  const theme = useTheme<ThemeProps>();
  const { mainForeground } = theme.colors;

  const formattedDate = formatDistanceToNow(new Date(article.created_at), {
    addSuffix: true,
  });

  const navigation = useNavigation();

  const handleReadMore = () => {
    Linking.openURL(article.article_url);
  };

  function handleGoBack() {
    navigation.goBack();
  }

  return (
    <View style={{ flex: 1 }}>
      <Box
        flexDirection="row"
        alignItems="center"
        gap="3"
        px="4"
        py="3"
        bg="bgInput">
        <TouchableOpacity style={styles.icon_btn} onPress={handleGoBack}>
          <X color={mainForeground} size={22} />
        </TouchableOpacity>
      </Box>
      <ScrollView style={styles.container}>
        <Image source={{ uri: article.cover_img }} style={styles.coverImage} />

        <Text style={styles.title}>{article.title}</Text>

        <Text style={styles.authorDate}>
          {`By ${article.author_name} • ${formattedDate}`}
        </Text>

        <Text style={styles.content}>{article.content}</Text>

        <TouchableOpacity
          onPress={handleReadMore}
          style={{ ...styles.readMoreButton }}>
          <Text style={styles.readMoreText} variant="link">
            Saiba Mais
          </Text>
        </TouchableOpacity>

        <CommentSection
          contentId={article.id}
          type="article"
          initialOpen
          toggable={false}
        />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: '100%',
  },
  coverImage: {
    width: '100%',
    height: 200,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    margin: 10,
  },
  authorDate: {
    marginHorizontal: 10,
    color: 'gray',
  },
  content: {
    margin: 10,
  },
  readMoreButton: {
    margin: 10,
    padding: 10,
    borderRadius: 15,
  },
  readMoreText: {
    color: 'white',
  },
  icon_btn: {
    padding: 10,
  },
});
