import * as React from 'react'
import IconButton from '@mui/material/IconButton'
import PhotoCamera from '@mui/icons-material/PhotoCamera'
import Stack from '@mui/material/Stack'
import { useDispatch } from 'react-redux'
import { uploadAvatar } from '../../../store/profile'
import { EditButton1 } from './styled'

export function UploadButton() {
  const dispatch = useDispatch()
  const onInputChange = (e) => {
    e.preventDefault()
    const files = [...e.target.files]
    dispatch(uploadAvatar(files[0]))
  }

  return (
    <Stack direction="row" alignItems="center" spacing={2}>
      <label htmlFor="contained-button-file">
        <input
          hidden
          accept="image/*"
          id="contained-button-file"
          multiple
          type="file"
          onChange={onInputChange}
        />
        <EditButton1 variant="contained" component="span">
          Upload
        </EditButton1>
        <IconButton
          sx={{ ml: 1 }}
          color="primary"
          aria-label="upload picture"
          component="span"
        >
          <PhotoCamera />
        </IconButton>
      </label>
    </Stack>
  )
}
