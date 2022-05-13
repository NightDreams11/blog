import Button from '@mui/material/Button'
import Snackbar from '@mui/material/Snackbar'
import IconButton from '@mui/material/IconButton'
import CloseIcon from '@mui/icons-material/Close'
import { deleteSnackbarMessageAC } from 'store/messages'
import { useDispatch, useSelector } from 'react-redux'

export function SimpleSnackbar() {
  const dispatch = useDispatch()
  const snackbarMessage = useSelector((state) => state.messages.snackbarMessage)

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return
    }
    dispatch(deleteSnackbarMessageAC())
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
        open={!!snackbarMessage}
        autoHideDuration={6000}
        onClose={handleClose}
        message={snackbarMessage}
        action={action}
      />
    </div>
  )
}
