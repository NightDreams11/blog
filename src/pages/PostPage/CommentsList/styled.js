import { Button, TextField, Typography } from '@mui/material'
import { Box, styled } from '@mui/system'
import FavoriteIcon from '@mui/icons-material/Favorite'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder'
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

export const Date = styled(
  Typography,
  {}
)({
  textAlign: 'center',
})

export const AnswerButton = styled(
  Typography,
  {}
)({
  display: 'inline',
  marginLeft: '8px',
  color: '#2a5885',
  cursor: 'pointer',
  fontSize: 13,
})

export const LikedIcon = styled(
  FavoriteIcon,
  {}
)({
  width: '16px',
  height: '13px',
  mt: '3px',
  color: '#e64646',
})

export const NoLikedIcon = styled(
  FavoriteBorderIcon,
  {}
)({
  width: '16px',
  height: '13px',
  mt: '3px',
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
width: 7px;
height: 13px;
font-size: 13px;
`
export const AnswersContainer = styled(
  Box,
  {}
)({
  width: 466,
  marginLeft: 45,
})

export const DeleteMessageIcon = styled(
  ClearIcon,
  {}
)({
  position: 'absolute',
  right: 0,
  top: 3,
  height: 16,
  width: 16,
  cursor: 'pointer',
  color: 'rgba(42, 88, 133, 0)',
})

export const EditMessageIcon = styled(
  EditIcon,
  {}
)({
  position: 'absolute',
  right: 21,
  top: 4,
  height: 13,
  width: 13,
  cursor: 'pointer',
  color: 'rgba(42, 88, 133, 0)',
})

export const TextInput = styled(
  TextField,
  {}
)({
  width: 466,
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
