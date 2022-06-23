import { Typography } from '@mui/material'
import { Box, styled } from '@mui/system'
import style from 'styled-components'

export const Wrapper = style.div`
`

export const CommentBody = styled(
  Box,
  {}
)({
  width: 550,
  display: 'flex',
  minHeight: 70,
})

export const CommentBodyContainerInner = styled(
  Box,
  {}
)({
  width: 466,
  marginLeft: 10,
  position: 'relative',
  cursor: 'pointer',
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
})

export const LikeCounter = style.span`
padding-left: 2px;
height: 20px;
`
