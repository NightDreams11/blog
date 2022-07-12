export function postAdapter(postResponse) {
  const vField = '__v'
  const idField = '_id'

  return {
    dateCreated: postResponse.data.dateCreated,
    title: postResponse.data.title,
    description: postResponse.data.description,
    fullText: postResponse.data.fullText,
    image: postResponse.data.image,
    postedBy: postResponse.data.postedBy,
    likes: postResponse.data.likes,
    v: postResponse.data[vField],
    id: postResponse.data[idField],
  }
}
