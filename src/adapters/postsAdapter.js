export function postsAdapter(postsResponse) {
  const vField = '__v'
  const idField = '_id'

  return {
    posts: postsResponse.data.data.map((item) => {
      return {
        title: item.title,
        description: item.description,
        postedBy: item.postedBy,
        dateCreated: item.dateCreated,
        image: item.image,
        v: item[vField],
        id: item[idField],
      }
    }),
    pagination: postsResponse.data.pagination,
  }
}
