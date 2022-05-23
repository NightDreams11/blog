import { BasicModal } from 'components/layout/Modal/Modal'
import { dateFormatter } from 'utils/dateFormatter/dateFormatter'
import {
  ButtonBlockGrid,
  ButtonBoxContainer,
  ContainerWrapper,
  Description,
  DescriptionBoxContainer,
  EditProfileButton,
  GridContainer,
  ProfileAvatar,
  ProfileBlockGrid,
  RouteLink,
  styles,
  Wrapper,
} from './styled'

export const ViewProfile = ({ user }) => {
  return (
    <Wrapper>
      <ContainerWrapper>
        <GridContainer container spacing={2}>
          <ProfileBlockGrid item xs={8}>
            <ProfileAvatar
              sx={{ ...styles.avatar }}
              alt={user.name}
              src={process.env.REACT_APP_URL + user.avatar}
            />
            <DescriptionBoxContainer>
              <Description>{user.name}</Description>
              <Description>{`Created at: ${dateFormatter(
                user.dateCreated
              )}`}</Description>
              <Description>{`Email: ${user.email}`}</Description>
              <Description>{`Extra details: ${user.extra_details}`}</Description>
              <Description>{`Skills: ${user.skills}`}</Description>
              <Description>{`Profession: ${user.profession}`}</Description>
              <Description>{`Details: ${user.details}`}</Description>
            </DescriptionBoxContainer>
          </ProfileBlockGrid>
          <ButtonBlockGrid item xs={4}>
            <ButtonBoxContainer>
              <RouteLink to="/profile/edit">
                <EditProfileButton fullWidth variant="contained">
                  Edit Profile
                </EditProfileButton>
              </RouteLink>
              {/* Кнопку перенес в BasicModal */}
              <BasicModal />
            </ButtonBoxContainer>
          </ButtonBlockGrid>
        </GridContainer>
      </ContainerWrapper>
    </Wrapper>
  )
}
