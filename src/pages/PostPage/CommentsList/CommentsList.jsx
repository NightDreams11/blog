import { Avatar, Divider, Typography } from '@mui/material'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { createComment, deleteComment, editComment, setLike } from 'store/comments'
import { dateFormatter } from 'utils/dateFormatter/dateFormatter'
import { Box } from '@mui/system'
import { DeletePreloader } from 'components/layout/DeletePreloader/DeletePreloader'
import { isLiked } from 'utils/isLiked/isLiked'
import { getImageUrl } from 'utils/imageURL/imageURL'
import {
  Wrapper,
  AnswersContainer,
  Author,
  CancelEditCommentButton,
  CommentBody,
  CommentBodyContainerInner,
  Date,
  DeleteMessageIcon,
  EditMessageIcon,
  EditModeButtonContainer,
  LikeCounter,
  LikesContainer,
  SaveEditCommentButton,
  TextInput,
  LikedIcon,
  NoLikedIcon,
  AnswerButton,
} from './styled'
import { AnswersFrom } from '../Comments/AnswersForm/AnswersForm'

const semiIconsColor = 'rgba(42, 88, 133, 0.5)'
const iconsColor = 'rgba(42, 88, 133, 1)'

export const CommentsList = ({
  sortedComments = null,
  authorsOfComments,
  userId,
  perentId,
  postId,
}) => {
  const dispatch = useDispatch()

  const [editMode, setEditMode] = useState(false)
  const [answerMode, setAnswerMode] = useState(false)
  const [deletingCommentId, setDeletingCommentId] = useState('')
  const [editCommentId, setEditCommentId] = useState('')
  const [answerCommentId, setAnswerCommentId] = useState('')
  const [editCommentValue, setEditCommentValue] = useState('')
  const [comment, setComment] = useState('')

  const deleteCommentIsFetching = useSelector(
    (state) => state.commentsReducer.toggleDeleteCommentsIsFetching
  )

  const user = useSelector((state) => state.auth.user)

  const deleteOwnComment = (commentId) => {
    dispatch(deleteComment({ commentId, postId }))
  }

  const editOwnComment = async (commentId, text) => {
    await dispatch(editComment({ commentId, postId, text }))
    setEditMode(false)
  }

  const onSubmitAnswersForm = async (followedCommentID = null) => {
    await dispatch(createComment({ comment, postId, followedCommentID }))
    setAnswerMode(false)
  }

  return (
    <Wrapper>
      {sortedComments &&
        sortedComments.map((elem) => {
          return elem.id ? (
            <Box key={elem.id}>
              <CommentBody>
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
                    '&:hover .FavoriteBorderIcon': {
                      color: elem.likes?.length === 0 ? semiIconsColor : iconsColor,
                    },
                    '&:hover .DeleteMessageIcon': {
                      color: semiIconsColor,
                    },
                    '&:hover .EditIcon': {
                      color: semiIconsColor,
                    },
                  }}
                >
                  <Author variant="caption">
                    {authorsOfComments[elem.commentedBy]?.name}
                  </Author>
                  {!editMode || editCommentId !== elem.id ? (
                    <Box>
                      <Typography variant="body2">{elem.text}</Typography>
                      <Date variant="caption">
                        {dateFormatter(elem.dateCreated)}
                      </Date>
                      {!elem.followedCommentID && (
                        <AnswerButton
                          variant="body2"
                          onClick={() => {
                            // dispatch(toggleAnswerModeAC(true))
                            setAnswerMode(true)
                            setAnswerCommentId(elem.id)
                          }}
                        >
                          Answer
                        </AnswerButton>
                      )}
                      <LikesContainer
                        style={{
                          transition: '0.3s',
                          right: elem.likes?.length === 0 ? -10 : 0,
                        }}
                        onClick={() => {
                          dispatch(setLike(elem.id, perentId))
                        }}
                      >
                        {isLiked(elem, userId) ? (
                          <LikedIcon />
                        ) : (
                          <NoLikedIcon
                            className="FavoriteBorderIcon"
                            sx={{
                              color:
                                elem.likes?.length === 0
                                  ? 'rgba(42, 88, 133, 0)'
                                  : 'rgba(42, 88, 133, 1)',
                            }}
                          />
                        )}
                        <LikeCounter
                          style={{
                            color: isLiked(elem, userId) ? '#e64646' : '#2a5885',
                          }}
                        >
                          {elem.likes?.length !== 0 ? elem.likes?.length : ''}
                        </LikeCounter>
                      </LikesContainer>
                      {userId === elem.commentedBy && (
                        <EditMessageIcon
                          className="EditIcon"
                          onClick={() => {
                            setEditCommentId(elem.id)
                            setEditCommentValue(elem.text)
                            setEditMode(true)
                          }}
                        />
                      )}
                      {userId === elem.commentedBy &&
                        (deleteCommentIsFetching && deletingCommentId === elem.id ? (
                          <DeletePreloader />
                        ) : (
                          <DeleteMessageIcon
                            className="DeleteMessageIcon"
                            onClick={() => {
                              deleteOwnComment(elem.id)
                              setDeletingCommentId(elem.id)
                            }}
                          />
                        ))}
                      <Divider />
                      {answerMode && answerCommentId === elem.id ? (
                        <AnswersFrom
                          user={user}
                          comment={comment}
                          setComment={setComment}
                          onSubmitAnswersForm={onSubmitAnswersForm}
                          followedCommentID={elem.id}
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
                          onClick={() => {
                            editOwnComment(elem.id, editCommentValue)
                          }}
                        >
                          Save
                        </SaveEditCommentButton>
                      </EditModeButtonContainer>
                    </Box>
                  )}
                </CommentBodyContainerInner>
              </CommentBody>
              {elem.answers && !!Object.values(elem.answers).length && (
                <AnswersContainer>
                  <CommentsList
                    sortedComments={elem.answers && Object.values(elem.answers)}
                    authorsOfComments={authorsOfComments}
                    userId={userId}
                    perentId={elem.id}
                    postId={postId}
                  />
                </AnswersContainer>
              )}
            </Box>
          ) : (
            ''
          )
        })}
    </Wrapper>
  )
}
