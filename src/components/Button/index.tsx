import {
  StyleSheet,
  TouchableOpacity,
  TouchableOpacityProps,
} from 'react-native';

import { useTheme } from '@shopify/restyle';

import { Text, ThemeProps } from '@theme/index';

type ButtonProps = TouchableOpacityProps & {
  label?: string;
  variant: 'primary' | 'link' | 'icon';
  children?: React.ReactNode;
  disabled?: boolean;
};

export function Button({
  label = 'Button',
  variant,
  children,
  ...rest
}: ButtonProps) {
  const theme = useTheme<ThemeProps>();
  const { primary } = theme.colors;

  if (variant === 'link') {
    return (
      <TouchableOpacity {...rest} activeOpacity={0.8}>
        <Text style={{ color: primary, ...styles.linkText }}>{label}</Text>
      </TouchableOpacity>
    );
  }

  if (variant === 'icon') {
    return (
      <TouchableOpacity
        style={styles.icon_button}
        {...rest}
        activeOpacity={0.8}>
        {children}
      </TouchableOpacity>
    );
  }

  return (
    <TouchableOpacity
      style={{
        backgroundColor: primary,
        ...styles.primary_button,
      }}
      {...rest}
      activeOpacity={0.8}>
      <Text variant="button_primary">{label}</Text>
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
    paddingVertical: 10,
  },
  icon_button: {
    borderWidth: 1,
    width: '100%',
    height: '100%',
  },
});
