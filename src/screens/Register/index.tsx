import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { ScrollView, TouchableOpacity } from 'react-native';

import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigation } from '@react-navigation/native';
import { z } from 'zod';

import { AuthNavigationRoutesProps } from '@routes/auth.routes';
import { CreateUser } from '@models/user';
import { registerUser } from '@services/api';

import { CheckIcon } from 'lucide-react-native';

import { Box, Text } from '@theme/index';

import { FormInput } from '@components/FormInput';
import { InputErrorMessage } from '@components/InputErrorMessage';
import { Loading } from '@components/Loadig';

const schema = z.object({
  name: z.string().min(1, 'Insira o Nome'),
  email: z.string().min(1, 'Insira o E-mail.'),
  password: z.string().min(8, 'A senha deve ter no mínimo 8 caracteres.'),
});

type FormData = z.infer<typeof schema>;

export function Register() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [agreedConditions, setAgreedConditions] = useState<boolean>(false);

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
        <Box alignItems="center" px="6" pb="1">
          <Text mb="2" textAlign="center">
            Criar Conta
          </Text>
          <Text textAlign="center">
            Desabafe, conecte-se e encontre paz. Junte-se à comunidade
            Blissfeed.
          </Text>
        </Box>

        <Box py="1" px="2">
          <Text>Nome</Text>
          <Controller
            control={control}
            render={({ field: { onChange, onBlur, value } }) => (
              <FormInput
                onChangeText={onChange}
                onBlur={onBlur}
                value={value}
                placeholder="Ex:Jhon Doe"
              />
            )}
            name="name"
          />
          <InputErrorMessage message={errors.email?.message} />

          <Text>Email</Text>
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

          <Box mb="2" flexDirection="row" alignItems="center">
            <TouchableOpacity
              onPress={handleAgreedConditions}
              style={{
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: 'lightgray',
                height: 20,
                width: 20,
                borderRadius: 5,
              }}>
              {agreedConditions && <CheckIcon color="white" size={14} />}
            </TouchableOpacity>
            <TouchableOpacity
              activeOpacity={1}
              onPress={handleAgreedConditions}>
              <Text mx="1">Aceito os</Text>
            </TouchableOpacity>
            <TouchableOpacity>
              <Text>termos e condições.</Text>
            </TouchableOpacity>
          </Box>

          {isLoading ? (
            <Loading />
          ) : (
            <TouchableOpacity onPress={handleSubmit(onSubmit)}>
              <Text>Registrar</Text>
            </TouchableOpacity>
          )}

          <Box
            mt="2"
            flexDirection="row"
            alignItems="center"
            justifyContent="center">
            <Text mr="1">Já tem uma conta?</Text>
            <TouchableOpacity onPress={handleNavigateToLogin}>
              <Text>Entrar!</Text>
            </TouchableOpacity>
          </Box>
        </Box>
      </ScrollView>
    </Box>
  );
}
