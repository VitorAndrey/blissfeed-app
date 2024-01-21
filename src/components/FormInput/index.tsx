import { StyleSheet, TextInput, TextInputProps } from 'react-native';

import { useTheme } from '@shopify/restyle';

import { ThemeProps } from '@theme/index';

type FormInputProps = TextInputProps & {};

export function FormInput({ ...rest }: FormInputProps) {
  const theme = useTheme<ThemeProps>();
  const { bgInput } = theme.colors;

  return (
    <TextInput
      {...rest}
      style={{ backgroundColor: bgInput, ...styles.input }}
    />
  );
}

const styles = StyleSheet.create({
  input: {
    paddingHorizontal: 20,
    borderRadius: 15,
    height: 50,
    width: '100%',
  },
});
