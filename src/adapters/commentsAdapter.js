export function commentsAdapter(commentsResponse) {
  const vField = '__v'
  const idField = '_id'

  return {
    comments: commentsResponse.data.map((item) => {
      return {
        commentedBy: item.commentedBy,
        dateCreated: item.dateCreated,
        followedCommentID: item.followedCommentID,
        likes: item.likes,
        postID: item.postID,
        text: item.text,
        v: item[vField],
        id: item[idField],
      }
    }),
  }
}
