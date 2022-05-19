import { Avatar, Button, Container, Grid, Typography } from '@mui/material'
import { Box } from '@mui/system'
import { Link } from 'react-router-dom'
import DeleteIcon from '@mui/icons-material/Delete'
import styled from 'styled-components'

export const Wrapper = styled.div``

export const ContainerWrapper = styled(
  Container,
  {}
)({
  width: '100vw',
  height: 700,
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  marginTop: 20,
})

export const GridContainer = styled(Grid, {})({})

export const GridElement1 = styled(
  Grid,
  {}
)({
  display: 'flex',
})
export const GridElement2 = styled(
  Grid,
  {}
)({
  display: 'flex',
})

export const BoxInner1 = styled(
  Box,
  {}
)({
  marginLeft: 20,
  paddingTop: 20,
})

export const ProfileAvatar = styled(Avatar, {})({})

export const Description = styled(Typography, {})({})
export const BoxInner2 = styled(
  Box,
  {}
)({
  display: 'flex',
  flexDirection: 'column',
  marginLeft: 'auto',
})

export const RouteLink = styled(
  Link,
  {}
)({
  textDecoration: 'none',
})
export const EditButton1 = styled(
  Button,
  {}
)({
  height: 40,
  width: 150,
})

export const EditButton2 = styled(
  Button,
  {}
)({
  height: 40,
  width: 150,
})

export const DelIcon = styled(
  DeleteIcon,
  {}
)({
  position: 'absolute',
  left: 0,
  // Так можно задавать в пикселях значения для MUI
  top: '8px',
})

export const styles = {
  avatar: {
    width: 150,
    height: 150,
  },
  button2: {
    marginTop: 2,
    backgroundColor: '#d40808',
    '&:hover': {
      backgroundColor: '#bd0808',
    },
  },
}
