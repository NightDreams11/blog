export function postAdapter(postResponse) {
  const vField = '__v'
  const idField = '_id'

  return {
    dateCreated: postResponse.data.dateCreated,
    description: postResponse.data.description,
    fullText: postResponse.data.fullText,
    postedBy: postResponse.data.postedBy,
    likes: postResponse.data.likes,
    v: postResponse.data[vField],
    id: postResponse.data[idField],
  }
}
