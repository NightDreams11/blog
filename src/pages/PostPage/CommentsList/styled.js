import { Typography } from '@mui/material'
import { Box, styled } from '@mui/system'
import ClearIcon from '@mui/icons-material/Clear'
import style from 'styled-components'

export const Wrapper = style.div`
`

export const CommentBody = styled(
  Box,
  {}
)({
  maxWidth: 550,
  width: '100%',
  display: 'flex',
  minHeight: 70,
  paddingTop: 10,
  marginLeft: -3,
  position: 'relative',
})

export const CommentBodyContainerInner = styled(
  Box,
  {}
)({
  maxWidth: 466,
  width: '100%',

  marginLeft: 10,
  position: 'relative',
})

export const Author = styled(
  Typography,
  {}
)({
  textAlign: 'center',
})

export const CommentText = styled(Typography, {})({})

export const Date = styled(
  Typography,
  {}
)({
  textAlign: 'center',
})

export const LikesContainer = styled(
  Box,
  {}
)({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  width: '27px',
  height: '13px',
  position: 'absolute',
  right: 0,
  top: 45,
  cursor: 'pointer',
})

export const LikeCounter = style.span`
padding-left: 2px;
height: 20px;
`
export const AnswersContainer = styled(
  Box,
  {}
)({
  width: 434,
})

export const DeleteMessageIcon = styled(
  ClearIcon,
  {}
)({
  position: 'absolute',
  right: 9,
  top: 3,
  height: 16,
  width: 16,
})
