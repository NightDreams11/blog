import { Typography } from '@mui/material'
import { Box } from '@mui/system'
import { useFormik } from 'formik'
import { PreviewButton } from 'components/layout/PreviewButton/PreviewButton'
import { useEffect, useMemo } from 'react'
import { useDispatch, useSelector, useStore } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { Preloader } from 'components/layout/Preloader/Preloader'
import { useIsMounted } from 'hooks/useIsMounted'
import {
  createPost,
  editPost,
  getPost,
  setPostImageAC,
  updatePostPhoto,
} from 'store/posts'
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
  const { id } = useParams()
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const isMounted = useIsMounted()
  const post = useSelector((state) => state.postsReducer.post)

  const previewPostPhoto = useSelector(
    (state) => state.postsReducer.previevPostImage
  )
  const store = useStore()

  useEffect(() => {
    if (id && post?.id !== id) {
      dispatch(getPost(id))
    }
  }, [post, id, dispatch])

  const validationSchema = yup.object().shape({
    title: yup.string().min(5, 'Min lenght 5 characters'),
    fullText: yup.string().min(20, 'Min lenght 20 characters'),
    description: yup.string(),
  })

  const {
    touched,
    values,
    errors,
    handleBlur,
    handleChange,
    handleSubmit,
    setValues,
  } = useFormik({
    initialValues: {
      title: '',
      fullText: '',
      description: '',
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

  const createOrEditReset = () => {
    if (editMode) {
      setValues({
        title: post.title,
        fullText: post.fullText,
        description: post.description,
      })
    } else {
      setValues({
        title: '',
        fullText: '',
        description: '',
      })
    }
  }

  const createOrEditCancel = (value) => {
    navigate(editMode ? `/posts/${value}` : value)
  }

  useEffect(() => {
    // Используем setValues, чтобы не терять значения после обновления страницы, с помощью функциональности Formik
    if (editMode) {
      setValues({
        title: post ? post.title : '',
        fullText: post ? post.fullText : '',
        description: post ? post.description : '',
      })
    }
  }, [post, setValues, editMode])

  const isDisabled = useMemo(() => {
    return (
      !touched.title ||
      !touched.fullText ||
      !touched.description ||
      !!Object.keys(errors).length ||
      values.title.length === 0 ||
      values.fullText.length === 0 ||
      values.description.length === 0
    )
  }, [
    touched.title,
    touched.fullText,
    touched.description,
    errors,
    values.title.length,
    values.fullText.length,
    values.description.length,
  ])

  if (!post && editMode) {
    return <Preloader />
  }

  return (
    <Wrapper>
      <ContainerWrapper>
        {!isMounted ? (
          <Preloader />
        ) : (
          <Form onSubmit={handleSubmit}>
            <Typography variant="h5">Create a new title</Typography>
            <CreateTitle
              name="title"
              value={values.title}
              placeholder="Add a title..."
              label="Title"
              autoComplete="off"
              error={!!errors.title}
              helperText={errors?.title}
              onChange={handleChange}
              // Свойство formik.touched срабатывает только при onBlur
              onBlur={handleBlur}
            />
            <Typography variant="h5">Add a text of your post</Typography>
            <CreateFullText
              name="fullText"
              value={values.fullText}
              placeholder="Add a text..."
              label="Text"
              autoComplete="off"
              error={!!errors.fullText}
              helperText={errors?.fullText}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            <Typography variant="h5">Add a little description</Typography>
            <CreateDescription
              name="description"
              value={values.description}
              placeholder="Add a description..."
              label="Description"
              autoComplete="off"
              error={!!errors.description}
              helperText={errors?.description}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {previewPostPhoto && (
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
            <CreateNewPostButton onClick={createOrEditReset}>
              Reset
            </CreateNewPostButton>
            <CreateNewPostButton
              onClick={() => createOrEditCancel(editMode ? id : -1)}
            >
              Cancel
            </CreateNewPostButton>
          </Form>
        )}
      </ContainerWrapper>
    </Wrapper>
  )
}
