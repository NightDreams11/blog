import { useState } from 'react'
import { HelperTexts } from './HelperTexts/HelperTexts'

import { loginValidator, passwordValidator } from './regex'
import {
  BoxContainer,
  ContainerWrapper,
  EnterButton,
  Login,
  Password,
  RegistrationLink,
  stylesForTextField,
  Title,
  Wrapper,
} from './styled'

export const LoginPage = () => {
  const [login, setLogin] = useState('')
  const [password, setPassword] = useState('')

  const [isLoginDirty, setIsLoginDirty] = useState(false)
  const [isPasswordDirty, setIsPasswordDirty] = useState(false)

  return (
    <Wrapper>
      <ContainerWrapper>
        <BoxContainer>
          <Title variant="h4">Вход</Title>
          <Login
            sx={{ ...stylesForTextField }}
            placeholder="Enter your login"
            label="Login*"
            name="login"
            inputProps={{ maxLength: 128 }}
            onChange={(e) => {
              setLogin(e.target.value)
            }}
            onBlur={() => setIsLoginDirty(true)}
            error={isLoginDirty ? !!loginValidator(login) : false}
            FormHelperTextProps={{ style: stylesForTextField.helperText }}
            helperText={
              <HelperTexts
                error={!!loginValidator(login)}
                errorMessage={loginValidator(login)}
                counter={`${login.length}/${128}`}
                isDirty={isLoginDirty}
              />
            }
          />
          <Password
            sx={{ ...stylesForTextField }}
            placeholder="Enter your password"
            label="Password*"
            name="password"
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
          <EnterButton variant="contained">Войти</EnterButton>
          <RegistrationLink href="/registration" underline="hover">
            Регистация
          </RegistrationLink>
        </BoxContainer>
      </ContainerWrapper>
    </Wrapper>
  )
}
