import React, { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  FlatList,
  Keyboard,
  Linking,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from 'react-native';

import { useNavigation } from '@react-navigation/native';
import { useTheme } from '@shopify/restyle';
import { useBoundStore } from '@store/index';
import { v4 as uuidv4 } from 'uuid';

import { Message as MessageType } from '@models/message';
import { conversation } from '@services/api';

import { Mic, MicOff, PhoneIcon, SendHorizonal, X } from 'lucide-react-native';

import { Box, Text, ThemeProps } from '@theme/index';

import { Message } from '@components/Message';

import { storage } from '../../../App';

type PostableStatus = true | false | 'pending';

export function Conversation() {
  const [isRecording, setIsRecording] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>();
  const [inputValue, setInputValue] = useState<string>('');
  const [messageList, setMessageList] = useState<MessageType[]>(
    JSON.parse(storage.getString('@blissfeed:messages') || JSON.stringify([])),
  );

  const user = useBoundStore(state => state.user);
  const conversationState = useBoundStore(state => state.conversation);
  const navigation = useNavigation();
  const theme = useTheme<ThemeProps>();
  const { primary, mainForeground, mutedForeground } = theme.colors;

  useEffect(() => {
    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      () => {
        inputRef && inputRef.blur();
      },
    );

    return () => {
      keyboardDidHideListener.remove();
    };
  }, []);

  function handleIsRecording() {
    setInputValue('');
    setIsRecording(prev => !prev);
  }

  function handleGoBack() {
    navigation.goBack();
  }

  async function handleSendMessage() {
    if (!user?.id) {
      return;
    }

    setIsLoading(true);
    setInputValue('');
    const userMessage: MessageType = {
      id: uuidv4(),
      content: inputValue,
      timestamp: new Date(),
      publishable: 'pending',
      sent_by_user: true,
      conversation_id: conversationState?.id || '',
    };

    handleAddMessageToList(userMessage);

    const { response, postable } = await conversation({
      message: userMessage.content,
      user_id: user.id,
    });

    const gptMessage: MessageType = {
      id: uuidv4(),
      content: response ? response : 'Minha internet está lenta, desculpe.',
      timestamp: new Date(),
      publishable: false,
      sent_by_user: false,
      conversation_id: conversationState?.id || '',
    };

    handleAddMessageToList(gptMessage);

    handleUpdatePostableStatys({ messageId: userMessage.id, status: postable });

    try {
    } catch (error) {
      Alert.alert('Erro ao enviar menssagem');
    } finally {
      setIsLoading(false);
    }
  }

  function handleAddMessageToList(message: MessageType) {
    setMessageList(prev => {
      storage.set('@blissfeed:messages', JSON.stringify([...prev, message]));
      return [...prev, message];
    });
  }

  function handleUpdatePostableStatys(data: {
    messageId: string;
    status: PostableStatus;
  }) {
    setMessageList(prev =>
      prev.map(message =>
        message.id === data.messageId
          ? { ...message, publishable: data.status }
          : message,
      ),
    );
  }

  const backgroundColor = inputValue ? primary : mutedForeground;

  function handleStartCall() {
    const phoneNumber = '188';

    Linking.openURL(`tel:${phoneNumber}`);
  }

  let inputRef: TextInput | null = null;

  return (
    <Box flex={1} pt="2">
      <Box
        flexDirection="row"
        alignItems="center"
        gap="3"
        px="4"
        py="3"
        bg="bgInput">
        <TouchableOpacity style={styles.icon_btn} onPress={handleGoBack}>
          <X color={mainForeground} size={22} />
        </TouchableOpacity>

        <Text style={{ flex: 1 }}>Nova Conversa</Text>

        <TouchableOpacity style={styles.icon_btn} onPress={handleStartCall}>
          <PhoneIcon color={mainForeground} size={22} />
        </TouchableOpacity>
      </Box>

      <FlatList
        data={messageList}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }: { item: MessageType }) => (
          <Message key={item.id} message={item} />
        )}
        contentContainerStyle={styles.contentContainerStyle}
      />

      <Box flexDirection="row" alignItems="flex-end" gap="2" p="2">
        <Box
          flex={1}
          flexDirection="row"
          alignItems="center"
          borderRadius="rounded_3xl"
          px="5"
          bg="bgInput">
          <TouchableOpacity style={styles.mic_btn} onPress={handleIsRecording}>
            {isRecording ? (
              <MicOff color="black" size={20} />
            ) : (
              <Mic color="black" size={20} />
            )}
          </TouchableOpacity>
          <TextInput
            ref={ref => (inputRef = ref)}
            style={styles.input}
            multiline={true}
            editable={!isRecording}
            value={inputValue}
            onChangeText={setInputValue}
          />
        </Box>

        <TouchableOpacity
          onPress={handleSendMessage}
          disabled={!inputValue || isLoading}
          style={{
            backgroundColor,
            ...styles.send_button,
          }}>
          {isLoading ? (
            <ActivityIndicator color={mainForeground} size={20} />
          ) : (
            <SendHorizonal color={mainForeground} size={20} />
          )}
        </TouchableOpacity>
      </Box>
    </Box>
  );
}

const styles = StyleSheet.create({
  send_button: {
    height: 50,
    width: 50,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 999,
    paddingLeft: 1,
  },
  input: {
    maxHeight: 125,
    minHeight: 50,
    flex: 1,
    paddingHorizontal: 12,
    paddingLeft: 0,
    paddingVertical: 8,
  },
  icon_btn: {
    padding: 10,
  },
  contentContainerStyle: {
    flexGrow: 1,
    gap: 10,
    paddingVertical: 30,
    paddingHorizontal: 20,
  },
  mic_btn: {
    marginLeft: -20,
    borderTopLeftRadius: 25,
    borderBottomLeftRadius: 25,
    height: 50,
    width: 50,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'flex-end',
  },
});
