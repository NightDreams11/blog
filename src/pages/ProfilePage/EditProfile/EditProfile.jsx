import { useDispatch, useSelector } from 'react-redux'
import * as yup from 'yup'
import { useFormik } from 'formik'
import { updateUser } from 'store/profile'
import { dateFormatter } from 'utils/dateFormatter/dateFormatter'
import { Avatar, Grid, Typography } from '@mui/material'
import { getImageUrl } from 'utils/imageURL/imageURL'
import { PreviewButton } from './PreviewButton/PreviewButton'
import {
  BoxContainer,
  ContainerWrapper,
  Failed,
  Form,
  GridProfile,
  Passed,
  RouteLink,
  SaveButton,
  styles,
  stylesForTextField,
  Title,
  Wrapper,
  GridContainerInner,
  BoxProfileBlock,
  BoxButtonBlock,
  BackButton,
  EditProfileTextField,
} from './styled'

export const EditProfile = ({ user }) => {
  const previewAvatar = useSelector((state) => state.auth.previewAvatar)
  const dispatch = useDispatch()

  const validationSchema = yup.object().shape({
    name: yup
      .string()
      .required()
      .min(2, 'Min lenght 2 characters')
      .matches(/^[a-zA-Z\s]+[a-zA-Z\s]$/, 'Please use only latin characters'),
    extra_details: yup.string(),
    skills: yup.string(),
    profession: yup.string(),
    details: yup.string(),
  })

  const formik = useFormik({
    initialValues: {
      name: '',
      extra_details: '',
      skills: '',
      profession: '',
      details: '',
    },
    // validationSchema: validationSchema
    validationSchema,
    onSubmit: (data) => {
      // key это элемент, в данном случае, массива. Массив создан на основании объекта data
      // Соответственно key равен по очереди name, extra_details и т.д.
      // пустой объект в конце определяет чем является accumulator на первой итерации
      const newData = Object.keys(data).reduce((accumulator, key) => {
        accumulator[key] = data[key] || user[key]
        return accumulator
      }, {})
      dispatch(updateUser(newData))
    },
  })

  return (
    <Wrapper>
      <ContainerWrapper>
        <Grid container spacing={2}>
          <GridProfile item xs={8}>
            <Avatar
              sx={{ ...styles.avatar }}
              alt={user.name}
              src={
                previewAvatar !== null
                  ? previewAvatar.imageUrl
                  : getImageUrl(user.avatar)
              }
            />
            <BoxProfileBlock>
              <Typography>{user.name}</Typography>
              <Typography>{`Created at: ${dateFormatter(
                user.dateCreated
              )}`}</Typography>
              <Typography>{`Email: ${user.email}`}</Typography>
              <Typography>{`Extra details: ${user.extra_details}`}</Typography>
              <Typography>{`Skills: ${user.skills}`}</Typography>
              <Typography>{`Profession: ${user.profession}`}</Typography>
              <Typography>{`Details: ${user.details}`}</Typography>
            </BoxProfileBlock>
          </GridProfile>
          <GridProfile item xs={4}>
            <BoxButtonBlock>
              <RouteLink to="/profile">
                <BackButton variant="contained">Back</BackButton>
              </RouteLink>
            </BoxButtonBlock>
          </GridProfile>
          <GridContainerInner item xs={3}>
            <PreviewButton />
          </GridContainerInner>
          <GridContainerInner item xs={12}>
            {/* Form */}
            <BoxContainer>
              <Form onSubmit={formik.handleSubmit}>
                <Title>Данные профиля</Title>
                <EditProfileTextField
                  sx={{ ...stylesForTextField }}
                  name="name"
                  placeholder="Enter your name"
                  label="Name"
                  autoComplete="off"
                  error={!!formik.errors.name}
                  value={formik.values.name}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  InputProps={{
                    endAdornment:
                      formik.touched.name &&
                      (formik.errors.name ? (
                        <Failed color="error" sx={{ ...stylesForTextField.icon }} />
                      ) : (
                        <Passed
                          color="success"
                          sx={{ ...stylesForTextField.icon }}
                        />
                      )),
                  }}
                  FormHelperTextProps={{
                    style: stylesForTextField.helperText,
                  }}
                  helperText={formik.errors?.name}
                />
                <EditProfileTextField
                  sx={{ ...stylesForTextField }}
                  name="extra_details"
                  placeholder="Enter extra details"
                  label="Extra details"
                  autoComplete="off"
                  error={!!formik.errors.extra_details}
                  value={formik.values.extra_details}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  InputProps={{
                    endAdornment:
                      formik.touched.extra_details &&
                      (formik.errors.extra_details ? (
                        <Failed color="error" sx={{ ...stylesForTextField.icon }} />
                      ) : (
                        <Passed
                          color="success"
                          sx={{ ...stylesForTextField.icon }}
                        />
                      )),
                  }}
                  FormHelperTextProps={{
                    style: stylesForTextField.helperText,
                  }}
                  helperText={formik.errors?.password?.message}
                />
                <EditProfileTextField
                  sx={{ ...stylesForTextField }}
                  name="skills"
                  placeholder="Enter your skills"
                  label="Skills"
                  autoComplete="off"
                  error={!!formik.errors.skills}
                  value={formik.values.skills}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  InputProps={{
                    endAdornment:
                      formik.touched.skills &&
                      (formik.errors.skills ? (
                        <Failed color="error" sx={{ ...stylesForTextField.icon }} />
                      ) : (
                        <Passed
                          color="success"
                          sx={{ ...stylesForTextField.icon }}
                        />
                      )),
                  }}
                  FormHelperTextProps={{
                    style: stylesForTextField.helperText,
                  }}
                  helperText={formik.errors?.password?.message}
                />
                <EditProfileTextField
                  sx={{ ...stylesForTextField }}
                  name="profession"
                  placeholder="Enter your profession"
                  label="Profession"
                  autoComplete="off"
                  error={!!formik.errors.profession}
                  value={formik.values.profession}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  InputProps={{
                    endAdornment:
                      formik.touched.profession &&
                      (formik.errors.profession ? (
                        <Failed color="error" sx={{ ...stylesForTextField.icon }} />
                      ) : (
                        <Passed
                          color="success"
                          sx={{ ...stylesForTextField.icon }}
                        />
                      )),
                  }}
                  FormHelperTextProps={{
                    style: stylesForTextField.helperText,
                  }}
                  helperText={formik.errors?.password?.message}
                />
                <EditProfileTextField
                  sx={{ ...stylesForTextField }}
                  name="details"
                  placeholder="Enter details"
                  label="Details"
                  autoComplete="off"
                  error={!!formik.errors.details}
                  value={formik.values.details}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  InputProps={{
                    endAdornment:
                      formik.touched.details &&
                      (formik.errors.details ? (
                        <Failed color="error" sx={{ ...stylesForTextField.icon }} />
                      ) : (
                        <Passed
                          color="success"
                          sx={{ ...stylesForTextField.icon }}
                        />
                      )),
                  }}
                  FormHelperTextProps={{
                    style: stylesForTextField.helperText,
                  }}
                  helperText={formik.errors?.password?.message}
                />
                <SaveButton
                  variant="contained"
                  type="submit"
                  disabled={
                    !formik.touched.name ||
                    !formik.touched.extra_details ||
                    !formik.touched.skills ||
                    !formik.touched.profession ||
                    !formik.touched.details
                  }
                >
                  Save
                </SaveButton>
              </Form>
            </BoxContainer>
          </GridContainerInner>
        </Grid>
      </ContainerWrapper>
    </Wrapper>
  )
}
