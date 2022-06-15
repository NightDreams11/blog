import { Avatar } from '@mui/material'
import { Preloader } from 'components/layout/Preloader/Preloader'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getComments } from 'store/comments'
import { getImageUrl } from 'utils/imageURL/imageURL'
import { Wrapper } from '../styled'
import { Author, CommentBody, CommentText, ShowMore, TextInput } from './styled'

let isShowedButton = true

export const CommentsComponent = ({ postId }) => {
  const dispatch = useDispatch()
  const [numberOfComments, setNumberOfComments] = useState(5)

  const commentsObj = useSelector((state) => state.commentsReducer.comments)

  const isFetching = useSelector(
    (state) => state.commentsReducer.toggleCommentsIsFetching
  )
  const author = useSelector((state) => state.commentsReducer.author)

  const comments = commentsObj?.comments.slice(0, numberOfComments)

  const showMoreComments = () => {
    setNumberOfComments(numberOfComments + 5)
  }

  useEffect(() => {
    dispatch(getComments(postId))
  }, [dispatch, postId])

  if (numberOfComments >= commentsObj?.comments.length) {
    isShowedButton = false
  }

  if (!commentsObj) {
    return <Preloader />
  }

  if (isFetching) {
    return <Preloader />
  }

  return (
    <Wrapper>
      <TextInput />
      {comments.map((elem) => {
        return (
          <CommentBody key={elem.id}>
            <Avatar src={author ? getImageUrl(author.avatar) : ''} />
            <Author variant="caption">{author ? author.name : 'Unknown'}</Author>
            <CommentText>{elem.text}</CommentText>
          </CommentBody>
        )
      })}
      {isShowedButton && (
        <ShowMore onClick={showMoreComments}>Показать еще</ShowMore>
      )}
    </Wrapper>
  )
}
