import { useSelector } from 'react-redux'
import { Navigate } from 'react-router'
import { EditProfile } from './EditProfile/EditProfile'
import { Wrapper } from './styled'
import { ViewProfile } from './ViewProfile/ViewProfile'

export const ProfilePage = ({ editMode }) => {
  let user = useSelector((state) => state.auth.user)
  if (user === null) {
    user = {}
  }

  if (!JSON.parse(localStorage.getItem('token'))) {
    return <Navigate to="/login" />
  }

  return (
    <Wrapper>
      {!editMode ? <ViewProfile user={user} /> : <EditProfile user={user} />}
    </Wrapper>
  )
}
