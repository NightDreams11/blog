import { useSelector } from 'react-redux'
import { Navigate } from 'react-router'
import { EditProfile } from './EditProfile/EditProfile'
import { Wrapper } from './styled'
import { ViewProfile } from './ViewProfile/ViewProfile'

export const ProfilePage = () => {
  const token = useSelector((state) => state.auth.token)
  const editMode = useSelector((state) => state.profile.editMode)

  if (!token) {
    return <Navigate to="/login" />
  }

  return <Wrapper>{!editMode ? <ViewProfile /> : <EditProfile />}</Wrapper>
}
