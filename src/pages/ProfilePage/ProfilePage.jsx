import { Navigate } from 'react-router'
import { Wrapper } from './styled'

export const ProfilePage = () => {
  const token = localStorage.getItem('token')

  if (!token) {
    return <Navigate to="/login" />
  }

  return <Wrapper>Profile</Wrapper>
}
