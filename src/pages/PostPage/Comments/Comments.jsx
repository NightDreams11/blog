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

  const comments = useSelector((state) => state.commentsReducer.comments)
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

  if (numberOfComments >= comments.length) {
    isShowedButton = false
  }

  const commentsAuthors = authorsOfComments.reduce((acc, elem) => {
    acc[elem.id] = elem
    return acc
  }, {})

  const sortedComments = comments.slice(0, numberOfComments)

  if (isFetching) {
    return <Preloader />
  }

  return (
    <Wrapper>
      <TextInput />
      {sortedComments.map((elem) => {
        return (
          <CommentBody key={elem.id}>
            <Avatar
              key={elem.id}
              src={elem ? getImageUrl(commentsAuthors[elem.commentedBy].avatar) : ''}
            />
            <Author variant="caption">
              {elem ? commentsAuthors[elem.commentedBy].name : 'Unknown'}
            </Author>
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
