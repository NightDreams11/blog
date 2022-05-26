import * as React from 'react'
import IconButton from '@mui/material/IconButton'
import PhotoCamera from '@mui/icons-material/PhotoCamera'
import Stack from '@mui/material/Stack'
import { useDispatch, useSelector } from 'react-redux'
import { setAvatarAC } from 'store/auth'
import { Button } from '@mui/material'
import { uploadAvatar } from 'store/profile'
import { UploadAvatarButton } from './styled'

export function PreviewButton() {
  const previewAvatar = useSelector((state) => state.auth.previewAvatar)
  const dispatch = useDispatch()

  const onInputChange = () => {
    dispatch(uploadAvatar(previewAvatar.file))
  }

  function handleImageChange(e) {
    e.preventDefault()

    const reader = new FileReader()
    const file = e.target.files[0]

    reader.onloadend = () => {
      dispatch(setAvatarAC(file, reader.result))
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
        {previewAvatar !== null ? <Button onClick={onInputChange}>Save</Button> : ''}
      </label>
    </Stack>
  )
}
