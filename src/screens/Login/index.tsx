import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { ScrollView, StyleSheet, TouchableOpacity } from 'react-native';

import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigation } from '@react-navigation/native';
import { useBoundStore } from '@store/index';
import { z } from 'zod';

import { AuthNavigationRoutesProps } from '@routes/auth.routes';
import { LoginUser } from '@models/user';
import { loginUser } from '@services/api';

import { Box, Text } from '@theme/index';

import { Button } from '@components/Button';
import { FormInput } from '@components/FormInput';
import { InputErrorMessage } from '@components/InputErrorMessage';
import { Loading } from '@components/Loadig';

const schema = z.object({
  email: z.string({ required_error: 'Insira o Email.' }),
  password: z
    .string({ required_error: 'Insira a Senha.' })
    .min(8, 'A senha deve ter no mínimo 8 caracteres.'),
});

type FormData = z.infer<typeof schema>;

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
        contentContainerStyle={styles.scrollView}
        showsVerticalScrollIndicator={false}>
        <Box alignItems="center" px="6" pb="8">
          <Text mb="2" textAlign="center" variant="text_2xl">
            Olá novamente!
          </Text>
          <Text textAlign="center" color="mutedForeground">
            Obrigado por entrar no Blissfeed...
          </Text>
          <Text textAlign="center" color="mutedForeground">
            É bom ter você conosco!
          </Text>
        </Box>

        <Box p="2" width={350}>
          <Text px="2" mb="1">
            Email
          </Text>
          <Controller
            control={control}
            render={({ field: { onChange, onBlur, value } }) => (
              <FormInput
                onChangeText={onChange}
                onBlur={onBlur}
                value={value}
                placeholder="Ex:exemplo@gmail.com"
              />
            )}
            name="email"
          />
          <InputErrorMessage message={errors.email?.message} />

          <Text px="2" mb="1">
            Senha
          </Text>
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

          <Box my="2" flexDirection="row" justifyContent="flex-end">
            <TouchableOpacity>
              <Text color="primary" variant="link">
                Esqueci a senha
              </Text>
            </TouchableOpacity>
          </Box>

          <Box alignItems="center" my="5">
            {isLoading ? (
              <Box height={50}>
                <Loading />
              </Box>
            ) : (
              <Button
                variant="primary"
                label="Login"
                onPress={handleSubmit(onSubmit)}
              />
            )}
          </Box>

          <Box
            mt="2"
            flexDirection="row"
            alignItems="center"
            justifyContent="center">
            <Text mr="1" color="mutedForeground">
              Não tem uma conta?
            </Text>

            <Button
              variant="link"
              label="Entrar!"
              onPress={handleNavigateToRegister}
            />
          </Box>
        </Box>
      </ScrollView>
    </Box>
  );
}

const styles = StyleSheet.create({
  scrollView: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 10,
  },
});
