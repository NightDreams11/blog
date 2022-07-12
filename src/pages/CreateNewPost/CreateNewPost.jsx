import { Typography } from '@mui/material'
import { Box } from '@mui/system'
import { useFormik } from 'formik'
import { PreviewButton } from 'components/layout/PreviewButton/PreviewButton'
import { useMemo } from 'react'
import { useDispatch, useSelector, useStore } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { createPost, editPost, setPostImageAC, updatePostPhoto } from 'store/posts'
import { getImageUrl } from 'utils/imageURL/imageURL'
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

export const CreateNewPost = ({ editMode }) => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const post = useSelector((state) => state.postsReducer.post)

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
      title: post ? post.title : '',
      fullText: post ? post.fullText : '',
      description: post ? post.description : '',
    },
    validationSchema,
    onSubmit: async (data) => {
      if (!editMode) {
        await dispatch(
          createPost({
            payload: {
              title: data.title,
              fullText: data.fullText,
              description: data.description,
            },
          })
        )
      }
      const { createdPostsId } = store.getState().postsReducer
      if (previewPostPhoto) {
        await dispatch(
          updatePostPhoto({ id: createdPostsId, file: previewPostPhoto.file })
        )
      }
      if (editMode) {
        await dispatch(
          editPost({
            id: post.id,
            payload: {
              title: data.title,
              fullText: data.fullText,
              description: data.description,
            },
          })
        )
      }
      navigate(`/posts/${editMode ? post.id : createdPostsId}`)
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
            value={editMode ? formik.values.title : undefined}
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
            value={editMode ? formik.values.fullText : undefined}
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
            value={editMode ? formik.values.description : undefined}
            placeholder="Add a description..."
            label="Description"
            autoComplete="off"
            error={!!formik.errors.description}
            helperText={formik.errors?.description}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {previewPostPhoto && !editMode && (
            <Box>
              <img src={previewPostPhoto.imageUrl} alt="post preview" />
            </Box>
          )}
          {editMode && previewPostPhoto && (
            <Box>
              <img src={previewPostPhoto.imageUrl} alt="post preview" />
            </Box>
          )}
          {editMode &&
            (editMode && previewPostPhoto ? (
              ''
            ) : (
              <Box>
                <img src={getImageUrl(post.image)} alt="post preview" />
              </Box>
            ))}
          <PreviewButton
            photoPreview={previewPostPhoto}
            setPhotoPreview={setPostImageAC}
          />
          <CreateNewPostButton
            variant="contained"
            type="submit"
            disabled={isDisabled}
          >
            {editMode ? 'Edit post' : 'Add new post'}
          </CreateNewPostButton>
        </Form>
      </ContainerWrapper>
    </Wrapper>
  )
}
