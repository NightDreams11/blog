export function userAdapter(userResponse) {
  const vField = '__v'
  const idField = '_id'

  return {
    avatar: userResponse.avatar,
    dateCreaterd: userResponse.dataCreated,
    details: userResponse.details,
    email: userResponse.email,
    extra_details: userResponse.extra_details,
    name: userResponse.name,
    profession: userResponse.profession,
    skills: userResponse.skills,
    v: userResponse[vField],
    id: userResponse[idField],
  }
}
