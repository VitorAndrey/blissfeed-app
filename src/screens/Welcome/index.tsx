import { Image, TouchableOpacity } from 'react-native';

import { useNavigation } from '@react-navigation/native';

const welcomeImage = require('../../assets/images/welcome.png');

const Box = createBox<ThemeProps>();
const Text = createText<ThemeProps>();

import { createBox, createText } from '@shopify/restyle';

import { AuthNavigationRoutesProps } from '@routes/auth.routes';

import { ThemeProps } from '@theme/index';

export function Welcome() {
  const navigation = useNavigation<AuthNavigationRoutesProps>();

  function handleNavigateToRegister() {
    navigation.navigate('Register');
  }

  function handleNavigateToLogin() {
    navigation.navigate('Login');
  }

  return (
    <Box flex={1} py="xl">
      <Box
        flexDirection="row"
        alignItems="center"
        justifyContent="center"
        gap="sm">
        <Box height={32} width={32} borderRadius={50} bg="mainForeground" />
        <Text variant="header">Blissfeed</Text>
      </Box>

      <Box flex={1}>
        <Image
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'contain',
          }}
          source={welcomeImage}
        />
      </Box>

      <Box alignItems="center" px="md">
        <Text mb="sm" style={{ maxWidth: 180 }} textAlign="center">
          Compartilhe <Text>Paz </Text>
          Cultive
          <Text> Alegria</Text>
        </Text>

        <Text textAlign="center">
          Do desabafo à serenidade, da partilha à alegria. Compartilhe amor com
          Blissfeed.
        </Text>

        <TouchableOpacity onPress={handleNavigateToRegister}>
          <Text>Vamos começar!</Text>
        </TouchableOpacity>

        <Box flexDirection="row" alignItems="center" justifyContent="center">
          <Text mr="xs">Já tem uma conta?</Text>
          <TouchableOpacity onPress={handleNavigateToLogin}>
            <Text>Entrar!</Text>
          </TouchableOpacity>
        </Box>
      </Box>
    </Box>
  );
}
