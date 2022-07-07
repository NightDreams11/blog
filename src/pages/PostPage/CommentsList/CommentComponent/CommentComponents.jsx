import { Avatar, Divider, Typography } from '@mui/material'
import { useState } from 'react'
import { Box } from '@mui/system'
import { dateFormatter } from 'utils/dateFormatter/dateFormatter'
import { getImageUrl } from 'utils/imageURL/imageURL'
import { isLiked } from 'utils/isLiked/isLiked'
import { useDispatch, useSelector } from 'react-redux'
import { createComment, deleteComment, editComment, setLike } from 'store/comments'
import { DeletePreloader } from 'components/layout/DeletePreloader/DeletePreloader'
import { AnswersFrom } from 'pages/PostPage/Comments/AnswersForm/AnswersForm'
import {
  Wrapper,
  Author,
  CommentBody,
  CommentBodyContainerInner,
  Date,
  LikeCounter,
  LikesContainer,
  LikedIcon,
  NoLikedIcon,
  AnswerButton,
  EditMessageIcon,
  TextInput,
  DeleteMessageIcon,
  EditModeButtonContainer,
  SaveEditCommentButton,
  CancelEditCommentButton,
} from './styled'

const semiIconsColor = 'rgba(42, 88, 133, 0.5)'
const iconsColor = 'rgba(42, 88, 133, 1)'

export const CommentComponent = ({
  text,
  authorsOfComments,
  userId,
  postId,
  likes,
  commentedBy,
  dateCreated,
  followedCommentID,
  id,
}) => {
  const dispatch = useDispatch()
  const [editMode, setEditMode] = useState(false)
  const [answerMode, setAnswerMode] = useState(false)
  const [comment, setComment] = useState('')
  const [editCommentValue, setEditCommentValue] = useState(!answerMode ? text : '')
  const [deleteCommentIsFetching, setDeleteCommentIsFetching] = useState(false)
  const user = useSelector((state) => state.auth.user)

  const deleteOwnComment = async () => {
    setDeleteCommentIsFetching(true)
    await dispatch(deleteComment({ commentId: id, postId }))
    setDeleteCommentIsFetching(false)
  }

  const editOwnComment = async () => {
    await dispatch(editComment({ commentId: id, postId, text: editCommentValue }))
    setEditMode(false)
  }

  const onSubmitAnswersForm = async () => {
    await dispatch(createComment({ comment, postId, followedCommentID: id }))
    setAnswerMode(false)
  }

  // if (!authorsOfComments[commentedBy]) {
  //   return <Wrapper />
  // }

  return (
    <Wrapper>
      <CommentBody>
        <Avatar
          src={getImageUrl(authorsOfComments[commentedBy]?.avatar)}
          sx={{
            height: !followedCommentID ? '34px' : '24px',
            width: !followedCommentID ? '34px' : '24px',
            mt: !followedCommentID ? '5px' : '0px ',
          }}
        />
        <CommentBodyContainerInner
          sx={{
            '&:hover .FavoriteBorderIcon': {
              color: likes.length === 0 ? semiIconsColor : iconsColor,
            },
            '&:hover .DeleteMessageIcon': {
              color: semiIconsColor,
            },
            '&:hover .EditIcon': {
              color: semiIconsColor,
            },
          }}
        >
          <Author variant="caption">{authorsOfComments[commentedBy]?.name}</Author>
          {!editMode ? (
            <Box>
              <Typography variant="body2">{text}</Typography>
              <Date variant="caption">{dateFormatter(dateCreated)}</Date>
              {!followedCommentID && (
                <AnswerButton
                  variant="body2"
                  onClick={() => {
                    setAnswerMode(true)
                  }}
                >
                  Answer
                </AnswerButton>
              )}
              <LikesContainer
                style={{
                  transition: '0.3s',
                  right: likes.length === 0 ? -10 : 0,
                }}
                onClick={() => {
                  dispatch(setLike({ id, perentId: followedCommentID }))
                }}
              >
                {isLiked(likes, userId) ? (
                  <LikedIcon />
                ) : (
                  <NoLikedIcon
                    className="FavoriteBorderIcon"
                    sx={{
                      color:
                        likes.length === 0
                          ? 'rgba(42, 88, 133, 0)'
                          : 'rgba(42, 88, 133, 1)',
                    }}
                  />
                )}
                <LikeCounter
                  style={{
                    color: isLiked(likes, userId) ? '#e64646' : '#2a5885',
                  }}
                >
                  {likes.length !== 0 ? likes.length : ''}
                </LikeCounter>
              </LikesContainer>
              {userId === commentedBy && (
                <EditMessageIcon
                  className="EditIcon"
                  onClick={() => {
                    setEditCommentValue(editCommentValue)
                    setEditMode(true)
                  }}
                />
              )}
              {userId === commentedBy &&
                (deleteCommentIsFetching ? (
                  <DeletePreloader />
                ) : (
                  <DeleteMessageIcon
                    className="DeleteMessageIcon"
                    onClick={deleteOwnComment}
                  />
                ))}
              <Divider />
              {answerMode ? (
                <AnswersFrom
                  user={user}
                  comment={comment}
                  setComment={setComment}
                  onSubmitAnswersForm={onSubmitAnswersForm}
                  followedCommentID={id}
                />
              ) : (
                ''
              )}
            </Box>
          ) : (
            <Box>
              <TextInput
                value={editCommentValue}
                onChange={(e) => {
                  setEditCommentValue(e.target.value)
                }}
              />
              <EditModeButtonContainer>
                <CancelEditCommentButton onClick={() => setEditMode(false)}>
                  Cancel
                </CancelEditCommentButton>
                <SaveEditCommentButton
                  variant="contained"
                  disableElevation
                  onClick={editOwnComment}
                >
                  Save
                </SaveEditCommentButton>
              </EditModeButtonContainer>
            </Box>
          )}
        </CommentBodyContainerInner>
      </CommentBody>
    </Wrapper>
  )
}
