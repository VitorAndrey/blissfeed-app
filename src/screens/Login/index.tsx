import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { ScrollView, TouchableOpacity } from 'react-native';

import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigation } from '@react-navigation/native';
import { createBox, createText } from '@shopify/restyle';
import { useBoundStore } from '@store/index';
import { z } from 'zod';

import { AuthNavigationRoutesProps } from '@routes/auth.routes';
import { LoginUser } from '@models/user';
import { loginUser } from '@services/api';

import { ThemeProps } from '@theme/index';

import { FormInput } from '@components/FormInput';
import { InputErrorMessage } from '@components/InputErrorMessage';
import { Loading } from '@components/Loadig';

const schema = z.object({
  email: z.string().min(1, 'Insira o E-mail.'),
  password: z.string().min(8, 'A senha deve ter no mínimo 8 caracteres.'),
});

type FormData = z.infer<typeof schema>;

const Box = createBox<ThemeProps>();
const Text = createText<ThemeProps>();

export function Login() {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleLogIn = useBoundStore(state => state.handleLogIn);
  const navigation = useNavigation<AuthNavigationRoutesProps>();

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data: FormData) => {
    setIsLoading(true);

    const { email, password } = data;

    try {
      const user = await loginUser({
        email,
        password,
      } as LoginUser);

      reset();

      handleLogIn(user);
    } catch (error) {
      console.log('Error while logging user', error);
    } finally {
      setIsLoading(false);
    }
  };

  function handleNavigateToRegister() {
    navigation.navigate('Register');
  }

  return (
    <Box flex={1}>
      <ScrollView
        keyboardShouldPersistTaps="always"
        contentContainerStyle={{
          flexGrow: 1,
          justifyContent: 'center',
          paddingVertical: 10,
        }}
        showsVerticalScrollIndicator={false}>
        <Box alignItems="center" px="lg" pb="xs">
          <Text mb="sm" textAlign="center">
            Bem vindo!
          </Text>
          <Text textAlign="center">
            Obrigado por entrar no Blissfeed... É bom ter você conosco!
          </Text>
        </Box>

        <Box py="xs" px="sm">
          <Text>Email</Text>
          <Controller
            control={control}
            render={({ field: { onChange, onBlur, value } }) => (
              <FormInput
                onChangeText={onChange}
                onBlur={onBlur}
                value={value}
                placeholder="exemplo@gmail.com"
              />
            )}
            name="email"
          />
          <InputErrorMessage message={errors.email?.message} />

          <Text>Senha</Text>
          <Controller
            control={control}
            render={({ field: { onChange, onBlur, value } }) => (
              <FormInput
                onChangeText={onChange}
                onBlur={onBlur}
                value={value}
                placeholder="********"
              />
            )}
            name="password"
          />
          <InputErrorMessage message={errors.password?.message} />

          <Box
            mb="sm"
            flexDirection="row"
            alignItems="center"
            justifyContent="flex-end">
            <TouchableOpacity>
              <Text>Esqueci a senha</Text>
            </TouchableOpacity>
          </Box>

          {isLoading ? (
            <Loading />
          ) : (
            <TouchableOpacity onPress={handleSubmit(onSubmit)}>
              <Text>Login</Text>
            </TouchableOpacity>
          )}

          <Box
            mt="sm"
            flexDirection="row"
            alignItems="center"
            justifyContent="center">
            <Text mr="xs">Não tem uma conta?</Text>
            <TouchableOpacity onPress={handleNavigateToRegister}>
              <Text>Registre-se!</Text>
            </TouchableOpacity>
          </Box>
        </Box>
      </ScrollView>
    </Box>
  );
}
