import { StyleSheet, TextInput, TextInputProps } from 'react-native';

import { useTheme } from '@shopify/restyle';

import { ThemeProps } from '@theme/index';

type FormInputProps = TextInputProps & {
  ref?: React.RefObject<TextInput>;
  type?: 'password' | 'email' | 'name';
};

export function FormInput({ ...rest }: FormInputProps) {
  // const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const theme = useTheme<ThemeProps>();
  const { bgInput } = theme.colors;

  // if (type === 'password') {
  //   return (
  //     <View style={{ backgroundColor: bgInput, ...styles.password_input }}>
  //       <TextInput
  //         secureTextEntry={!isPasswordVisible}
  //         {...rest}
  //         style={styles.full_size}
  //       />
  //       <TouchableOpacity
  //         style={styles.icon}
  //         onPress={() => setIsPasswordVisible(prev => !prev)}>
  //         {isPasswordVisible ? (
  //           <EyeIcon size={18} color={mainForeground} />
  //         ) : (
  //           <EyeOffIcon size={18} color={mainForeground} />
  //         )}
  //       </TouchableOpacity>
  //     </View>
  //   );
  // }

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

  password_input: {
    paddingHorizontal: 20,
    borderRadius: 15,
    height: 50,
    width: '100%',
    position: 'relative',
    justifyContent: 'center',
    paddingRight: 50,
  },

  icon: {
    position: 'absolute',
    right: 0,
    height: 50,
    width: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },

  full_size: { width: '100%', height: '100%' },
});
