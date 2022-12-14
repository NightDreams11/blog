import * as React from 'react'
import CircularProgress from '@mui/material/CircularProgress'
import Box from '@mui/material/Box'

export function Preloader({ top }) {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        position: 'absolute',
        left: 0,
        right: 0,
        top: top || '50%',
      }}
    >
      <CircularProgress />
    </Box>
  )
}
