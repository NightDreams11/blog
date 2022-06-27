import { Preloader } from 'components/layout/Preloader/Preloader'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { createComment, getComments } from 'store/comments'
import SendIcon from '@mui/icons-material/Send'
import { CommentsList } from '../CommentsList/CommentsList'
import { ShowMore, TextInput, TextInputContainer, Wrapper } from './styled'

let isShowedButton = true

export const CommentsComponent = ({ postId }) => {
  const dispatch = useDispatch()
  const [comment, setComment] = useState('')
  const [numberOfComments, setNumberOfComments] = useState(5)

  const comments = useSelector((state) => state.commentsReducer.comments)
  const userId = useSelector((state) => state.auth.user.id)

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

  useEffect(() => {
    dispatch(getComments(postId))
  }, [dispatch, postId])

  if (!comments || !authorsOfComments) {
    return <Preloader thickness={0} />
  }

  if (numberOfComments >= Object.values(comments).length) {
    isShowedButton = false
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
        isShowedButton={isShowedButton}
        postId={postId}
      />
      <TextInputContainer>
        <TextInput
          placeholder="Add comment..."
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        />
        <SendIcon sx={{ cursor: 'pointer' }} onClick={onSubmit} />
      </TextInputContainer>
      {isShowedButton && <ShowMore onClick={showAllComments}>Show all</ShowMore>}
    </Wrapper>
  )
}
