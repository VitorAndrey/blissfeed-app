import { Image, StyleSheet } from 'react-native';

import { useNavigation } from '@react-navigation/native';

import { AuthNavigationRoutesProps } from '@routes/auth.routes';

import { Box, Text } from '@theme/index';

import { BlissFeedHeader } from '@components/BlissfeedHeader/intex';
import { Button } from '@components/Button';

const welcomeImage = require('../../assets/images/welcome.png');

export function Welcome() {
  const navigation = useNavigation<AuthNavigationRoutesProps>();

  function handleNavigateToRegister() {
    navigation.navigate('Register');
  }

  function handleNavigateToLogin() {
    navigation.navigate('Login');
  }

  return (
    <Box flex={1} pb="10">
      <BlissFeedHeader />

      <Box flex={1}>
        <Image style={styles.mainImage} source={welcomeImage} />
      </Box>

      <Box alignItems="center" px="4">
        <Text textAlign="center" variant="heading">
          Compartilhe{' '}
          <Text variant="heading" color="primary">
            Paz{' '}
          </Text>
        </Text>
        <Text textAlign="center" variant="heading" mb="4">
          Cultive
          <Text variant="heading" color="primary">
            {' '}
            Alegria
          </Text>
        </Text>

        <Text textAlign="center" color="mutedForeground">
          Do desabafo à serenidade, da partilha à alegria.
        </Text>
        <Text textAlign="center" color="mutedForeground">
          Compartilhe amor com Blissfeed.
        </Text>

        <Box width={350} my="5">
          <Button
            variant="primary"
            onPress={handleNavigateToRegister}
            label="Vamos começar!"
          />
        </Box>

        <Box flexDirection="row" alignItems="center" justifyContent="center">
          <Text mr="1" color="mutedForeground">
            Já tem uma conta?
          </Text>
          <Button
            variant="link"
            onPress={handleNavigateToLogin}
            label="Entrar!"
          />
        </Box>
      </Box>
    </Box>
  );
}

const styles = StyleSheet.create({
  mainImage: {
    width: '100%',
    maxWidth: 400,
    height: '100%',
    alignSelf: 'center',
    objectFit: 'contain',
  },
  w_200: {
    maxWidth: 200,
  },
});
