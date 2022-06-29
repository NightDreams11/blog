import { TextField, Avatar } from '@mui/material'
import { Box, styled } from '@mui/system'

export const TextInputContainer = styled(
  Box,
  {}
)({
  display: 'flex',
  height: 34,
  marginTop: '10px',
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

export const UsersAvatar = styled(
  Avatar,
  {}
)({
  marginLeft: '-3px',
  height: '34px',
  width: '34px',
  mt: '0px ',
})

export const Container = styled(
  Box,
  {}
)({
  display: 'flex',
  alignItems: 'center',
  marginLeft: '19px',
})
