export const isLiked = (likes, userId) => {
  return Object.values(likes).includes(userId)
}
