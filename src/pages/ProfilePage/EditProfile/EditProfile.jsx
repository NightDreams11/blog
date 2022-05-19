import { useDispatch, useSelector } from 'react-redux'
import { Navigate } from 'react-router'
import * as yup from 'yup'
import { useFormik } from 'formik'
import { UploadButton } from 'components/layout/UploadButton/UploadButton'
import { updateUser } from 'store/profile'
import { dateFormatter } from 'utils/dateFormatter/dateFormatter'
import {
  BoxContainer,
  BoxInner1,
  BoxInner2,
  ContainerWrapper,
  Description,
  Details,
  EditButton1,
  ExtraDetails,
  Failed,
  Form,
  GridContainer,
  GridElement1,
  GridElement2,
  GridElement3,
  GridElement4,
  Name,
  Passed,
  Profession,
  ProfileAvatar,
  RouteLink,
  SaveButton,
  Skills,
  styles,
  stylesForTextField,
  Title,
  Wrapper,
} from './styled'

export const EditProfile = () => {
  const dispatch = useDispatch()
  const user = useSelector((state) => state.auth.user)
  const token = useSelector((state) => state.auth.token)

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
      const newData = {
        name: !data.name ? user.name : data.name,
        extra_details: !data.extra_details ? user.extra_details : data.extra_details,
        skills: !data.skills ? user.skills : !data.skills,
        profession: !data.skills ? user.skills : data.skills,
        details: !data.details ? user.details : data.details,
      }
      dispatch(updateUser(newData))
    },
  })

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
              <RouteLink to="/profile">
                <EditButton1 variant="contained">Back</EditButton1>
              </RouteLink>
            </BoxInner2>
          </GridElement2>
          <GridElement3 item xs={3}>
            <UploadButton>Upload avatar</UploadButton>
          </GridElement3>
          <GridElement4 item xs={12}>
            {/* Form */}
            <BoxContainer>
              <Form onSubmit={formik.handleSubmit}>
                <Title>Данные профиля</Title>
                <Name
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
                <ExtraDetails
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
                <Skills
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
                <Profession
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
                <Details
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
          </GridElement4>
        </GridContainer>
      </ContainerWrapper>
    </Wrapper>
  )
}
