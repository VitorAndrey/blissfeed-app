import {
  StyleSheet,
  TouchableOpacity,
  TouchableOpacityProps,
} from 'react-native';

import { useTheme } from '@shopify/restyle';

import { Text, ThemeProps } from '@theme/index';

type ButtonProps = TouchableOpacityProps & {
  label: string;
  variant: 'primary' | 'link';
};

export function Button({ label, variant, disabled, ...rest }: ButtonProps) {
  const theme = useTheme<ThemeProps>();
  const { primary } = theme.colors;
  const opacity = disabled ? 0.5 : 1;
  console.log(opacity);

  if (variant === 'link') {
    return (
      <TouchableOpacity {...rest} activeOpacity={0.8}>
        <Text style={{ color: primary, ...styles.linkText }}>{label}</Text>
      </TouchableOpacity>
    );
  }

  return (
    <TouchableOpacity
      style={{
        backgroundColor: primary,
        ...styles.primary_button,
        opacity,
      }}
      {...rest}
      activeOpacity={0.8}>
      <Text color="secondaryForeground">{label}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  primary_button: {
    borderRadius: 9999,
    height: 50,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  linkText: {
    textDecorationLine: 'underline',
  },
});
