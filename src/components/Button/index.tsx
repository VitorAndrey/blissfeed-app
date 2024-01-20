import { TouchableOpacity } from 'react-native';

import {
  createRestyleComponent,
  createText,
  createVariant,
  spacing,
  SpacingProps,
  VariantProps,
} from '@shopify/restyle';

import { ThemeProps } from '@theme/index';

const Text = createText<ThemeProps>();

type BoxCustomProps = SpacingProps<ThemeProps> &
  VariantProps<ThemeProps, 'buttonVariants'>;

type ButtonProps = BoxCustomProps & {
  title: string;
  onPress?: () => void;
};

const Box = createRestyleComponent<BoxCustomProps, ThemeProps>([
  spacing,
  createVariant({ themeKey: 'buttonVariants' }),
]);

export function Button({ title, onPress, ...rest }: ButtonProps) {
  return (
    <TouchableOpacity onPress={onPress} activeOpacity={0.8} style={{ flex: 1 }}>
      <Box {...rest}>
        <Text>{title}</Text>
      </Box>
    </TouchableOpacity>
  );
}
