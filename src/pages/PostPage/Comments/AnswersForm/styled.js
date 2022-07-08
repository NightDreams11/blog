import { TextField, Avatar } from '@mui/material'
import { Box, styled } from '@mui/system'

export const TextInputContainer = styled(
  Box,
  {}
)({
  display: 'flex',
  marginTop: '10px',
})

export const TextInput = styled(
  TextField,
  {}
)({
  width: '100%',
  marginLeft: 10,
  '& .MuiOutlinedInput-root': {
    paddingTop: '5.5px',
    paddingBottom: '5.5px',
  },
})

export const UsersAvatar = styled(
  Avatar,
  {}
)({
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
  marginLeft: '13px',
  paddingRight: 40,
})
