import { TextInput, TextInputProps } from 'react-native';

type FormInputProps = TextInputProps & {};

export function FormInput({ ...rest }: FormInputProps) {
  return <TextInput {...rest} />;
}
