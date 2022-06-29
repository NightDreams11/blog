import { Avatar, Divider, Typography } from '@mui/material'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  createComment,
  deleteComment,
  editComment,
  setLike,
  toggleEditModeAC,
} from 'store/comments'
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
import { Answers } from '../Comments/Answers/Answers'

export const CommentsList = ({
  sortedComments = null,
  authorsOfComments,
  userId,
  perentId,
  postId,
}) => {
  const dispatch = useDispatch()

  const [deletingCommentId, setDeletingCommentId] = useState('')
  const [editCommentId, setEditCommentId] = useState('')
  const [answerCommentId, setAnswerCommentId] = useState('')
  const [editCommentValue, setEditCommentValue] = useState('')
  const [answerMode, setAnswerMode] = useState(false)
  const [comment, setComment] = useState('')

  const deleteCommentIsFetching = useSelector(
    (state) => state.commentsReducer.toggleDeleteCommentsIsFetching
  )
  const editMode = useSelector((state) => state.commentsReducer.editMode)
  const user = useSelector((state) => state.auth.user)

  const deleteOwnComment = (commentId) => {
    dispatch(deleteComment({ commentId, postId }))
  }

  const editOwnComment = (commentId, text) => {
    dispatch(editComment({ commentId, postId, text }))
  }

  const createAsnwerToComment = (followedCommentID = null) => {
    dispatch(createComment({ comment, postId, followedCommentID }))
    setAnswerMode(!answerMode)
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
                  '&:hover .EditIcon': {
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
                {!editMode || editCommentId !== elem.id ? (
                  <Box>
                    <Typography variant="body2">{elem.text}</Typography>
                    <Date variant="caption">{dateFormatter(elem.dateCreated)}</Date>
                    {!elem.followedCommentID && (
                      <AnswerButton
                        variant="body2"
                        onClick={() => {
                          setAnswerMode(!answerMode)
                          setAnswerCommentId(elem.id)
                        }}
                      >
                        Answer
                      </AnswerButton>
                    )}
                    <LikesContainer
                      style={{
                        marginRight: isLiked(elem, userId) ? 10 : 0,
                        transition: '0.3s',
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
                          dispatch(toggleEditModeAC(true))
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
                      <Answers
                        user={user}
                        comment={comment}
                        setComment={setComment}
                        answerToComment={Boolean(true)}
                        createAsnwerToComment={createAsnwerToComment}
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
                      <CancelEditCommentButton
                        onClick={() => dispatch(toggleEditModeAC(false))}
                      >
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

                <AnswersContainer>
                  <CommentsList
                    sortedComments={elem.answers && [elem.answers]}
                    authorsOfComments={authorsOfComments}
                    userId={userId}
                    perentId={elem.id}
                    postId={postId}
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
