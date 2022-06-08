import style from 'styled-components'
import { Box, Container, styled } from '@mui/system'
import { Button, Paper, Typography } from '@mui/material'

export const Wrapper = style.div`
min-height: 1000px;
`
export const ContainerWrapper = styled(
  Container,
  {}
)({
  width: '100vw',
  height: '100vh',
  marginTop: 50,
  display: 'flex',
  flexDirection: 'column',
})

export const Item = styled(
  Paper,
  {}
)({
  height: 280,
  background: '#EEECEC',
  display: 'flex',
  flexDirection: 'column',
})

export const PostTitleContainer = styled(
  Box,
  {}
)({
  height: 50,
  background: '#FFF',
  textAlign: 'center',
  paddingTop: 10,
  paddingLeft: 10,
  paddingRight: 10,
  width: '100%',
})

export const PostTitle = styled(
  Typography,
  {}
)({
  whiteSpace: 'nowrap',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
})

export const PostsTextContainer = styled(
  Box,
  {}
)({
  height: 90,
  background: '#FFF',
  width: '100%',
  marginTop: 'auto',
  padding: 10,
})

export const Image = style.img`
height: 140px;
max-width: 373px;
width: 100%;
`

export const TextTitle = styled(
  Typography,
  {}
)({
  fontWeight: 500,
  whiteSpace: 'nowrap',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
})
export const Text = styled(
  Typography,
  {}
)({
  whiteSpace: 'nowrap',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
})

export const PaginatorContainer = styled(
  Box,
  {}
)({
  height: 100,
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  marginTop: 'auto',
})

export const SearchContainer = styled(
  Box,
  {}
)({
  position: 'relative',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  marginTop: 30,
})

export const PostsNumberContainerInner = styled(
  Box,
  {}
)({
  position: 'absolute',
  display: 'flex',
  top: -30,
})

export const ResetButton = styled(
  Button,
  {}
)({
  height: 30,
  marginTop: 40,
})
