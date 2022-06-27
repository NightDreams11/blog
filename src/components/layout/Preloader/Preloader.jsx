import * as React from 'react'
import CircularProgress from '@mui/material/CircularProgress'
import Box from '@mui/material/Box'

export function Preloader({ thickness }) {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        position: 'absolute',
        left: 0,
        right: 0,
        top: '50%',
      }}
    >
      <CircularProgress thickness={thickness} />
    </Box>
  )
}
