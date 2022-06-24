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
  width: 466,
  height: 34,
})

export const TextInput = styled(
  TextField,
  {}
)({
  width: 422,
  '& .MuiOutlinedInput-root': {
    minHeight: 34,
  },
})

export const ShowMore = styled(
  Typography,
  {}
)({
  cursor: 'pointer',
})
