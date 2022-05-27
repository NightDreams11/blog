import Snackbar from '@mui/material/Snackbar'
import IconButton from '@mui/material/IconButton'
import CloseIcon from '@mui/icons-material/Close'
import { deleteSnackbarMessageAC } from 'store/messages'
import { useDispatch, useSelector } from 'react-redux'
import { Box } from '@mui/system'
import SuccessIcon from '@mui/icons-material/CheckCircleOutlined'
import ErrorIcon from '@mui/icons-material/ErrorOutlineOutlined'

export function SimpleSnackbar() {
  const snackbarMessage = useSelector((state) => state.messages.snackbarMessage)
  const dispatch = useDispatch()

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return
    }
    dispatch(deleteSnackbarMessageAC())
  }

  return (
    <div>
      {snackbarMessage && (
        <Snackbar
          open={!!snackbarMessage}
          autoHideDuration={6000}
          onClose={handleClose}
        >
          <Box
            sx={{
              alignItems: 'center',
              display: 'flex',
              background: 'rgb(50, 50, 50)',
              borderRadius: '4px',
            }}
          >
            {snackbarMessage.type === 'success' ? (
              <SuccessIcon
                color="success"
                sx={{
                  marginLeft: '10px',
                  marginBottom: '3px',
                }}
              />
            ) : (
              <ErrorIcon
                color="error"
                sx={{
                  marginLeft: '10px',
                  marginBottom: '3px',
                }}
              />
            )}
            <span
              style={{
                paddingBottom: 3,
                paddingLeft: 10,
                color: snackbarMessage.type === 'success' ? '#fff' : '#d32f2f',
                minWidth: '166px',
              }}
            >
              {snackbarMessage.message}
            </span>
            <Box
              sx={{
                borderRadius: '4px',
                background: 'rgb(50, 50, 50);',
                minWidth: '88px',
                height: '48px',
                display: 'flex',
                justifyContent: 'flex-end',
                pr: '10px',
              }}
            >
              <IconButton
                size="small"
                aria-label="close"
                color="inherit"
                onClick={handleClose}
              >
                <CloseIcon fontSize="small" />
              </IconButton>
            </Box>
          </Box>
        </Snackbar>
      )}
    </div>
  )
}
