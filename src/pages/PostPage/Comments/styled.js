import { Typography } from '@mui/material'
import { styled } from '@mui/system'
import style from 'styled-components'

export const Wrapper = style.div`
width: 550px;
`

export const CommentsCounterButton = styled(
  Typography,
  {}
)({
  cursor: 'pointer',
  display: 'inline',
  marginLeft: '42px',
  color: '#2a5885',
})
