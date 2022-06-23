export const isLiked = (elem, userId) => {
  return elem?.likes?.includes(userId)
}
