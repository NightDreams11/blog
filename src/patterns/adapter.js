export function userAdapter(obj) {
  const vField = '__v'
  const newV = obj[vField]

  const idField = '_id'
  const newId = obj[idField]

  return {
    avatar: obj.avatar,
    dateCreaterd: obj.dataCreated,
    details: obj.details,
    email: obj.email,
    extra_details: obj.extra_details,
    name: obj.name,
    profession: obj.profession,
    skills: obj.skills,
    v: newV,
    id: newId,
  }
}
