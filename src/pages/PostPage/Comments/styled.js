import { TextField, Typography } from '@mui/material'
import { Box, styled } from '@mui/system'
import style from 'styled-components'

export const Wrapper = style.div`
`

export const TextInput = styled(TextField, {})({})

export const CommentBody = styled(Box, {})({})

export const Author = styled(
  Typography,
  {}
)({
  textAlign: 'center',
  paddingTop: 10,
  paddingLeft: 10,
})

export const CommentText = styled(Box, {})({})

export const ShowMore = styled(
  Typography,
  {}
)({
  cursor: 'pointer',
})
