import { Preloader } from 'components/layout/Preloader/Preloader'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Box } from '@mui/system'
import { createComment, getComments } from 'store/comments'
import { Avatar } from '@mui/material'
import { getImageUrl } from 'utils/imageURL/imageURL'
import SendIcon from '@mui/icons-material/Send'
import { CommentsList } from '../CommentsList/CommentsList'
import {
  CommentsCounterButton,
  TextInput,
  TextInputContainer,
  Wrapper,
} from './styled'

export const CommentsComponent = ({ postId }) => {
  let isShowedButton = true

  const dispatch = useDispatch()
  const [comment, setComment] = useState('')
  const [numberOfComments, setNumberOfComments] = useState(5)

  const comments = useSelector((state) => state.commentsReducer.comments)
  const userId = useSelector((state) => state.auth.user.id)
  const user = useSelector((state) => state.auth.user)

  const authorsOfComments = useSelector(
    (state) => state.commentsReducer.authorsOfComments
  )

  const onSubmit = () => {
    dispatch(createComment({ comment, postId }))
    setComment('')
  }

  const showAllComments = () => {
    setNumberOfComments(
      numberOfComments + (Object.values(comments).length - numberOfComments)
    )
  }

  const hideComments = () => {
    setNumberOfComments(5)
  }

  useEffect(() => {
    dispatch(getComments(postId))
  }, [dispatch, postId])

  if (!comments || !authorsOfComments) {
    return <Preloader thickness={0} />
  }

  if (numberOfComments >= Object.values(comments).length) {
    isShowedButton = false
  } else {
    isShowedButton = true
  }

  const sortedComments = Object.values(comments)
    .sort((a, b) => {
      // return new window.Date(a.dateCreated) - new window.Date(b.dateCreated)
      return new window.Date(b.dateCreated) - new window.Date(a.dateCreated)
    })
    .slice(0, numberOfComments)

  return (
    <Wrapper>
      <CommentsList
        sortedComments={sortedComments}
        authorsOfComments={authorsOfComments}
        userId={userId}
        postId={postId}
      />
      <Box sx={{ marginTop: '10px', marginBottom: '10px' }}>
        {isShowedButton ? (
          <CommentsCounterButton variant="body2" onClick={showAllComments}>
            Show all comments
          </CommentsCounterButton>
        ) : (
          <CommentsCounterButton variant="body2" onClick={hideComments}>
            Hide comments
          </CommentsCounterButton>
        )}
      </Box>
      <TextInputContainer>
        <Avatar
          src={getImageUrl(user.avatar)}
          sx={{
            marginLeft: '-3px',
            height: '34px',
            width: '34px',
            mt: '0px ',
          }}
        />
        <TextInput
          placeholder="Add comment..."
          value={comment}
          autoComplete="off"
          onChange={(e) => setComment(e.target.value)}
        />
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            marginLeft: '19px',
          }}
        >
          <SendIcon
            sx={{
              cursor: comment.length >= 3 ? 'pointer' : 'auto',
              color: '#99a2ad',
              opacity: comment.length >= 3 ? 0.7 : 0.3,
            }}
            onClick={comment.length >= 3 ? onSubmit : ''}
          />
        </Box>
      </TextInputContainer>
    </Wrapper>
  )
}
