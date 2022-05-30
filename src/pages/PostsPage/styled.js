import style from 'styled-components'
import { Box, Container, styled } from '@mui/system'
import { Grid, Paper, Typography } from '@mui/material'

export const Wrapper = style.div`
min-height: 1000px;
`
export const ContainerWrapper = styled(
  Container,
  {}
)({
  width: '100vw',
  marginTop: 50,
})
export const GridContainer = styled(Grid, {})({})

export const GridItem = styled(Grid, {})({})
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
  width: '100%',
})

export const PostTitle = styled(Typography, {})({})

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

export const TextTitle = styled(
  Typography,
  {}
)({
  fontWeight: 500,
})
export const Text = styled(Typography, {})({})

export const PaginatorContainer = styled(
  Box,
  {}
)({
  height: 100,
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
})
