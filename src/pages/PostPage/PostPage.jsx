import { Avatar, Grid } from '@mui/material'
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined'
import { useDispatch, useSelector } from 'react-redux'
import { Navigate } from 'react-router'
import { dateFormatter } from 'utils/dateFormatter/dateFormatter'
import { Preloader } from 'components/layout/Preloader/Preloader'
import { setLike } from 'store/posts'
import postImg from '../../images/post.jpg'
import {
  Author,
  ContainerWrapper,
  Date,
  GridItem,
  Text,
  Title,
  Wrapper,
  Image,
  ImageContainer,
  CommentField,
  LikesContainer,
  LikeCounter,
} from './styled'

export const PostPage = () => {
  const token = JSON.parse(localStorage.getItem('token'))
  const post = useSelector((state) => state.postsReducer.post)
  const postId = useSelector((state) => state.postsReducer.postId)
  const userId = useSelector((state) => state.auth.user.id)
  const author = useSelector((state) => state.postsReducer.author)
  const isFetching = useSelector((state) => state.auth.isFetching)

  const dispatch = useDispatch()

  const isLiked = post
    ? post.likes.filter((id) => {
        return id === userId
      })
    : false

  if (!token) {
    return <Navigate to="/login" />
  }

  if (!post) {
    return <Preloader />
  }

  if (isFetching) {
    return <Preloader />
  }

  return (
    <Wrapper>
      <ContainerWrapper>
        <Grid container>
          <GridItem item xs={12}>
            <Title variant="h2">{post.title}</Title>
          </GridItem>
          <GridItem item xs={12} sx={{ display: 'flex' }}>
            <Avatar
              src={author.avatar ? process.env.REACT_APP_URL + author.avatar : ''}
            />
            <Author variant="caption">
              {author.name ? author.name : 'Unknown'}
            </Author>
          </GridItem>
          <GridItem item xs={12}>
            <Date variant="caption">{dateFormatter(post.dateCreated)}</Date>
          </GridItem>
          <GridItem item xs={12} sx={{ mt: 2 }}>
            <ImageContainer>
              <Image src={postImg} alt="Post photo" />
            </ImageContainer>
          </GridItem>
          <GridItem item xs={12} sx={{ mt: 2 }}>
            <Text variant="body1">{post.fullText}</Text>
          </GridItem>
          <GridItem item xs={12} sx={{}}>
            <LikesContainer
              style={{ background: isLiked.length === 1 ? '#ED7C7C' : '#edeef0' }}
            >
              <FavoriteBorderOutlinedIcon
                sx={{ cursor: 'pointer' }}
                onClick={() => {
                  dispatch(setLike(postId))
                }}
              />
              <LikeCounter>{post.likes.length}</LikeCounter>
            </LikesContainer>
          </GridItem>
          <GridItem item xs={12}>
            <CommentField />
          </GridItem>
        </Grid>
      </ContainerWrapper>
    </Wrapper>
  )
}
