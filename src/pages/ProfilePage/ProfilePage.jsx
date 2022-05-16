import { useSelector } from 'react-redux'
import { Navigate } from 'react-router'
import { Wrapper } from './styled'

export const ProfilePage = () => {
  const token = useSelector((state) => state.auth.token)
  if (!token) {
    return <Navigate to="/login" />
  }

  return <Wrapper>Profile</Wrapper>
}
