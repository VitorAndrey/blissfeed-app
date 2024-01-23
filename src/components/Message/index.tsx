import React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';

import { useBoundStore } from '@store/index';

import { Message as MessageType } from '@models/message';
import { createPost } from '@services/api';

import { Box, Text } from '@theme/index';

export function Message({ message }: { message: MessageType }) {
  const user = useBoundStore(state => state.user);
  const { publishable } = message;

  async function handleCreatePost() {
    createPost({ user_id: user?.id || '', content: message.content });
  }

  if (message.sent_by_user) {
    return (
      <Box
        bg="primary"
        flexDirection="row"
        alignSelf="flex-end"
        style={styles.message}>
        <Text color="white">{message.content}</Text>
        {publishable && (
          <TouchableOpacity onPress={handleCreatePost}>
            <Text color="primary" fontFamily="Inter-Bold">
              Post
            </Text>
          </TouchableOpacity>
        )}
      </Box>
    );
  }

  return (
    <Box bg="bgInput" alignSelf="flex-start" style={styles.message}>
      <Text>{message.content}</Text>
    </Box>
  );
}

const styles = StyleSheet.create({
  message: {
    maxWidth: '80%',
    borderRadius: 20,
    paddingVertical: 10,
    paddingHorizontal: 15,
  },
});
