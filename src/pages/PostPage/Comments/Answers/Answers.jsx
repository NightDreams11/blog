import { getImageUrl } from 'utils/imageURL/imageURL'
import SendIcon from '@mui/icons-material/Send'
import { Container, TextInput, TextInputContainer, UsersAvatar } from './styled'

export const Answers = ({
  user,
  setComment,
  comment,
  onSubmit,
  answerToComment,
  createAsnwerToComment,
  followedCommentID,
}) => {
  const sendData = () => {
    if (onSubmit) {
      onSubmit()
    }
    if (createAsnwerToComment) {
      createAsnwerToComment(followedCommentID)
    }
  }

  return (
    <TextInputContainer>
      <UsersAvatar
        src={getImageUrl(user.avatar)}
        sx={{
          width: answerToComment ? '24px' : '34',
          height: answerToComment ? '24px' : '34',
        }}
      />
      <TextInput
        placeholder="Add comment..."
        value={comment}
        autoComplete="off"
        onChange={(e) => setComment(e.target.value)}
      />
      <Container>
        <SendIcon
          sx={{
            cursor: comment.length >= 3 ? 'pointer' : 'auto',
            color: '#99a2ad',
            opacity: comment.length >= 3 ? 0.7 : 0.3,
          }}
          onClick={comment.length >= 3 ? sendData : null}
        />
      </Container>
    </TextInputContainer>
  )
}
