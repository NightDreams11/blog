import { Container, Grid, Box, Link } from '@mui/material'
import { BoxWrapper } from 'components/Footer/styled'
import React from 'react'

export const FooterPage = () => {
  return (
    <BoxWrapper>
      <Container maxWidth="lg">
        <Grid container spacing={5}>
          <Grid item xs={12} sm={4}>
            <Box borderBottom={1}>Help</Box>
            <Box>
              <Link href="/" color="inherit">
                Contact
              </Link>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </BoxWrapper>
  )
}
