import { Avatar, Typography } from '@mui/material'
import { useState } from 'react'
import { dateFormatter } from 'utils/dateFormatter/dateFormatter'
import { getImageUrl } from 'utils/imageURL/imageURL'
import { deleteUser } from 'store/profile'
import { useDispatch } from 'react-redux'
import { AlertDialogSlide } from 'components/layout/DeleteProfileConfirmation/DeleteProfileConfirmation'
import {
  ButtonBlockGrid,
  ButtonBoxContainer,
  ContainerWrapper,
  DeleteProfileButton,
  DelIcon,
  DescriptionBoxContainer,
  EditProfileButton,
  GridContainer,
  ProfileBlockGrid,
  RouteLink,
  styles,
  Wrapper,
} from './styled'

export const ViewProfile = ({ user }) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const dispatch = useDispatch()
  const confirmDeleteUser = () => {
    dispatch(deleteUser())
  }

  return (
    <Wrapper>
      <ContainerWrapper>
        <GridContainer container spacing={2}>
          <ProfileBlockGrid item xs={8}>
            <Avatar
              sx={{ ...styles.avatar }}
              alt={user.name}
              src={getImageUrl(user.avatar)}
            />
            <DescriptionBoxContainer>
              <Typography>{user.name}</Typography>
              <Typography>{`Created at: ${dateFormatter(
                user.dateCreated
              )}`}</Typography>
              <Typography>{`Email: ${user.email}`}</Typography>
              <Typography>{`Extra details: ${user.extra_details}`}</Typography>
              <Typography>{`Skills: ${user.skills}`}</Typography>
              <Typography>{`Profession: ${user.profession}`}</Typography>
              <Typography>{`Details: ${user.details}`}</Typography>
            </DescriptionBoxContainer>
          </ProfileBlockGrid>
          <ButtonBlockGrid item xs={4}>
            <ButtonBoxContainer>
              <RouteLink to="/profile/edit">
                <EditProfileButton fullWidth variant="contained">
                  Edit Profile
                </EditProfileButton>
              </RouteLink>
              <DeleteProfileButton
                variant="contained"
                startIcon={<DelIcon />}
                sx={{ ...styles.button2 }}
                onClick={() => setIsDialogOpen(true)}
                fullWidth
              >
                Delete Profile
              </DeleteProfileButton>
              <AlertDialogSlide
                isDialogOpen={isDialogOpen}
                setIsDialogOpen={setIsDialogOpen}
                reduxAction={confirmDeleteUser}
                text="Ваш аккаунт будет безвозвратно удален. Продолжить?"
              />
            </ButtonBoxContainer>
          </ButtonBlockGrid>
        </GridContainer>
      </ContainerWrapper>
    </Wrapper>
  )
}
