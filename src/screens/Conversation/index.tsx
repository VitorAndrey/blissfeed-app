import { useState } from 'react';
import { StyleSheet, TextInput, TouchableOpacity } from 'react-native';

import { useNavigation } from '@react-navigation/native';

// import { useCreatePost } from '@services/mutations';
import { Mic, MicOff, SendHorizonal, X } from 'lucide-react-native';

import { Box, Text } from '@theme/index';

import { Button } from '@components/Button';

export function Conversation() {
  const [isRecording, setIsRecording] = useState<boolean>(false);
  const [inputValue, setInputValue] = useState<string>('');

  const navigation = useNavigation();
  // const createPostMutation = useCreatePost();

  function handleIsRecording() {
    setInputValue('');
    setIsRecording(prev => !prev);
  }

  function handleGoBack() {
    navigation.goBack();
  }

  // const data = {
  //   id: '1',
  //   content: 'comment',
  // };

  // function handleCreatePost() {
  //   createPostMutation.mutate(data);
  // }

  const backgroundColor = inputValue ? '#ee99cc' : '#33aa44';

  return (
    <Box flex={1}>
      <Box flexDirection="row" alignItems="center" gap="3" px="4">
        <Button variant="icon" onPress={handleGoBack}>
          <X color="black" size={22} />
        </Button>

        <Text style={{ flex: 1 }}>Nova Conversa</Text>
      </Box>

      <Box flex={1} px="4" />

      <Box flexDirection="row" alignItems="flex-end" gap="2" p="2">
        <Box
          flex={1}
          flexDirection="row"
          alignItems="center"
          borderRadius="rounded_3xl"
          px="5"
          bg="bgInput">
          <TouchableOpacity
            style={{
              height: 32,
              justifyContent: 'center',
              alignSelf: 'flex-end',
            }}
            onPress={handleIsRecording}>
            {isRecording ? (
              <MicOff color="black" size={20} />
            ) : (
              <Mic color="black" size={20} />
            )}
          </TouchableOpacity>
          <TextInput
            style={styles.input}
            multiline={true}
            editable={!isRecording}
            value={inputValue}
            onChangeText={setInputValue}
          />
        </Box>

        <TouchableOpacity
          disabled={!inputValue}
          style={{
            backgroundColor,
            ...styles.send_button,
          }}>
          <SendHorizonal color="black" size={20} />
        </TouchableOpacity>
      </Box>
    </Box>
  );
}

const styles = StyleSheet.create({
  send_button: {
    height: 12,
    width: 12,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 999, // Use a large value for a rounded shape (React Native equivalent of 'rounded-full')
    paddingLeft: 1,
  },
  input: {
    maxHeight: 135,
    minHeight: 12,
    flex: 1,
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
});
