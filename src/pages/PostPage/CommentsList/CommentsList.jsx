import { Avatar, Divider } from '@mui/material'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { deleteComment, setLike } from 'store/comments'
import { dateFormatter } from 'utils/dateFormatter/dateFormatter'
import FavoriteIcon from '@mui/icons-material/Favorite'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder'
import { DeletePreloader } from 'components/layout/DeletePreloader/DeletePreloader'
import { isLiked } from 'utils/isLiked/isLiked'
import { getImageUrl } from 'utils/imageURL/imageURL'
import { Wrapper } from '../styled'
import {
  AnswersContainer,
  Author,
  CommentBody,
  CommentBodyContainerInner,
  CommentText,
  Date,
  DeleteMessageIcon,
  LikeCounter,
  LikesContainer,
} from './styled'

export const CommentsList = ({
  sortedComments = null,
  authorsOfComments,
  userId,
  perentId,
  postId,
}) => {
  const dispatch = useDispatch()

  const [deletingCommentId, setDeletingCommentId] = useState('')

  const deleteCommentIsFetching = useSelector(
    (state) => state.commentsReducer.toggleDeleteCommentsIsFetching
  )

  const deleteOwnComment = (commentId) => {
    dispatch(deleteComment({ commentId, postId }))
  }

  return (
    <Wrapper>
      {sortedComments &&
        sortedComments.map((elem) => {
          return elem.id ? (
            <CommentBody key={elem.id}>
              <Avatar
                src={
                  elem
                    ? getImageUrl(authorsOfComments[elem.commentedBy]?.avatar)
                    : ''
                }
                sx={{
                  height: !perentId ? '34px' : '24px',
                  width: !perentId ? '34px' : '24px',
                  mt: !perentId ? '5px' : '0px ',
                }}
              />
              <CommentBodyContainerInner
                sx={{
                  '&:hover .FavoriteBorderIcon ': {
                    color:
                      elem.likes?.length === 0
                        ? 'rgba(42, 88, 133, 0.5)'
                        : 'rgba(42, 88, 133, 1)',
                  },
                  '&:hover .DeleteMessageIcon': {
                    color:
                      elem.likes?.length === 0
                        ? 'rgba(42, 88, 133, 0.5)'
                        : 'rgba(42, 88, 133, 1)',
                  },
                }}
              >
                <Author variant="caption">
                  {elem ? authorsOfComments[elem.commentedBy]?.name : 'Unknown'}
                </Author>
                <CommentText variant="body2">{elem.text}</CommentText>
                <Date variant="caption">{dateFormatter(elem.dateCreated)}</Date>
                <LikesContainer
                  style={{
                    width: '27px',
                    height: '13px',
                  }}
                  onClick={() => {
                    dispatch(setLike(elem.id, perentId))
                  }}
                >
                  {isLiked(elem, userId) ? (
                    <FavoriteIcon
                      sx={{
                        width: '16px',
                        height: '13px',
                        mt: '3px',
                        color: '#e64646',
                      }}
                      onClick={() => {
                        dispatch(setLike(elem.id, perentId))
                      }}
                    />
                  ) : (
                    <FavoriteBorderIcon
                      className="FavoriteBorderIcon"
                      sx={{
                        width: '16px',
                        height: '13px',
                        mt: '3px',
                        color:
                          elem.likes?.length === 0
                            ? 'rgba(42, 88, 133, 0)'
                            : 'rgba(42, 88, 133, 1)',
                      }}
                    />
                  )}
                  <LikeCounter
                    style={{
                      width: '7px',
                      height: '13px',
                      fontSize: '13px',
                      color: isLiked(elem, userId) ? '#e64646' : '#2a5885',
                    }}
                  >
                    {elem.likes?.length !== 0 ? elem.likes?.length : ''}
                  </LikeCounter>
                </LikesContainer>
                {userId === elem.commentedBy &&
                  (deleteCommentIsFetching && deletingCommentId === elem.id ? (
                    <DeletePreloader />
                  ) : (
                    <DeleteMessageIcon
                      className="DeleteMessageIcon"
                      sx={{
                        cursor: 'pointer',
                        color: 'rgba(42, 88, 133, 0)',
                      }}
                      onClick={() => {
                        deleteOwnComment(elem.id)
                        setDeletingCommentId(elem.id)
                      }}
                    />
                  ))}
                <Divider />
                <AnswersContainer>
                  <CommentsList
                    sortedComments={elem.answers && [elem.answers]}
                    authorsOfComments={authorsOfComments}
                    userId={userId}
                    perentId={elem.id}
                  />
                </AnswersContainer>
              </CommentBodyContainerInner>
            </CommentBody>
          ) : (
            ''
          )
        })}
    </Wrapper>
  )
}
