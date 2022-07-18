import * as React from 'react'
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogTitle from '@mui/material/DialogTitle'
import Slide from '@mui/material/Slide'

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />
})

export function AlertDialogSlide({
  isDialogOpen,
  setIsDialogOpen,
  reduxAction,
  text,
}) {
  const handleClose = () => {
    setIsDialogOpen(false)
  }

  const handleCloseAndDelete = () => {
    reduxAction()
    handleClose()
  }

  const isDialogClose = (_, reason) => {
    if (reason !== 'backdropClick') {
      handleClose()
    }
  }

  return (
    <div>
      <Dialog
        open={isDialogOpen}
        TransitionComponent={Transition}
        keepMounted
        onClose={isDialogClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>Удалить аккаунт?</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            {text}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Disagree</Button>
          <Button onClick={handleCloseAndDelete}>Agree</Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}
