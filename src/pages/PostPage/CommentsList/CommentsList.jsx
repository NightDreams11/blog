import { Avatar, Divider } from '@mui/material'
import { useDispatch } from 'react-redux'
import { setLike } from 'store/comments'
import { dateFormatter } from 'utils/dateFormatter/dateFormatter'
import FavoriteIcon from '@mui/icons-material/Favorite'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder'
import { isLiked } from 'utils/isLiked/isLiked'
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
} from './styled'

export const CommentsList = ({
  sortedComments = null,
  authorsOfComments,
  userId,
  perentId,
}) => {
  const dispatch = useDispatch()

  return (
    <Wrapper>
      {sortedComments &&
        sortedComments.map((elem) => {
          return (
            <CommentBody
              key={elem.id}
              // sx={{
              //   '&:hover .MuiSvgIcon-root': {
              //     color:
              //       elem.likes?.length === 0
              //         ? 'rgba(42, 88, 133, 0.5)'
              //         : 'rgba(42, 88, 133, 1)',
              //   },
              // }}
            >
              <Avatar
                src={
                  elem
                    ? getImageUrl(authorsOfComments[elem.commentedBy]?.avatar)
                    : ''
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
                    width: '27px',
                    height: '13px',
                  }}
                >
                  {isLiked(elem, userId) ? (
                    <FavoriteIcon
                      sx={{
                        cursor: 'pointer',
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
                      sx={{
                        cursor: 'pointer',
                        width: '16px',
                        height: '13px',
                        mt: '3px',
                        color:
                          elem.likes?.length === 0
                            ? 'rgba(42, 88, 133, 0)'
                            : 'rgba(42, 88, 133, 1)',
                        '&:hover': {
                          color:
                            elem.likes?.length === 0
                              ? 'rgba(42, 88, 133, 0.5)'
                              : 'rgba(42, 88, 133, 1)',
                        },
                      }}
                      onClick={() => {
                        dispatch(setLike(elem.id, perentId))
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
                <Divider />
                <CommentsList
                  sortedComments={elem.answers && [elem.answers]}
                  authorsOfComments={authorsOfComments}
                  userId={userId}
                  perentId={elem.id}
                />
              </CommentBodyContainerInner>
            </CommentBody>
          )
        })}
    </Wrapper>
  )
}
