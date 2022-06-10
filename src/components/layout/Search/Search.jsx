import * as React from 'react'
import Paper from '@mui/material/Paper'
import InputBase from '@mui/material/InputBase'
import IconButton from '@mui/material/IconButton'
import SearchIcon from '@mui/icons-material/Search'

export function Search({ handleSearch, text }) {
  const [value, setValue] = React.useState(text)

  return (
    <Paper sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: 400 }}>
      <InputBase
        sx={{ ml: 1, flex: 1 }}
        placeholder="Search Posts"
        onChange={(e) => setValue(e.target.value)}
        value={value}
      />
      <IconButton
        sx={{ p: '10px' }}
        aria-label="search"
        onClick={() => handleSearch(value)}
      >
        <SearchIcon />
      </IconButton>
    </Paper>
  )
}
