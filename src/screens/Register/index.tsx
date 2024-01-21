import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import {
  Keyboard,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';

import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigation } from '@react-navigation/native';
import { useTheme } from '@shopify/restyle';
import { z } from 'zod';

import { AuthNavigationRoutesProps } from '@routes/auth.routes';
import { CreateUser } from '@models/user';
import { registerUser } from '@services/api';

import { CheckIcon } from 'lucide-react-native';

import { Box, Text, ThemeProps } from '@theme/index';

import { Button } from '@components/Button';
import { FormInput } from '@components/FormInput';
import { InputErrorMessage } from '@components/InputErrorMessage';
import { Loading } from '@components/Loadig';

const schema = z.object({
  name: z.string({ required_error: 'Insira o Nome.' }),
  email: z.string({ required_error: 'Insira o Email.' }),
  password: z
    .string({ required_error: 'Insira a Senha.' })
    .min(8, 'A senha deve ter no mínimo 8 caracteres.'),
});

type FormData = z.infer<typeof schema>;

export function Register() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [agreedConditions, setAgreedConditions] = useState<boolean>(false);

  const theme = useTheme<ThemeProps>();
  const { bgInput, primary } = theme.colors;
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

    const { name, email, password } = data;

    try {
      await registerUser({
        name,
        email,
        password,
      } satisfies CreateUser);

      reset();

      navigation.navigate('Login');
    } catch (error) {
      console.log('Error while logging user', error);
    } finally {
      setIsLoading(false);
    }
  };

  function handleNavigateToLogin() {
    navigation.navigate('Login');
  }

  function handleAgreedConditions() {
    setAgreedConditions(prev => !prev);
  }

  function handleSubmitEnding() {
    Keyboard.dismiss();
    handleSubmit(onSubmit);
  }

  return (
    <Box flex={1}>
      <ScrollView
        keyboardShouldPersistTaps="always"
        contentContainerStyle={styles.scrollView}
        showsVerticalScrollIndicator={false}>
        <Box alignItems="center" px="6" pb="8">
          <Text mb="2" textAlign="center" variant="text_2xl">
            Criar Conta
          </Text>
          <Text textAlign="center" color="mutedForeground">
            Desabafe, conecte-se e encontre paz.
          </Text>
          <Text textAlign="center" color="mutedForeground">
            Junte-se à comunidade Blissfeed.
          </Text>
        </Box>

        <Box p="2" width={350}>
          <Text px="2" mb="1">
            Nome
          </Text>
          <Controller
            control={control}
            render={({ field: { onChange, onBlur, value } }) => (
              <FormInput
                enterKeyHint="done"
                onSubmitEditing={handleSubmitEnding}
                onChangeText={onChange}
                onBlur={onBlur}
                value={value}
                placeholder="Ex:Jhon Doe"
              />
            )}
            name="name"
          />
          <InputErrorMessage message={errors.name?.message} />

          <Text px="2" mb="1">
            Email
          </Text>
          <Controller
            control={control}
            render={({ field: { onChange, onBlur, value } }) => (
              <FormInput
                enterKeyHint="done"
                onSubmitEditing={handleSubmitEnding}
                keyboardType="email-address"
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
                enterKeyHint="done"
                onSubmitEditing={handleSubmitEnding}
                keyboardType="visible-password"
                onChangeText={onChange}
                onBlur={onBlur}
                value={value}
                placeholder="********"
              />
            )}
            name="password"
          />
          <InputErrorMessage message={errors.password?.message} />

          <Box my="2" flexDirection="row" alignItems="center">
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={handleAgreedConditions}
              style={{ backgroundColor: bgInput, ...styles.checkBox }}>
              {agreedConditions && <CheckIcon color={primary} size={14} />}
            </TouchableOpacity>
            <TouchableOpacity
              activeOpacity={1}
              onPress={handleAgreedConditions}>
              <Text mx="1">Aceito os</Text>
            </TouchableOpacity>
            <TouchableOpacity>
              <Text color="primary" variant="link">
                termos e condições.
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
                label="Registrar"
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
              Já tem uma conta?
            </Text>

            <Button
              variant="link"
              label="Entrar!"
              disabled={!agreedConditions || isLoading}
              onPress={handleNavigateToLogin}
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
  checkBox: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 20,
    width: 20,
    borderRadius: 5,
  },
});
