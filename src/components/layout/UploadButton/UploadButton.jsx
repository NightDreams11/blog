import * as React from 'react'
import IconButton from '@mui/material/IconButton'
import PhotoCamera from '@mui/icons-material/PhotoCamera'
import Stack from '@mui/material/Stack'
import { EditButton1 } from './styled'

export function UploadButton() {
  return (
    <Stack direction="row" alignItems="center" spacing={2}>
      <label htmlFor="contained-button-file">
        <input
          hidden
          accept="image/*"
          id="contained-button-file"
          multiple
          type="file"
        />
        <EditButton1 variant="contained" component="span">
          Upload
        </EditButton1>
      </label>
      <label hidden htmlFor="icon-button-file">
        <input accept="image/*" id="icon-button-file" type="file" />
        <IconButton color="primary" aria-label="upload picture" component="span">
          <PhotoCamera />
        </IconButton>
      </label>
    </Stack>
  )
}
