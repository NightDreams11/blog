export const getImageUrl = (path) => {
  if (path) {
    return process.env.REACT_APP_URL + path
  }
  return null
}
