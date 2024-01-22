import { Text, TouchableOpacity, View } from 'react-native';

import { useNavigation } from '@react-navigation/native';

import { AppNavigationRoutesProps } from '@routes/app.routes';

export function Profile() {
  const navigation = useNavigation<AppNavigationRoutesProps>();

  function handleNavigateToEditProfile() {
    navigation.navigate('EditProfile');
  }

  return (
    <View
      style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        gap: 100,
      }}>
      <Text>Profile</Text>
      <TouchableOpacity onPress={handleNavigateToEditProfile}>
        <Text>Editar Perfil</Text>
      </TouchableOpacity>
    </View>
  );
}
