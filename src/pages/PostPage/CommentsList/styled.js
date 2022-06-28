import { Button, TextField, Typography } from '@mui/material'
import { Box, styled } from '@mui/system'
import EditIcon from '@mui/icons-material/Edit'
import ClearIcon from '@mui/icons-material/Clear'
import style from 'styled-components'

export const Wrapper = style.div`
`

export const CommentBody = styled(
  Box,
  {}
)({
  maxWidth: 550,
  width: '100%',
  display: 'flex',
  minHeight: 70,
  paddingTop: 10,
  marginLeft: -3,
  position: 'relative',
})

export const CommentBodyContainerInner = styled(
  Box,
  {}
)({
  maxWidth: 466,
  width: '100%',

  marginLeft: 10,
  position: 'relative',
})

export const Author = styled(
  Typography,
  {}
)({
  textAlign: 'center',
})

export const SwitchContainerEditMode = styled(Box, {})({})
export const CommentText = styled(Typography, {})({})

export const Date = styled(
  Typography,
  {}
)({
  textAlign: 'center',
})

export const LikesContainer = styled(
  Box,
  {}
)({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  width: '27px',
  height: '13px',
  position: 'absolute',
  right: 0,
  top: 45,
  cursor: 'pointer',
})

export const LikeCounter = style.span`
padding-left: 2px;
height: 20px;
`
export const AnswersContainer = styled(
  Box,
  {}
)({
  width: 434,
})

export const DeleteMessageIcon = styled(
  ClearIcon,
  {}
)({
  position: 'absolute',
  right: 9,
  top: 3,
  height: 16,
  width: 16,
})

export const EditMessageIcon = styled(
  EditIcon,
  {}
)({
  position: 'absolute',
  right: 30,
  top: 4,
  height: 13,
  width: 13,
})

export const EditModeContainer = styled(Box, {})({})

export const TextInput = styled(
  TextField,
  {}
)({
  width: 422,
  '& .MuiOutlinedInput-root': {
    minHeight: 48,
  },
  height: 48,
})

export const EditModeButtonContainer = styled(
  Box,
  {}
)({
  display: 'flex',
  justifyContent: 'end',
  flex: 1,
  marginTop: 10,
  marginRight: 45,
})

export const SaveEditCommentButton = styled(
  Button,
  {}
)({
  height: 30,
  width: 96,
  fontSize: 13,
  marginLeft: 12,
  backgroundColor: '#5181b8',
  '&:hover': {
    backgroundColor: 'rgba(81, 129, 184, 0.9)',
  },
})

export const CancelEditCommentButton = styled(
  Button,
  {}
)({
  fontSize: 13,
  '&:hover': {
    backgroundColor: 'rgba(42, 88, 133, 0.1)',
    color: 'rgba(42, 88, 133, 0.8)',
  },
  color: '#2a5885',
  height: 30,
  width: 78,
})
