import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

import { useBoundStore } from '@store/index';

export function EditProfile() {
  const handleLogOut = useBoundStore(state => state.handleLogOut);
  const user = useBoundStore(state => state.user);
  const handleHaventSeenOnboarding = useBoundStore(
    state => state.handleHaventSeenOnboarding,
  );

  function handleLogOutAndHaventSeenOnboarding() {
    handleLogOut();
    handleHaventSeenOnboarding();
  }

  return (
    <View style={{ flex: 1, padding: 16 }}>
      <Text style={{ fontSize: 24, fontWeight: 'bold', marginBottom: 16 }}>
        Edit Profile
      </Text>

      {user && (
        <View>
          <Text>Name: {user.name}</Text>
          <Text>Email: {user.email}</Text>
          <Text>Phone Number: {user.phone_number || 'N/A'}</Text>
          <Text>
            Birth Date:{' '}
            {user.birth_date ? user.birth_date.toDateString() : 'N/A'}
          </Text>
          <Text>Created At: {user.created_at.toDateString()}</Text>
        </View>
      )}

      <TouchableOpacity
        onPress={handleLogOutAndHaventSeenOnboarding}
        style={{
          marginTop: 24,
          backgroundColor: 'red',
          padding: 12,
          borderRadius: 8,
          alignItems: 'center',
        }}>
        <Text style={{ color: 'white', fontWeight: 'bold' }}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
}
