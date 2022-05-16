import { HelperTexts } from 'components/auth/HelperText/HelperTexts'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Navigate } from 'react-router'
import { regUser } from 'store/auth'

import { emailValidator, nameValidator, passwordValidator } from './regex'
import {
  BoxContainer,
  ContainerWrapper,
  Details,
  Email,
  ExtraDetails,
  Failed,
  Form,
  LoginLink,
  Name,
  Passed,
  Password,
  Profession,
  RegButton,
  Skills,
  stylesForTextField,
  Title,
  Wrapper,
} from './styled'

export const RegPage = () => {
  const token = useSelector((state) => state.auth.token)

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  // const [extraDetails, setExtraDetails] = useState('')
  // const [skills, setSkills] = useState('')
  // const [profession, setProfession] = useState('')
  // const [details, setDetails] = useState('')

  const [isDirtyName, setIsDirtyName] = useState(false)
  const [isDirtyEmail, setIsDirtyEmail] = useState(false)
  const [isDirtyPassword, setIsDirtyPassword] = useState(false)

  const dispatch = useDispatch()

  const handleSubmit = (data) => {
    data.preventDefault()
    const formData = new FormData(data.target)
    const payload = Object.fromEntries(formData.entries())
    dispatch(regUser(payload))
  }

  if (token) {
    return <Navigate to="/profile" />
  }

  return (
    <Wrapper>
      <ContainerWrapper>
        <BoxContainer>
          <Form onSubmit={handleSubmit}>
            <Title variant="h4">Регистрация</Title>
            <Name
              label="Name*"
              placeholder="Enter your name"
              name="name"
              autoComplete="off"
              onChange={(e) => {
                setName(e.target.value)
              }}
              InputProps={{
                endAdornment:
                  isDirtyName &&
                  (nameValidator(name) ? (
                    <Failed color="error" sx={{ ...stylesForTextField.icon }} />
                  ) : (
                    <Passed color="success" sx={{ ...stylesForTextField.icon }} />
                  )),
              }}
              onBlur={() => setIsDirtyName(true)}
              error={isDirtyName ? !!nameValidator(name) : false}
              FormHelperTextProps={{ style: stylesForTextField.helperText }}
              helperText={
                <HelperTexts
                  error={!!nameValidator(name)}
                  errorMessage={nameValidator(name)}
                  isDirty={isDirtyName}
                />
              }
            />
            <Email
              label="Email*"
              placeholder="Enter your email"
              name="email"
              autoComplete="off"
              onChange={(e) => {
                setEmail(e.target.value)
              }}
              InputProps={{
                endAdornment:
                  isDirtyEmail &&
                  (emailValidator(email) ? (
                    <Failed color="error" sx={{ ...stylesForTextField.icon }} />
                  ) : (
                    <Passed color="success" sx={{ ...stylesForTextField.icon }} />
                  )),
              }}
              onBlur={() => setIsDirtyEmail(true)}
              error={isDirtyEmail ? !!emailValidator(email) : false}
              FormHelperTextProps={{ style: stylesForTextField.helperText }}
              helperText={
                <HelperTexts
                  error={!!emailValidator(email)}
                  errorMessage={emailValidator(email)}
                  isDirty={isDirtyEmail}
                />
              }
            />
            <Password
              label="Password*"
              placeholder="Enter your password"
              name="password"
              type="password"
              autoComplete="off"
              onChange={(e) => {
                setPassword(e.target.value)
              }}
              InputProps={{
                endAdornment:
                  isDirtyPassword &&
                  (passwordValidator(password) ? (
                    <Failed color="error" sx={{ ...stylesForTextField.icon }} />
                  ) : (
                    <Passed color="success" sx={{ ...stylesForTextField.icon }} />
                  )),
              }}
              onBlur={() => setIsDirtyPassword(true)}
              error={isDirtyPassword ? !!passwordValidator(password) : false}
              FormHelperTextProps={{ style: stylesForTextField.helperText }}
              helperText={
                <HelperTexts
                  error={!!passwordValidator(password)}
                  errorMessage={passwordValidator(password)}
                  isDirty={isDirtyPassword}
                />
              }
            />
            <ExtraDetails
              label="Extra details"
              placeholder="Add extra information"
              name="extra_details"
              autoComplete="off"
              // onChange={(e) => {
              //   setExtraDetails(e.target.value)
              // }}
            />
            <Skills
              label="Skills"
              placeholder="Add your skills"
              name="skills"
              autoComplete="off"
              // onChange={(e) => {
              //   setSkills(e.target.value)
              // }}
            />
            <Profession
              label="Profession"
              placeholder="Add your profession"
              name="profession"
              autoComplete="off"
              // onChange={(e) => {
              //   setProfession(e.target.value)
              // }}
            />
            <Details
              label="Details"
              placeholder="Add details"
              name="details"
              autoComplete="off"
              // onChange={(e) => {
              //   setDetails(e.target.value)
              // }}
            />
            <RegButton
              variant="contained"
              type="submit"
              disabled={
                !!nameValidator(name) ||
                !!emailValidator(email) ||
                !!passwordValidator(password)
              }
            >
              Зарегистрироваться
            </RegButton>
            <LoginLink to="/login" underline="hover">
              Уже зарегистрированы? Войти
            </LoginLink>
          </Form>
        </BoxContainer>
      </ContainerWrapper>
    </Wrapper>
  )
}