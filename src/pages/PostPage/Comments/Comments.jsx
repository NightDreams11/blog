import { Preloader } from 'components/layout/Preloader/Preloader'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getComments } from 'store/comments'
import { Wrapper } from '../styled'
import { CommentsList } from '../CommentsList/CommentsList'
import { ShowMore, TextInput } from './styled'

let isShowedButton = true

export const CommentsComponent = ({ postId }) => {
  const dispatch = useDispatch()
  const [numberOfComments, setNumberOfComments] = useState(5)

  const comments = useSelector((state) => state.commentsReducer.comments)
  const userId = useSelector((state) => state.auth.user.id)

  const authorsOfComments = useSelector(
    (state) => state.commentsReducer.authorsOfComments
  )

  const isFetching = useSelector(
    (state) => state.commentsReducer.toggleCommentsIsFetching
  )

  const showMoreComments = () => {
    setNumberOfComments(numberOfComments + 5)
  }

  useEffect(() => {
    dispatch(getComments(postId))
  }, [dispatch, postId])

  if (!comments || !authorsOfComments) {
    return <Preloader />
  }

  if (numberOfComments >= Object.values(comments).length) {
    isShowedButton = false
  }

  const sortedComments = Object.values(comments)
    .sort((a, b) => {
      return new window.Date(a.dateCreated) - new window.Date(b.dateCreated)
    })
    .slice(0, numberOfComments)

  if (isFetching) {
    return <Preloader />
  }

  return (
    <Wrapper>
      <TextInput />
      <CommentsList
        sortedComments={sortedComments}
        authorsOfComments={authorsOfComments}
        userId={userId}
        isShowedButton={isShowedButton}
        showMoreComments={showMoreComments}
      />
      {isShowedButton && (
        <ShowMore onClick={showMoreComments}>Показать еще</ShowMore>
      )}
    </Wrapper>
  )
}
