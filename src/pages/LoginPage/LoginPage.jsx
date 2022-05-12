import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import { Navigate } from 'react-router'
import { loginUser, setTokenAC } from 'store/auth'
import { addSnackbarMessage } from 'store/messages'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'

import {
  BoxContainer,
  ContainerWrapper,
  Email,
  EnterButton,
  Failed,
  Form,
  Passed,
  Password,
  RegistrationLink,
  stylesForTextField,
  Title,
  Wrapper,
} from './styled'

export const LoginPage = () => {
  const dispatch = useDispatch()
  const token = useSelector((state) => state.auth.token)
  const userName = useSelector((state) => state.auth.user)

  useEffect(() => {
    const value = localStorage.getItem('token')
    dispatch(setTokenAC(JSON.parse(value)))
  }, [dispatch])

  useEffect(() => {
    window.localStorage.setItem('token', JSON.stringify(token))
  }, [token])

  const validationSchema = yup.object().shape({
    email: yup
      .string()
      .required('Field is required')
      .email('Please use numbers and latin characters. Format х@х.хх')
      .max(128, 'Email is too long'),
    password: yup
      .string()
      .required('Field is required')
      .matches(/^[a-zA-Z0-9]+$/, 'Please use numbers and latin characters')
      .min(5, 'Password contains min 5 characters'),
  })

  const {
    register,
    handleSubmit,
    formState: { errors, dirtyFields },
    getFieldState,
  } = useForm({
    resolver: yupResolver(validationSchema),
    // Определяет момент, когда будет проверяться валидация. По умолчанию onSubmit
    mode: 'onChange',
  })

  const onSubmit = (data) => {
    dispatch(loginUser(data))
  }

  if (token) {
    return <Navigate to="/profile" />
  }

  return (
    <Wrapper>
      <ContainerWrapper>
        <BoxContainer>
          <Form onSubmit={handleSubmit(onSubmit)}>
            <Title variant="h4">Вход</Title>
            <Email
              sx={{ ...stylesForTextField }}
              placeholder="Enter your email"
              label="Email"
              autoComplete="off"
              InputProps={{
                endAdornment:
                  (getFieldState('email').isTouched ||
                    getFieldState('email').isDirty) &&
                  (errors.email ? (
                    <Failed color="error" sx={{ ...stylesForTextField.icon }} />
                  ) : (
                    <Passed color="success" sx={{ ...stylesForTextField.icon }} />
                  )),
              }}
              {...register('email', {
                maxLength: {
                  value: 128,
                },
              })}
              // undefined преобразовывается в false, потому изначально ошибки нет
              error={!!errors.email}
              FormHelperTextProps={{ style: stylesForTextField.helperText }}
              helperText={errors?.email?.message}
            />
            <Password
              sx={{ ...stylesForTextField }}
              placeholder="Enter your password"
              label="Password*"
              type="password"
              autoComplete="off"
              InputProps={{
                endAdornment:
                  (getFieldState('password').isTouched ||
                    getFieldState('password').isDirty) &&
                  (errors.password ? (
                    <Failed color="error" sx={{ ...stylesForTextField.icon }} />
                  ) : (
                    <Passed color="success" sx={{ ...stylesForTextField.icon }} />
                  )),
              }}
              {...register('password', {
                mixLength: {
                  value: 5,
                },
              })}
              error={!!errors.password}
              FormHelperTextProps={{ style: stylesForTextField.helperText }}
              helperText={errors?.password?.message}
            />
            <EnterButton
              variant="contained"
              type="submit"
              disabled={Boolean(
                dirtyFields.email && dirtyFields.password
                  ? errors.email || errors.password
                  : true
              )}
              onClick={() =>
                dispatch(
                  addSnackbarMessage(
                    `Добро пожаловать: ${userName ? userName.name : ''}`
                  )
                )
              }
            >
              Войти
            </EnterButton>
            <RegistrationLink href="/registration" underline="hover">
              Регистация
            </RegistrationLink>
          </Form>
        </BoxContainer>
      </ContainerWrapper>
    </Wrapper>
  )
}
