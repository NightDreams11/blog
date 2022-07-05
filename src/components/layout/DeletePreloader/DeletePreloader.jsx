import * as React from 'react'
import CircularProgress from '@mui/material/CircularProgress'
import Box from '@mui/material/Box'

export function DeletePreloader() {
  return (
    <Box
      sx={{
        position: 'absolute',
        right: -1,
        top: 3,
      }}
    >
      <CircularProgress size={14} sx={{ color: 'rgba(42, 88, 133, 0.5)' }} />
    </Box>
  )
}
