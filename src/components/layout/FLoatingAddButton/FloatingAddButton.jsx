import * as React from 'react'
import Box from '@mui/material/Box'
import Fab from '@mui/material/Fab'
import AddIcon from '@mui/icons-material/Add'

export function FloatingActionButtons() {
  return (
    <Box
      sx={{
        '& > :not(style)': { m: 1 },
        position: 'fixed',
        right: 40,
        bottom: 40,
        opacity: 0.5,
        transition: '0.35s',
        '&:hover ': {
          opacity: 1,
        },
      }}
    >
      <Fab color="primary" aria-label="add">
        <AddIcon />
      </Fab>
    </Box>
  )
}
