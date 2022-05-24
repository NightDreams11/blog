import { Button, Container, Grid } from '@mui/material'
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

export const ProfileBlockGrid = styled(
  Grid,
  {}
)({
  display: 'flex',
})
export const ButtonBlockGrid = styled(
  Grid,
  {}
)({
  display: 'flex',
})

export const DescriptionBoxContainer = styled(
  Box,
  {}
)({
  marginLeft: 20,
  paddingTop: 20,
})

export const ButtonBoxContainer = styled(
  Box,
  {}
)({
  display: 'flex',
  flexDirection: 'column',
  marginLeft: 'auto',
  width: 170,
})

export const RouteLink = styled(
  Link,
  {}
)({
  textDecoration: 'none',
})
export const EditProfileButton = styled(
  Button,
  {}
)({
  height: 40,
})

export const DeleteProfileButton = styled(
  Button,
  {}
)({
  height: 40,
})

export const DelIcon = styled(
  DeleteIcon,
  {}
)({
  marginBottom: '5px',
})

export const styles = {
  avatar: {
    width: 150,
    height: 150,
  },
  button2: {
    marginTop: 2,
    paddingTop: '10px',
    backgroundColor: '#d40808',
    '&:hover': {
      backgroundColor: '#bd0808',
    },
  },
}
