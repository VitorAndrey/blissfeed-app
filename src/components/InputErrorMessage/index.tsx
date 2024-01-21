import { TextProps } from 'react-native';

import { Box, Text } from '@theme/index';

type InputErrorMessageProps = TextProps & {
  message?: string;
};

export function InputErrorMessage({ message }: InputErrorMessageProps) {
  return (
    <Box height={28} px="2" justifyContent="flex-start">
      <Text color="danger">{message || ''}</Text>
    </Box>
  );
}
