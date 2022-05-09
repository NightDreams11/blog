import Button from '@mui/material/Button'
import Snackbar from '@mui/material/Snackbar'
import IconButton from '@mui/material/IconButton'
import CloseIcon from '@mui/icons-material/Close'
import { toggleSnackAC } from 'store/messages'
import { useDispatch, useSelector } from 'react-redux'

export function SimpleSnackbar() {
  const dispatch = useDispatch()
  const isSnackOpen = useSelector((state) => state.messages.isSnackOpen)
  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return
    }
    dispatch(toggleSnackAC(false))
  }

  const action = (
    <>
      <Button color="secondary" size="small" onClick={handleClose}>
        Close
      </Button>
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={handleClose}
      >
        <CloseIcon fontSize="small" />
      </IconButton>
    </>
  )

  return (
    <div>
      <Snackbar
        open={isSnackOpen}
        autoHideDuration={6000}
        onClose={handleClose}
        message="Добро пожаловать"
        action={action}
      />
    </div>
  )
}
