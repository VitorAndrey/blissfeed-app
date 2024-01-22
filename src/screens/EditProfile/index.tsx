import { Text, TouchableOpacity, View } from 'react-native';

import { useBoundStore } from '@store/index';

export function EditProfile() {
  const handleLogOut = useBoundStore(state => state.handleLogOut);
  const handleHaventSeenOnboarding = useBoundStore(
    state => state.handleHaventSeenOnboarding,
  );

  function handleLogOutAndHeventSeenOnboarding() {
    handleLogOut();
    handleHaventSeenOnboarding();
  }

  return (
    <View
      style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        gap: 100,
      }}>
      <Text>EditProfile</Text>
      <TouchableOpacity onPress={handleLogOutAndHeventSeenOnboarding}>
        <Text>Sair</Text>
      </TouchableOpacity>
    </View>
  );
}
