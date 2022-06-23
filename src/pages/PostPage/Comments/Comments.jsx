import { Avatar, Divider } from '@mui/material'
import { Preloader } from 'components/layout/Preloader/Preloader'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getComments, setLike } from 'store/comments'
import { dateFormatter } from 'utils/dateFormatter/dateFormatter'
import FavoriteIcon from '@mui/icons-material/Favorite'
import { getImageUrl } from 'utils/imageURL/imageURL'
import { Wrapper } from '../styled'
import {
  Author,
  CommentBody,
  CommentBodyContainerInner,
  CommentText,
  Date,
  LikeCounter,
  LikesContainer,
  ShowMore,
  TextInput,
} from './styled'

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
      {sortedComments.map((elem) => {
        return (
          <CommentBody key={elem.id}>
            <Avatar
              key={elem.id}
              src={
                elem ? getImageUrl(authorsOfComments[elem.commentedBy]?.avatar) : ''
              }
              sx={{ height: '34px', width: '34px', mt: '5px' }}
            />
            <CommentBodyContainerInner>
              <Author variant="caption">
                {elem ? authorsOfComments[elem.commentedBy]?.name : 'Unknown'}
              </Author>
              <CommentText variant="body2">{elem.text}</CommentText>
              <Date variant="caption">{dateFormatter(elem.dateCreated)}</Date>
              <LikesContainer
                style={{
                  // background: isLiked(post, userId) ? '#ED7C7C' : '#edeef0',
                  width: '27px',
                  height: '13px',
                }}
              >
                <FavoriteIcon
                  sx={{
                    cursor: 'pointer',
                    width: '16px',
                    height: '13px',
                    mt: '3px',
                    color: '#e64646',
                  }}
                  onClick={() => {
                    dispatch(setLike(elem.id))
                  }}
                />
                <LikeCounter
                  style={{
                    width: '7px',
                    height: '13px',
                    fontSize: '13px',
                    color: '#e64646',
                  }}
                >
                  {elem.likes?.length}
                </LikeCounter>
              </LikesContainer>
              <Divider />
            </CommentBodyContainerInner>
          </CommentBody>
        )
      })}
      {isShowedButton && (
        <ShowMore onClick={showMoreComments}>Показать еще</ShowMore>
      )}
    </Wrapper>
  )
}
