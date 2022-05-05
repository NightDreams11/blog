import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { loginUser } from 'store/auth'
import { HelperTexts } from './HelperTexts/HelperTexts'

import { emailValidator, passwordValidator } from './regex'
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
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const [isDirtyEmail, setIsDirtyEmail] = useState(false)
  const [isPasswordDirty, setIsPasswordDirty] = useState(false)

  const dispatch = useDispatch()

  const handleSubmit = (data) => {
    data.preventDefault()
    const formData = new FormData(data.target)
    const payload = Object.fromEntries(formData.entries())
    dispatch(loginUser(payload))
  }

  return (
    <Wrapper>
      <ContainerWrapper>
        <BoxContainer>
          <Form onSubmit={handleSubmit}>
            <Title variant="h4">Вход</Title>
            <Email
              sx={{ ...stylesForTextField }}
              placeholder="Enter your email"
              label="Email"
              name="email"
              autoComplete="off"
              /*eslint-disable */
              inputProps={{ maxLength: 128 }}
              InputProps={{
                endAdornment:
                  isDirtyEmail &&
                  (emailValidator(email) ? (
                    <Failed color="error" sx={{ ...stylesForTextField.icon }} />
                  ) : (
                    <Passed color="success" sx={{ ...stylesForTextField.icon }} />
                  )),
              }}
              onChange={(e) => {
                setEmail(e.target.value)
              }}
              onBlur={() => setIsDirtyEmail(true)}
              error={isDirtyEmail ? !!emailValidator(email) : false}
              FormHelperTextProps={{ style: stylesForTextField.helperText }}
              helperText={
                <HelperTexts
                  error={!!emailValidator(email)}
                  errorMessage={emailValidator(email)}
                  counter={`${email.length}/${128}`}
                  isDirty={isDirtyEmail}
                />
              }
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
              disabled={!!emailValidator(email) || !!passwordValidator(password)}
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
