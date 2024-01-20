import { Text, TextProps, View } from 'react-native';

type InputErrorMessageProps = TextProps & {
  message?: string;
};

export function InputErrorMessage({ message }: InputErrorMessageProps) {
  return (
    <View>
      <Text>{message || ''}</Text>
    </View>
  );
}
