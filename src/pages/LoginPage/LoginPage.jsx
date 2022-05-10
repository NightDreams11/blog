import { HelperTexts } from 'components/auth/HelperText/HelperTexts'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import { Navigate } from 'react-router'
import { loginUser, setTokenAC } from 'store/auth'
import { toggleSnackAC } from 'store/messages'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'

import { passwordValidator } from './regex'
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

  const [password, setPassword] = useState('')

  const [isPasswordDirty, setIsPasswordDirty] = useState(false)

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
  })

  const {
    register,
    handleSubmit,
    formState: { errors },
    getFieldState,
  } = useForm({
    resolver: yupResolver(validationSchema),
    // Определяет момент, когда будет проверяться валидация. По умолчанию onSubmit
    mode: 'onBlur',
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
                  getFieldState('email').isTouched &&
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
              // Преобразование undefined => false, потому ошибки изначально нет
              error={!!errors.email}
              FormHelperTextProps={{ style: stylesForTextField.helperText }}
              helperText={errors?.email?.message}
            />
            <Password
              sx={{ ...stylesForTextField }}
              placeholder="Enter your password"
              label="Password*"
              name="password"
              type="password"
              autoComplete="off"
              InputProps={{
                endAdornment:
                  isPasswordDirty &&
                  (passwordValidator(password) ? (
                    <Failed color="error" sx={{ ...stylesForTextField.icon }} />
                  ) : (
                    <Passed color="success" sx={{ ...stylesForTextField.icon }} />
                  )),
              }}
              onChange={(e) => {
                setPassword(e.target.value)
              }}
              onBlur={() => setIsPasswordDirty(true)}
              error={isPasswordDirty ? !!passwordValidator(password) : false}
              FormHelperTextProps={{ style: stylesForTextField.helperText }}
              helperText={
                <HelperTexts
                  error={!!passwordValidator(password)}
                  errorMessage={passwordValidator(password)}
                  isDirty={isPasswordDirty}
                />
              }
            />
            <EnterButton
              variant="contained"
              type="submit"
              // disabled={!!emailValidator(email) || !!passwordValidator(password)}
              onClick={() => dispatch(toggleSnackAC(true))}
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
