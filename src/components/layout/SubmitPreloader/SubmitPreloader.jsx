import * as React from 'react'
import CircularProgress from '@mui/material/CircularProgress'
import Box from '@mui/material/Box'

export function SubmitPreloader() {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: '5px',
        marginBottom: 'auto',
      }}
    >
      <CircularProgress size={24} sx={{ color: 'rgba(42, 88, 133, 0.5)' }} />
    </Box>
  )
}
