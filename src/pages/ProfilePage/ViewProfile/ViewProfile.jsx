import { BasicModal } from 'components/layout/Modal/Modal'
import { useSelector } from 'react-redux'
import { Navigate } from 'react-router'
import { dateFormatter } from 'utils/dateFormatter/dateFormatter'
import {
  BoxInner1,
  BoxInner2,
  ContainerWrapper,
  Description,
  EditButton1,
  GridContainer,
  GridElement1,
  GridElement2,
  ProfileAvatar,
  RouteLink,
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
            <ProfileAvatar
              sx={{ ...styles.avatar }}
              alt={user ? user.name : ''}
              src={user ? process.env.REACT_APP_URL + user.avatar : ''}
            />
            <BoxInner1>
              <Description>{user ? user.name : ''}</Description>
              <Description>{`Created at: ${dateFormatter(
                user ? user.dateCreated : ''
              )}`}</Description>
              <Description>{`Email: ${user ? user.email : ''}`}</Description>
            </BoxInner1>
          </GridElement1>
          <GridElement2 item xs={4}>
            <BoxInner2>
              <RouteLink to="/profile/edit">
                <EditButton1 variant="contained">Edit Profile</EditButton1>
              </RouteLink>
              {/* Кнопку перенес в BasicModal */}
              <BasicModal />
            </BoxInner2>
          </GridElement2>
        </GridContainer>
      </ContainerWrapper>
    </Wrapper>
  )
}
