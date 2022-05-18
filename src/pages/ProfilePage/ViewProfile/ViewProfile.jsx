import { useSelector } from 'react-redux'
import { Navigate } from 'react-router'
import { Link } from 'react-router-dom'
import {
  BoxInner1,
  BoxInner2,
  ContainerWrapper,
  Description,
  EditButton1,
  EditButton2,
  GridContainer,
  GridElement1,
  GridElement2,
  ProfileAvatar,
  styles,
  Wrapper,
} from './styled'

export const ViewProfile = () => {
  const user = useSelector((state) => state.auth.user)
  const token = useSelector((state) => state.auth.token)
  if (!token) {
    return <Navigate to="/login" />
  }

  return (
    <Wrapper>
      <ContainerWrapper>
        <GridContainer container spacing={2}>
          <GridElement1 item xs={8}>
            <Link to="/profile/edit">EditPage</Link>
            <ProfileAvatar
              sx={{ ...styles.avatar }}
              alt="profileLogo"
              src={user ? process.env.REACT_APP_URL + user.avatar : ''}
            />
            <BoxInner1>
              <Description>{user ? user.name : ''}</Description>
              <Description>{`Created at: ${
                user ? user.dateCreated : ''
              }`}</Description>
              <Description>{`Email: ${user ? user.email : ''}`}</Description>
            </BoxInner1>
          </GridElement1>
          <GridElement2 item xs={4}>
            <BoxInner2>
              <EditButton1 variant="contained">Edit Profile</EditButton1>
              <EditButton2 variant="contained" sx={{ ...styles.button2 }}>
                Delete Profile
              </EditButton2>
            </BoxInner2>
          </GridElement2>
        </GridContainer>
      </ContainerWrapper>
    </Wrapper>
  )
}
