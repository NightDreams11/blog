import { TextField, Typography } from '@mui/material'
import { Box, styled } from '@mui/system'
import style from 'styled-components'

export const Wrapper = style.div`
width: 550px;
`

export const TextInputContainer = styled(
  Box,
  {}
)({
  display: 'flex',
  height: 34,
})

export const TextInput = styled(
  TextField,
  {}
)({
  width: 422,
  marginLeft: 10,
  '& .MuiOutlinedInput-root': {
    minHeight: 34,
  },
})

export const CommentsCounterButton = styled(
  Typography,
  {}
)({
  cursor: 'pointer',
  display: 'inline',
  marginLeft: '42px',
  color: '#2a5885',
})
