import { Typography } from '@mui/material'
import { Box } from '@mui/system'
import { useFormik } from 'formik'
import { PreviewButton } from 'pages/ProfilePage/EditProfile/PreviewButton/PreviewButton'
import { useMemo } from 'react'
import { useDispatch, useSelector, useStore } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { createPost, setPostImageAC, updatePostPhoto } from 'store/posts'
import * as yup from 'yup'
import {
  ContainerWrapper,
  CreateDescription,
  CreateFullText,
  CreateNewPostButton,
  CreateTitle,
  Form,
  Wrapper,
} from './styled'

export const CreateNewPost = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const previewPostPhoto = useSelector(
    (state) => state.postsReducer.previevPostImage
  )
  const store = useStore()

  const validationSchema = yup.object().shape({
    title: yup.string().min(5, 'Min lenght 5 characters'),
    fullText: yup.string().min(20, 'Min lenght 20 characters'),
    description: yup.string(),
  })

  const formik = useFormik({
    initialValues: {
      title: '',
      fullText: '',
      description: '',
    },
    validationSchema,
    onSubmit: async (data) => {
      await dispatch(
        createPost({
          payload: {
            title: data.title,
            fullText: data.fullText,
            description: data.description,
          },
        })
      )
      const { createdPostsId } = store.getState().postsReducer
      if (previewPostPhoto) {
        await dispatch(
          updatePostPhoto({ id: createdPostsId, file: previewPostPhoto.file })
        )
      }
      navigate(`/posts/${createdPostsId}`)
    },
  })

  const isDisabled = useMemo(() => {
    return (
      !formik.touched.title ||
      !formik.touched.fullText ||
      !formik.touched.description ||
      !!Object.keys(formik.errors).length ||
      formik.values.title.length === 0 ||
      formik.values.fullText.length === 0 ||
      formik.values.description.length === 0
    )
  }, [
    formik.touched.title,
    formik.touched.fullText,
    formik.touched.description,
    formik.errors,
    formik.values.title.length,
    formik.values.fullText.length,
    formik.values.description.length,
  ])

  return (
    <Wrapper>
      <ContainerWrapper>
        <Form onSubmit={formik.handleSubmit}>
          <Typography variant="h5">Create a new title</Typography>
          <CreateTitle
            name="title"
            placeholder="Add a title..."
            label="Title"
            autoComplete="off"
            error={!!formik.errors.title}
            helperText={formik.errors?.title}
            onChange={formik.handleChange}
            // Свойство formik.touched срабатывает только при onBlur
            onBlur={formik.handleBlur}
          />
          <Typography variant="h5">Add a text of your post</Typography>
          <CreateFullText
            name="fullText"
            placeholder="Add a text..."
            label="Text"
            autoComplete="off"
            error={!!formik.errors.fullText}
            helperText={formik.errors?.fullText}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          <Typography variant="h5">Add a little description</Typography>
          <CreateDescription
            name="description"
            placeholder="Add a description..."
            label="Description"
            autoComplete="off"
            error={!!formik.errors.description}
            helperText={formik.errors?.description}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {previewPostPhoto && (
            <Box>
              <img src={previewPostPhoto.imageUrl} alt="post preview" />
            </Box>
          )}
          <PreviewButton
            photoPreview={previewPostPhoto}
            setPhotoPreview={setPostImageAC}
          />
          <CreateNewPostButton
            variant="contained"
            type="submit"
            disabled={isDisabled}
          >
            Add new post
          </CreateNewPostButton>
        </Form>
      </ContainerWrapper>
    </Wrapper>
  )
}
