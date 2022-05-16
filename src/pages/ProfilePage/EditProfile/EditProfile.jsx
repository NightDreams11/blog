import { useDispatch, useSelector } from 'react-redux'
import { Navigate } from 'react-router'
import { toggleEditModeAC } from 'store/profile'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form'
import { loginUser } from 'store/auth'
import {
  BoxContainer,
  BoxInner1,
  BoxInner2,
  ContainerWrapper,
  Description,
  EditButton1,
  Email,
  EnterButton,
  Failed,
  Form,
  GridContainer,
  GridElement1,
  GridElement2,
  GridElement3,
  Passed,
  Password,
  ProfileAvatar,
  RegistrationLink,
  styles,
  stylesForTextField,
  Title,
  Wrapper,
} from './styled'

export const EditProfile = () => {
  const dispatch = useDispatch()
  const user = useSelector((state) => state.auth.user)
  const token = useSelector((state) => state.auth.token)

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

  if (!token) {
    return <Navigate to="/login" />
  }

  return (
    <Wrapper>
      <ContainerWrapper>
        <GridContainer container spacing={2}>
          <GridElement1 item xs={8}>
            <ProfileAvatar
              sx={{ ...styles.avatar }}
              alt="profileLogo"
              src={user ? process.env.REACT_APP_URL + user.avatar : ''}
            />
            <BoxInner1>
              <Description>{user ? user.name : ''}</Description>
              <Description>{`Created at: ${
                user ? user.dateCreated : ''
              }`}</Description>
              <Description>{`EmailASD: ${user ? user.email : ''}`}</Description>
            </BoxInner1>
          </GridElement1>
          <GridElement2 item xs={4}>
            <BoxInner2>
              <EditButton1
                variant="contained"
                onClick={() => dispatch(toggleEditModeAC())}
              >
                Edit Profile
              </EditButton1>
            </BoxInner2>
          </GridElement2>
          <GridElement3 item xs={12}>
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
                        <Passed
                          color="success"
                          sx={{ ...stylesForTextField.icon }}
                        />
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
                        <Passed
                          color="success"
                          sx={{ ...stylesForTextField.icon }}
                        />
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
                >
                  Войти
                </EnterButton>
                <RegistrationLink to="/registration" underline="hover">
                  Регистация
                </RegistrationLink>
              </Form>
            </BoxContainer>
          </GridElement3>
        </GridContainer>
      </ContainerWrapper>
    </Wrapper>
  )
}
