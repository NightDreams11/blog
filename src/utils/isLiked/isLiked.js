export const isLiked = (elem, userId) => {
  return Object.values(elem).includes(userId)
}
