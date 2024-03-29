import { useEffect, useState } from 'react';
import { TextInput, TouchableOpacity, View } from 'react-native';

import { useTheme } from '@shopify/restyle';
import { useBoundStore } from '@store/index';
import { v4 as uuidv4 } from 'uuid';

import { Comment as CommentType, CreateComment } from '@models/comment';
import { createComment, getComments } from '@services/api';

import { Box, Text, ThemeProps } from '@theme/index';

import { Comment } from '@components/Comment';
import { Loading } from '@components/Loadig';

type CommentSectionType = {
  contentId: string;
  initialOpen: boolean; // Corrigido para boolean
  type: 'post' | 'article' | 'video_content' | 'audio_content';
  toggable: boolean;
};

export function CommentSection({
  contentId,
  initialOpen,
  type,
  toggable,
}: CommentSectionType) {
  const [comments, setComments] = useState<CommentType[]>();
  const [inputValue, setInputValue] = useState<string>(); // Corrigido para string
  const [isOpen, setIsOpen] = useState<boolean>(initialOpen);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const user = useBoundStore(state => state.user);

  async function handleGetPosts() {
    setIsLoading(true);
    try {
      const data = await getComments(contentId);
      setComments(data);
    } catch (error) {
      // Trate o erro conforme necessário
    } finally {
      setIsLoading(false);
    }
  }

  const theme = useTheme<ThemeProps>();
  const { bgInput, primary } = theme.colors;

  async function handleCreateComment() {
    const tempCommentId = uuidv4();

    const tempComment = {
      id: tempCommentId,
      content: inputValue,
      likes: 0,
      author_id: user?.id,
      created_at: new Date(),
      updated_at: new Date(),
    };

    //@ts-ignore
    setComments(prev => [tempComment, ...prev]);
    setInputValue('');

    const data: CreateComment = {
      user_id: user?.id || '',
      content: inputValue || '',
      content_id: contentId,
      content_type: type,
    };

    try {
      const createdComment = await createComment(data);

      setComments(prev =>
        prev?.map(comment =>
          comment.id === tempCommentId ? createdComment : comment,
        ),
      );
    } catch (error) {
      console.error('Error creating comment:', error);
      setComments(prev =>
        prev?.filter(comment => comment.id !== tempCommentId),
      );
    }
  }

  useEffect(() => {
    if (!toggable) {
      setIsOpen(true);
    }

    handleGetPosts();
  }, []);

  return (
    <View style={{ paddingBottom: 20, paddingHorizontal: 10 }}>
      {toggable && (
        <TouchableOpacity onPress={() => setIsOpen(prev => !prev)}>
          <Text>{isOpen ? 'Esconder Comentários' : 'Ver Comentários'}</Text>
        </TouchableOpacity>
      )}
      {isOpen && (
        <View>
          {isLoading ? (
            <Loading />
          ) : (
            <View>
              <Box flexDirection="row" alignItems="center" gap="2">
                <TextInput
                  style={{
                    backgroundColor: bgInput,
                    flex: 1,
                    padding: 10,
                    borderRadius: 20,
                    paddingHorizontal: 20,
                  }}
                  placeholder="Deixe um comentário"
                  value={inputValue}
                  onChangeText={text => setInputValue(text)}
                />
                <TouchableOpacity
                  style={{
                    backgroundColor: primary,
                    padding: 10,
                    borderRadius: 20,
                    paddingHorizontal: 20,
                  }}
                  disabled={!inputValue}
                  onPress={handleCreateComment}>
                  <Text>Comentar</Text>
                </TouchableOpacity>
              </Box>
              <View style={{ paddingHorizontal: 30, marginTop: 30 }}>
                {comments?.map(comment => (
                  <Comment key={comment.id} comment={comment} />
                ))}
              </View>
            </View>
          )}
        </View>
      )}
    </View>
  );
}
