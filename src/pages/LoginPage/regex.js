export const emailValidator = (email) => {
  const regex =
    /^[^.\-/_+\s][a-zA-Z0-9+]*(((\.|-|_|\/)[a-zA-Z0-9])|[a-zA-Z0-9])*@([a-zA-Z0-9]|[a-zA-Z0-9]-)+\.[a-zA-Z0-9-]+((\.([a-zA-Z]+)$|([a-zA-Z])+$))/
  if (regex.test(email)) {
    return false
  }
  return 'Please use numbers and latin characters. Format х@х.хх'
}

export const passwordValidator = (password) => {
  const regex = /^[a-zA-Z0-9]{5,}$/

  if (regex.test(password)) {
    return false
  }
  if (!password.match(/^[a-zA-Z0-9]+$/g)) {
    return 'Please use numbers and latin characters'
  }
  return 'Password contains min 5 characters'
}
