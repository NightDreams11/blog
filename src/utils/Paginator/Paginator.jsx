import * as React from 'react'
import Pagination from '@mui/material/Pagination'
import Stack from '@mui/material/Stack'

export function Paginator({ totalItemsCount, pageSize }) {
  const pagesCount = Math.ceil(totalItemsCount / pageSize)

  return (
    <Stack spacing={2}>
      <Pagination
        count={pagesCount}
        variant="outlined"
        shape="rounded"
        showFirstButton
        showLastButton
      />
    </Stack>
  )
}
