import { useRef, useState } from 'react';
import {
  Animated,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  View,
  ViewToken,
} from 'react-native';

import { useNavigation } from '@react-navigation/native';
import { useTheme } from '@shopify/restyle';
import { useBoundStore } from '@store/index';

import { AppNavigationRoutesProps } from '@routes/app.routes';

import { ArrowLeftIcon, ArrowRightIcon, CheckIcon } from 'lucide-react-native';

import { Box, ThemeProps } from '@theme/index';

import { Button } from '@components/Button';
import { OnBoardingItem } from '@components/OnboardingItem.ts';
import { Paginator } from '@components/Paginator';

const onboarding_1 = require('../../assets/images/onboarding1.png');
const onboarding_2 = require('../../assets/images/onboarding2.png');
const onboarding_3 = require('../../assets/images/onboarding3.png');

type ViewableItemsType = {
  viewableItems: ViewToken[];
  changed: ViewToken[];
};

export function Onboarding() {
  const [currentIndex, setCurrentIndex] = useState<number | null>(0);
  const navigation = useNavigation<AppNavigationRoutesProps>();

  const theme = useTheme<ThemeProps>();
  const { primary } = theme.colors;

  const scrollX = useRef<Animated.Value>(new Animated.Value(0)).current;
  const slidesRef = useRef<FlatList>(null);

  const handleAlreadySeenOnboarding = useBoundStore(
    state => state.handleAlreadySeenOnboarding,
  );

  const viewableItemsChanged = useRef(
    ({ viewableItems }: ViewableItemsType) => {
      setCurrentIndex(viewableItems[0].index);
    },
  ).current;

  const viewConfig = useRef({ viewAreaCoveragePercentThreshold: 50 }).current;

  const data = [
    {
      id: '1',
      title: 'Todos nós temos problemas... ',
      description:
        'A cada ano, a cada dia, você percebe que está ficando mais difícil; deixe-nos ajudar. Aqui é o seu novo lugar para respirar fundo e calcular o próximo passo.',
      image: onboarding_1,
    },
    {
      id: '2',
      title: 'Receba o Apoio que precisa.',
      description:
        'Com hábitos certos, sua vida fica mais leve e feliz. Gerencie sua rotina e sua felicidade juntamente com os nossos voluntários.',
      image: onboarding_2,
    },
    {
      id: '3',
      title: 'Relaxe com o futuro.',
      description:
        'Nós estamos integrados com inteligências artificiais para melhorar sua experiência; elas o ajudarão em sua jornada em nosso aplicativo :)',
      image: onboarding_3,
    },
  ];

  function scrollForwards() {
    if (currentIndex === null || !slidesRef.current) {
      return;
    }

    if (currentIndex < data.length - 1) {
      slidesRef.current.scrollToIndex({ index: currentIndex + 1 });
    } else {
      handleNavigateToFeed();
    }
  }

  function scrollBackwards() {
    if (currentIndex === null || !slidesRef.current) {
      return;
    }

    if (currentIndex !== 0) {
      slidesRef.current.scrollToIndex({ index: currentIndex - 1 });
    } else {
      return;
    }
  }

  async function handleNavigateToFeed() {
    await handleAlreadySeenOnboarding();
    navigation.navigate('Feed');
  }

  return (
    <Box flex={1} alignItems="center" justifyContent="center">
      <Box p="4" alignSelf="flex-end">
        <Button variant="link" label="Skip" onPress={handleNavigateToFeed} />
      </Box>

      <FlatList
        data={data}
        keyExtractor={item => item.id}
        renderItem={({ item }) => <OnBoardingItem data={item} />}
        horizontal
        showsHorizontalScrollIndicator={false}
        pagingEnabled
        overScrollMode="never"
        bounces={false}
        contentContainerStyle={{
          flexGrow: 1,
        }}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { x: scrollX } } }],
          { useNativeDriver: false },
        )}
        scrollEventThrottle={32}
        onViewableItemsChanged={viewableItemsChanged}
        viewabilityConfig={viewConfig}
        ref={slidesRef}
      />

      <Box flexDirection="row" p="10">
        <Box
          height={50}
          width={50}
          borderWidth={currentIndex !== 0 ? 1 : 0}
          borderColor="primary"
          borderRadius="rounded_full">
          {currentIndex !== 0 && (
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={scrollBackwards}
              style={styles.iconButton}>
              <ArrowLeftIcon color={primary} size={20} />
            </TouchableOpacity>
          )}
        </Box>

        <View style={{ flex: 1 }}>
          <Paginator data={data} scrollX={scrollX} />
        </View>

        <Box height={50} width={50} bg="primary" borderRadius="rounded_full">
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={scrollForwards}
            style={styles.iconButton}>
            {currentIndex === data.length - 1 ? (
              <CheckIcon color={'white'} size={20} />
            ) : (
              <ArrowRightIcon color={'white'} size={20} />
            )}
          </TouchableOpacity>
        </Box>
      </Box>
    </Box>
  );
}

const styles = StyleSheet.create({
  iconButton: {
    height: '100%',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 9999,
  },
});
