import { useSelector } from 'react-redux'
import { Navigate } from 'react-router'
import { Wrapper } from './styled'

export const ProfilePage = () => {
  const rerender = useSelector((state) => state.auth.isRerender)
  const token = useSelector((state) => state.auth.token)
  if (!token && (rerender || !rerender)) {
    return <Navigate to="/login" />
  }

  return <Wrapper>Profile</Wrapper>
}
