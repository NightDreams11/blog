import { Box, Button, Container, TextField, Typography } from '@mui/material'
import CheckCircleOutlinedIcon from '@mui/icons-material/CheckCircleOutlined'
import ErrorOutlineOutlinedIcon from '@mui/icons-material/ErrorOutlineOutlined'
import { styled } from '@mui/system'
import style from 'styled-components'
import { Link } from 'react-router-dom'

export const Wrapper = style.div``

export const ContainerWrapper = styled(
  Container,
  {}
)({
  width: '100vw',
  height: 700,
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
})

export const BoxContainer = styled(
  Box,
  {}
)({
  position: 'relative',
  borderRadius: 4,
  backgroundColor: '#F5FAFE',
  transition: '0.1',
  minHeight: 500,
  maxWidth: 400,
  width: '100%',
  textAlign: 'center',
  marginLeft: 'auto',
  marginRight: 'auto',
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
  marginTop: 70,
  width: 150,
})

export const RegistrationLink = styled(
  Link,
  {}
)({
  paddingTop: 30,
  cursor: 'pointer',
  textDecoration: 'none',
  color: '#1976d2',
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
    position: 'absolute',
    bottom: -22,
    height: 20,
  },
}
