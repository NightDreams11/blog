import { useState } from 'react'
import { HelperTexts } from './HelperTexts/HelperTexts'

import { loginValidator, passwordValidator } from './regex'
import {
  BoxContainer,
  ContainerWrapper,
  EnterButton,
  Failed,
  Form,
  Login,
  Passed,
  Password,
  RegistrationLink,
  stylesForTextField,
  Title,
  Wrapper,
} from './styled'

export const LoginPage = () => {
  const [login, setLogin] = useState('')
  const [password, setPassword] = useState('')

  const [isDirtyLogin, setIsLoginDirty] = useState(false)
  const [isPasswordDirty, setIsPasswordDirty] = useState(false)

  return (
    <Wrapper>
      <ContainerWrapper>
        <BoxContainer>
          <Form>
            <Title variant="h4">Вход</Title>
            <Login
              sx={{ ...stylesForTextField }}
              placeholder="Enter your login"
              label="Login*"
              name="login"
              autoComplete="no"
              /*eslint-disable */
              inputProps={{ maxLength: 128 }}
              InputProps={{
                endAdornment:
                  isDirtyLogin &&
                  (loginValidator(login) ? (
                    <Failed color="error" sx={{ ...stylesForTextField.icon }} />
                  ) : (
                    <Passed color="success" sx={{ ...stylesForTextField.icon }} />
                  )),
              }}
              onChange={(e) => {
                setLogin(e.target.value)
              }}
              onBlur={() => setIsLoginDirty(true)}
              error={isDirtyLogin ? !!loginValidator(login) : false}
              FormHelperTextProps={{ style: stylesForTextField.helperText }}
              helperText={
                <HelperTexts
                  error={!!loginValidator(login)}
                  errorMessage={loginValidator(login)}
                  counter={`${login.length}/${128}`}
                  isDirty={isDirtyLogin}
                />
              }
            />
            <Password
              sx={{ ...stylesForTextField }}
              placeholder="Enter your password"
              label="Password*"
              name="password"
              type="password"
              autoComplete="no"
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
              disabled={loginValidator(login) || passwordValidator(password)}
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
