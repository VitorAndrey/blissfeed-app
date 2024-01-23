import { useEffect, useRef, useState } from 'react';
import {
  FlatList,
  Keyboard,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from 'react-native';

import { useNavigation } from '@react-navigation/native';
import { useTheme } from '@shopify/restyle';
import { useBoundStore } from '@store/index';

import { AppNavigationRoutesProps } from '@routes/app.routes';
import { Article as AticleType } from '@models/article';
import { useArticles } from '@services/queries';

import { ArrowLeft } from 'lucide-react-native';

import { Box, ThemeProps } from '@theme/index';

import { Article } from '@components/Article';

export function Search() {
  const [inputValue, setInputValue] = useState<string>('');
  const [filteredArticles, setFilteredArticles] = useState<AticleType[]>([]);

  const { data: articles } = useArticles();
  const inputRef = useRef<TextInput>(null);
  const theme = useTheme<ThemeProps>();
  const { mainForeground, bgInput } = theme.colors;
  const navigation = useNavigation<AppNavigationRoutesProps>();
  const isSearching = useBoundStore(state => state.isSearchInputFocused);
  const handleStartSearching = useBoundStore(
    state => state.handleSearchInputFocus,
  );
  const handleStopSearching = useBoundStore(
    state => state.handleSearchInputBlur,
  );

  function handleOpenArticle(article: AticleType) {
    navigation.navigate('Article', { article });
  }

  function handleBackArrow() {
    Keyboard.dismiss();
    handleStopSearching();
  }

  function handleUpdateFilteredArticlesList() {
    if (!articles || articles.length < 1) {
      return setFilteredArticles([]);
    }

    if (!inputValue) {
      return setFilteredArticles(articles);
    }

    const filtered = articles.filter(article =>
      article.title.toLowerCase().includes(inputValue.toLowerCase()),
    );

    setFilteredArticles(filtered);
  }

  useEffect(() => {
    handleUpdateFilteredArticlesList();
  }, [inputValue]);

  return (
    <Box flex={1}>
      <Box py="10" flexDirection="row" alignItems="center" px="4">
        {isSearching && (
          <TouchableOpacity
            onPress={handleBackArrow}
            style={styles.back_button}>
            <ArrowLeft color={mainForeground} size={22} />
          </TouchableOpacity>
        )}

        <TextInput
          ref={inputRef}
          onFocus={handleStartSearching}
          placeholder="Search"
          value={inputValue}
          onChangeText={setInputValue}
          style={{ backgroundColor: bgInput, ...styles.searchInput }}
        />
      </Box>

      <FlatList
        data={filteredArticles}
        showsVerticalScrollIndicator={false}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => handleOpenArticle(item)}>
            <Article article={item} />
          </TouchableOpacity>
        )}
        contentContainerStyle={styles.contentContainerStyle}
      />
    </Box>
  );
}

const styles = StyleSheet.create({
  contentContainerStyle: {
    flexGrow: 1,
    gap: 30,
    paddingBottom: 30,
    paddingHorizontal: 20,
  },
  back_button: {
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    paddingRight: 8,
  },
  searchInput: {
    height: 50,
    flex: 1,
    borderRadius: 9999,
    paddingHorizontal: 24,
  },
});
