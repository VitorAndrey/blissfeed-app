import React from 'react';
import {
  Image,
  Linking,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
} from 'react-native';

import { formatDistanceToNow } from 'date-fns';

import { Article as ArticleType } from '@models/article';

interface ArticleProps {
  route: {
    params: {
      article: ArticleType;
    };
  };
}

export function Article({ route }: ArticleProps) {
  const { article } = route.params;

  const formattedDate = formatDistanceToNow(new Date(article.created_at), {
    addSuffix: true,
  });

  const handleReadMore = () => {
    Linking.openURL(article.article_url);
  };

  return (
    <ScrollView style={styles.container}>
      <Image source={{ uri: article.cover_img }} style={styles.coverImage} />

      <Text style={styles.title}>{article.title}</Text>

      <Text style={styles.authorDate}>
        {`By ${article.author_name} • ${formattedDate}`}
      </Text>

      <Text style={styles.content}>{article.content}</Text>

      <TouchableOpacity onPress={handleReadMore} style={styles.readMoreButton}>
        <Text style={styles.readMoreText}>Saiba Mais</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 8,
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
    backgroundColor: 'blue',
    borderRadius: 5,
  },
  readMoreText: {
    color: 'white',
  },
});
