import {
  Avatar,
  Button,
  Container,
  Grid,
  TextField,
  Typography,
} from '@mui/material'
import { Box, styled } from '@mui/system'
import style from 'styled-components'
import CheckCircleOutlinedIcon from '@mui/icons-material/CheckCircleOutlined'
import ErrorOutlineOutlinedIcon from '@mui/icons-material/ErrorOutlineOutlined'

export const Wrapper = style.div``

export const ContainerWrapper = styled(
  Container,
  {}
)({
  width: '100vw',
  minHeight: 700,
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  marginTop: 20,
})

export const GridContainer = styled(Grid, {})({})

export const GridElement1 = styled(
  Grid,
  {}
)({
  display: 'flex',
})
export const GridElement2 = styled(
  Grid,
  {}
)({
  display: 'flex',
})
export const GridElement3 = styled(Grid, {})({})

export const BoxInner1 = styled(
  Box,
  {}
)({
  marginLeft: 20,
  paddingTop: 20,
})

export const ProfileAvatar = styled(Avatar, {})({})

export const Description = styled(Typography, {})({})
export const BoxInner2 = styled(
  Box,
  {}
)({
  display: 'flex',
  flexDirection: 'column',
  marginLeft: 'auto',
})
export const EditButton1 = styled(
  Button,
  {}
)({
  height: 40,
  width: 150,
})

export const styles = {
  avatar: {
    width: 150,
    height: 150,
  },
  button2: {
    marginTop: 2,
  },
}

// Form
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
  marginLeft: 'auto',
  marginRight: 'auto',
})

export const Form = style.form`
  display: flex;
  flex-direction: column;
  align-items: center;
`

export const Name = styled(
  TextField,
  {}
)({
  maxWidth: 360,
  width: '100%',
  minWidth: 320,
  marginTop: 50,
  zIndex: 1,
  '& .MuiOutlinedInput-root': {
    background: '#fff',
  },
})

export const ExtraDetails = styled(
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

export const Skills = styled(
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

export const Profession = styled(
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

export const Details = styled(
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

export const SaveButton = styled(
  Button,
  {}
)({
  marginTop: 50,
  marginBottom: 50,
  width: 150,
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
