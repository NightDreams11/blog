import { Preloader } from 'components/layout/Preloader/Preloader'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Box } from '@mui/system'
import { createComment, getComments } from 'store/comments'
import { CommentsList } from '../CommentsList/CommentsList'
import { CommentsCounterButton, Wrapper } from './styled'
import { AnswersFrom } from './AnswersForm/AnswersForm'

export const CommentsComponent = ({ postId }) => {
  let isShowedButton = true

  const dispatch = useDispatch()
  const [comment, setComment] = useState('')
  const [numberOfCommentsToShow, setnumberOfCommentsToShow] = useState(5)

  const comments = useSelector((state) => state.commentsReducer.comments)
  const user = useSelector((state) => state.auth.user)
  const userId = user?.id || null

  const authorsOfComments = useSelector(
    (state) => state.commentsReducer.authorsOfComments
  )

  const onSubmitAnswersForm = async () => {
    await dispatch(createComment({ comment, postId }))
    setComment('')
  }

  const showAllComments = () => {
    setnumberOfCommentsToShow(
      numberOfCommentsToShow +
        (Object.values(comments).length - numberOfCommentsToShow)
    )
  }

  const hideComments = () => {
    setnumberOfCommentsToShow(5)
  }

  useEffect(() => {
    dispatch(getComments(postId))
  }, [dispatch, postId])

  if (!comments || !authorsOfComments) {
    return <Preloader top="90%" />
  }

  if (numberOfCommentsToShow >= Object.values(comments).length) {
    isShowedButton = false
  } else {
    isShowedButton = true
  }

  const sortedComments = Object.values(comments)
    .filter((c) => !!c.id)
    .sort((a, b) => {
      // return new window.Date(a.dateCreated) - new window.Date(b.dateCreated)
      return new window.Date(b.dateCreated) - new window.Date(a.dateCreated)
    })
    .slice(0, numberOfCommentsToShow)

  return (
    <Wrapper>
      <CommentsList
        sortedComments={sortedComments}
        authorsOfComments={authorsOfComments}
        userId={userId}
        postId={postId}
      />
      <Box sx={{ marginTop: '10px', marginBottom: '10px', marginLeft: '3px' }}>
        <>
          {Object.keys(comments).length < 6 ||
            (isShowedButton ? (
              <CommentsCounterButton variant="body2" onClick={showAllComments}>
                Show all comments
              </CommentsCounterButton>
            ) : (
              <CommentsCounterButton variant="body2" onClick={hideComments}>
                Hide comments
              </CommentsCounterButton>
            ))}
        </>
      </Box>
      <AnswersFrom
        user={user}
        setComment={setComment}
        comment={comment}
        onSubmitAnswersForm={onSubmitAnswersForm}
      />
    </Wrapper>
  )
}
