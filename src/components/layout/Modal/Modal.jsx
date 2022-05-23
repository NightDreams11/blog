import * as React from 'react'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Modal from '@mui/material/Modal'
import { useDispatch, useSelector } from 'react-redux'
import { toggleModalAC } from 'store/profile'
import { DeleteProfileButton } from 'pages/ProfilePage/ViewProfile/styled'
import { Button } from '@mui/material'
import { deleteUser } from 'store/auth'
import { DelIcon, styles } from '../../../pages/ProfilePage/ViewProfile/styled'

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
}

export function BasicModal() {
  const dispatch = useDispatch()
  const isModalOpen = useSelector((state) => state.profile.isModalOpen)

  const handleOpen = () => dispatch(toggleModalAC(true))
  const handleClose = () => {
    dispatch(toggleModalAC(false))
  }

  const handleCloseAndDelete = () => {
    dispatch(deleteUser())
    handleClose()
  }

  // Таким образом убираем возможность закрыть окно кликнум на backDrop
  const isModalClose = (_, reason) => {
    if (reason !== 'backdropClick') {
      handleClose()
    }
  }

  return (
    <div>
      <DeleteProfileButton
        variant="contained"
        startIcon={<DelIcon />}
        sx={{ ...styles.button2 }}
        onClick={handleOpen}
        fullWidth
      >
        Delete Profile
      </DeleteProfileButton>
      <Modal
        open={isModalOpen}
        onClose={isModalClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography
            sx={{ textAlign: 'center' }}
            id="modal-modal-title"
            variant="h6"
            component="h2"
          >
            Ваш аккаунт будет безвозвратно удален. Продолжить?
          </Typography>
          <Box sx={{ textAlign: 'center', mt: 1 }}>
            <Button
              sx={{ mr: 1 }}
              variant="contained"
              onClick={handleCloseAndDelete}
            >
              Да
            </Button>
            <Button sx={{ ml: 1 }} variant="contained" onClick={handleClose}>
              Нет
            </Button>
          </Box>
        </Box>
      </Modal>
    </div>
  )
}
