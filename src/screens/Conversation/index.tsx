import {Button} from 'react-native';

import {useCreatePost} from '@services/mutations';

export function Conversation() {
  const createPostMutation = useCreatePost();

  const data = {
    id: '1',
    content: 'comment',
  };

  function handleCreatePost() {
    createPostMutation.mutate(data);
  }

  return <Button onPress={handleCreatePost} title="Criar post" />;
}
