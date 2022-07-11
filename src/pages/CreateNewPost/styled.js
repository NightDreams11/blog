import { Button, TextField } from '@mui/material'
import { Container, styled } from '@mui/system'
import style from 'styled-components'

export const Wrapper = style.div`
`

export const ContainerWrapper = styled(
  Container,
  {}
)({
  display: 'flex',
  justifyContent: 'center',
})

export const Form = style.form`
`

export const CreateTitle = styled(
  TextField,
  {}
)({
  display: 'block',
})

export const CreateFullText = styled(
  TextField,
  {}
)({
  display: 'block',
})

export const CreateDescription = styled(
  TextField,
  {}
)({
  display: 'block',
})

export const CreateNewPostButton = styled(Button, {})({})
