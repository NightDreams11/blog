import * as React from 'react'
import IconButton from '@mui/material/IconButton'
import PhotoCamera from '@mui/icons-material/PhotoCamera'
import Stack from '@mui/material/Stack'
import { useDispatch } from 'react-redux'
import { Button } from '@mui/material'
import { UploadAvatarButton } from './styled'

export function PreviewButton({ photoPreview, reduxAction, setPhotoPreview }) {
  const dispatch = useDispatch()
  const onInputChange = () => {
    dispatch(reduxAction(photoPreview.file))
  }

  function handleImageChange(e) {
    e.preventDefault()

    const reader = new FileReader()
    const file = e.target.files[0]

    reader.onloadend = () => {
      dispatch(setPhotoPreview(file, reader.result))
    }
    if (file) {
      reader.readAsDataURL(file)
    }
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
          onChange={handleImageChange}
        />
        <UploadAvatarButton variant="contained" component="span">
          Preview
        </UploadAvatarButton>
        <IconButton
          sx={{ ml: 1 }}
          color="primary"
          aria-label="upload picture"
          component="span"
        >
          <PhotoCamera />
        </IconButton>
        {photoPreview !== null && reduxAction ? (
          <Button onClick={onInputChange}>Save</Button>
        ) : (
          ''
        )}
      </label>
    </Stack>
  )
}
