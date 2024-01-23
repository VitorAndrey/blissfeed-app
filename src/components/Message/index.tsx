import React from 'react';
import { StyleSheet } from 'react-native';

import { Message as MessageType } from '@models/message';

import { Box, Text } from '@theme/index';

export function Message({ message }: { message: MessageType }) {
  if (message.sent_by_user) {
    return (
      <Box bg="primary" alignSelf="flex-end" style={styles.message}>
        <Text color="white">{message.content}</Text>
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
