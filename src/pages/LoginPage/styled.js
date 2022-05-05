import { Box, Button, Container, Link, TextField, Typography } from '@mui/material'
import CheckCircleOutlinedIcon from '@mui/icons-material/CheckCircleOutlined'
import ErrorOutlineOutlinedIcon from '@mui/icons-material/ErrorOutlineOutlined'
import { styled } from '@mui/system'
import style from 'styled-components'

export const Wrapper = style.div``

export const ContainerWrapper = styled(
  Container,
  {}
)({
  width: '100vw',
  height: '100vh',
  position: 'relative',
})

export const BoxContainer = styled(
  Box,
  {}
)({
  borderRadius: 4,
  backgroundColor: '#F5FAFE',
  transition: '0.1',
  minHeight: 500,
  maxWidth: 400,
  width: '100%',
  textAlign: 'center',
  position: 'absolute',
  left: 0,
  right: 0,
  marginLeft: 'auto',
  marginRight: 'auto',
  top: 'calc(50% - 250px)',
})

export const Form = style.form`
    display: flex;
    flex-direction: column;
    align-items: center;
`

export const Title = styled(
  Typography,
  {}
)({
  maxWidth: 360,
  width: '100%',
  minWidth: 320,
  paddingTop: 50,
  color: '#1976d2',
})

export const Email = styled(
  TextField,
  {}
)({
  maxWidth: 360,
  width: '100%',
  minWidth: 320,
  marginTop: 50,
  zIndex: 1,
  //   '& .MuiOutlinedInput-notchedOutline': {
  //     background: '#fff',
  //   },
  '& .MuiOutlinedInput-root': {
    background: '#fff',
  },
})

export const Password = styled(
  TextField,
  {}
)({
  maxWidth: 360,
  width: '100%',
  minWidth: 320,
  marginTop: 30,
  '& .MuiOutlinedInput-root': {
    background: '#fff',
  },
})

export const EnterButton = styled(
  Button,
  {}
)({
  marginTop: 50,
  width: 150,
})

export const RegistrationLink = styled(
  Link,
  {}
)({
  paddingTop: 30,
  cursor: 'pointer',
})

export const Passed = styled(
  CheckCircleOutlinedIcon,
  {}
)({
  background: 'transparent',
  zIndex: 1,
})

export const Failed = styled(
  ErrorOutlineOutlinedIcon,
  {}
)({
  background: 'transparent',
  zIndex: 1,
})

export const stylesForTextField = {
  root: {
    ':-webkit-autofill': {
      WebkitBoxShadow: '0 0 0 1000px white inset',
    },
  },
  input: {
    ':-webkit-autofill': {
      WebkitBoxShadow: '0 0 0 1000px white inset',
    },
    backgroundColor: '#fff',
  },
  icon: {
    ml: 1,
  },
  helperText: {
    display: 'flex',
    justifyContent: 'space-between',
    height: 20,
  },
}
