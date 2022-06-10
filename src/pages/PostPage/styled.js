import style from 'styled-components'
import { Box, Container, styled } from '@mui/system'
import { Grid, TextField, Typography } from '@mui/material'

export const Wrapper = style.div`
`

export const ContainerWrapper = styled(
  Container,
  {}
)({
  width: '100vw',
  minHeight: '100vh',
  marginTop: 50,
  display: 'flex',
  flexDirection: 'column',
})

export const GridItem = styled(Grid, {})({})

export const Title = styled(
  Typography,
  {}
)({
  textAlign: 'center',
})

export const Author = styled(
  Typography,
  {}
)({
  textAlign: 'center',
  paddingTop: 10,
  paddingLeft: 10,
})

export const Date = styled(
  Typography,
  {}
)({
  textAlign: 'center',
})

export const ImageContainer = styled(Box, {})({})

export const Image = style.img`
width: 100%;
height: 300px;
object-fit: contain;
`

export const Text = styled(
  Typography,
  {}
)({
  textAlign: 'left',
})

export const LikesContainer = styled(
  Box,
  {}
)({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  width: '65px',
  height: '32px',
  borderRadius: '32px',
})

export const LikeCounter = style.span`
padding-left: 2px;
height: 20px;
// color: #1976d2;
`

export const CommentField = styled(
  TextField,
  {}
)({
  marginTop: '10px',
})
