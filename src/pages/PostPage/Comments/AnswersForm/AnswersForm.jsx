import { getImageUrl } from 'utils/imageURL/imageURL'
import SendIcon from '@mui/icons-material/Send'
import IconButton from '@mui/material/IconButton'
import { SubmitPreloader } from 'components/layout/SubmitPreloader/SubmitPreloader'
import { useState, useRef, useEffect } from 'react'
import { Container, TextInput, TextInputContainer, UsersAvatar } from './styled'

export const AnswersFrom = ({
  user,
  setComment,
  comment,
  onSubmitAnswersForm,
  followedCommentID,
}) => {
  const isMounted = useRef(true)
  useEffect(() => {
    isMounted.current = true
    return () => {
      isMounted.current = false
    }
  })

  const [isSending, setIsSending] = useState(false)

  const sendComment = async () => {
    setIsSending(true)
    await onSubmitAnswersForm(followedCommentID)
    if (isMounted.current) {
      setIsSending(false)
    }
  }

  return (
    <TextInputContainer>
      <UsersAvatar
        src={getImageUrl(user.avatar)}
        sx={{
          width: followedCommentID ? '24px' : '34px',
          height: followedCommentID ? '24px' : '34px',
        }}
      />
      <TextInput
        placeholder="Add comment..."
        value={comment}
        autoComplete="off"
        multiline
        onChange={(e) => setComment(e.target.value)}
      />
      <Container sx={{ paddingRight: followedCommentID ? 0 : null }}>
        {isSending ? (
          <SubmitPreloader />
        ) : (
          <IconButton
            sx={{
              color: '#99a2ad',
              opacity: comment.length >= 3 ? 0.7 : 0.3,
              padding: 0,

              marginTop: '4px',
              marginBottom: 'auto',
            }}
            disabled={comment.length < 3}
            onClick={sendComment}
          >
            <SendIcon />
          </IconButton>
        )}
      </Container>
    </TextInputContainer>
  )
}
