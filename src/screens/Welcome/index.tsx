import { Image, TouchableOpacity } from 'react-native';

import { useNavigation } from '@react-navigation/native';

import { AuthNavigationRoutesProps } from '@routes/auth.routes';

import { Box, Text } from '@theme/index';

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
    <Box flex={1} py="8">
      <Box
        flexDirection="row"
        alignItems="center"
        justifyContent="center"
        gap="2">
        <Box height={32} width={32} borderRadius={50} bg="mainForeground" />
        <Text variant="text_3xl">Blissfeed</Text>
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

      <Box alignItems="center" px="3">
        <Text mb="2" style={{ maxWidth: 180 }} textAlign="center">
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
          <Text mr="1">Já tem uma conta?</Text>
          <TouchableOpacity onPress={handleNavigateToLogin}>
            <Text>Entrar!</Text>
          </TouchableOpacity>
        </Box>
      </Box>
    </Box>
  );
}
