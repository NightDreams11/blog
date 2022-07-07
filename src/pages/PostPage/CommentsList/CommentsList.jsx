import { Box } from '@mui/system'
import { Wrapper, AnswersContainer } from './styled'
import { CommentComponent } from './CommentComponent/CommentComponents'

export const CommentsList = ({
  sortedComments = null,
  authorsOfComments,
  userId,
  postId,
}) => {
  return (
    <Wrapper>
      {sortedComments &&
        sortedComments.map((elem) => {
          return elem.id ? (
            <Box key={elem.id}>
              <CommentComponent
                text={elem.text}
                likes={elem.likes}
                commentedBy={elem.commentedBy}
                dateCreated={elem.dateCreated}
                followedCommentID={elem.followedCommentID}
                id={elem.id}
                authorsOfComments={authorsOfComments}
                userId={userId}
                postId={postId}
              />
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
