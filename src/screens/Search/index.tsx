import { useRef, useState } from 'react';
import { FlatList, Keyboard, TextInput, TouchableOpacity } from 'react-native';

import { useNavigation } from '@react-navigation/native';
import { useBoundStore } from '@store/index';

import { AppNavigationRoutesProps } from '@routes/app.routes';
import { Article } from '@models/article';

import { ArrowLeft } from 'lucide-react-native';

import { Box } from '@theme/index';

export function Search() {
  const [inputValue, setInputValue] = useState<string>('');

  const inputRef = useRef<TextInput>(null);
  const navigation = useNavigation<AppNavigationRoutesProps>();
  const isSearching = useBoundStore(state => state.isSearchInputFocused);
  const handleStartSearching = useBoundStore(
    state => state.handleSearchInputFocus,
  );
  const handleStopSearching = useBoundStore(
    state => state.handleSearchInputBlur,
  );

  function handleOpenArticle(article: Article) {
    navigation.navigate('Article', { article });
  }

  function handleBackArrow() {
    Keyboard.dismiss();
    handleStopSearching();
  }

  return (
    <Box>
      <Box flexDirection="row" alignItems="center" px="4">
        {isSearching && (
          <TouchableOpacity
            onPress={handleBackArrow}
            style={{
              alignItems: 'center',
              justifyContent: 'center',
              paddingVertical: 8,
              paddingRight: 8,
            }}>
            <ArrowLeft color={'black'} />
          </TouchableOpacity>
        )}

        <TextInput
          ref={inputRef}
          onFocus={handleStartSearching}
          placeholder="Search"
          value={inputValue}
          onChangeText={setInputValue}
          style={{
            height: 40,
            flex: 1,
            borderRadius: 9999,
            paddingHorizontal: 24,
          }}
        />
      </Box>

      {/* <FlatList data={data} renderItem={renderPostItem} style={{ flex: 1 }} /> */}
    </Box>
  );
}
