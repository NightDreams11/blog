export const loginValidator = (login) => {
  const regex = /^[a-zA-Z\s]+[a-zA-Z\s]$/

  if (regex.test(login)) {
    return false
  }
  if (login.match(/[0-9!"'@#$%^&№;?`~></\\=\-|*()_+{}[\].,:а-яА-ЯёЁ]/g)) {
    return 'Your name needs to be use only latin characters'
  }
  return 'Your name needs to be between 2 and 128 characters long'
}

export const passwordValidator = (password) => {
  const regex = /^[a-zA-Z0-9]+$/

  if (regex.test(password)) {
    return false
  }
  return 'Please use numbers and latin characters'
}
