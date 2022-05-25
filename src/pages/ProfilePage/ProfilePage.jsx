import { Preloader } from 'components/layout/Preloader/Preloader'
import { useSelector } from 'react-redux'
import { Navigate } from 'react-router'
import { EditProfile } from './EditProfile/EditProfile'
import { Wrapper } from './styled'
import { ViewProfile } from './ViewProfile/ViewProfile'

export const ProfilePage = ({ editMode }) => {
  const user = useSelector((state) => state.auth.user)

  if (!JSON.parse(localStorage.getItem('token'))) {
    return <Navigate to="/login" />
  }

  if (user === null) {
    return <Preloader />
  }

  return (
    <Wrapper>
      {!editMode ? <ViewProfile user={user} /> : <EditProfile user={user} />}
    </Wrapper>
  )
}
