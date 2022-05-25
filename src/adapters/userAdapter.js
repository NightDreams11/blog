export function userAdapter(userResponse) {
  const vField = '__v'
  const idField = '_id'

  return {
    avatar: userResponse.data.avatar,
    dateCreated: userResponse.data.dateCreated,
    details: userResponse.data.details,
    email: userResponse.data.email,
    extra_details: userResponse.data.extra_details,
    name: userResponse.data.name,
    profession: userResponse.data.profession,
    skills: userResponse.data.skills,
    v: userResponse.data[vField],
    id: userResponse.data[idField],
  }
}
