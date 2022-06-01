import { Preloader } from 'components/layout/Preloader/Preloader'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Navigate } from 'react-router'
import { getPosts } from 'store/posts'
import { getImageUrl } from 'utils/imageURL/imageURL'
import { Paginator } from 'utils/Paginator/Paginator'
import postImg from '../../images/post.jpg'
import {
  ContainerWrapper,
  GridContainer,
  GridItem,
  Image,
  Item,
  PaginatorContainer,
  PostsTextContainer,
  PostTitle,
  PostTitleContainer,
  Text,
  TextTitle,
  Wrapper,
} from './styled'

export const PostsPage = () => {
  const token = JSON.parse(localStorage.getItem('token'))
  const postsObj = useSelector((state) => state.postsReducer.postsObj)
  const pageSize = useSelector((state) => state.postsReducer.pageSize)
  const currentPage = useSelector((state) => state.postsReducer.currentPage)
  const isFetching = useSelector((state) => state.auth.isFetching)

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getPosts(pageSize))
  }, [dispatch, pageSize])

  if (!token) {
    return <Navigate to="/login" />
  }

  if (!postsObj || isFetching) {
    return <Preloader />
  }

  return (
    <Wrapper>
      <ContainerWrapper>
        <GridContainer container rowSpacing={2} spacing={2}>
          {postsObj.posts.map((post) => (
            <GridItem key={post.id} item xs={4}>
              <Item>
                <PostTitleContainer>
                  <PostTitle variant="h5">{post.title}</PostTitle>
                </PostTitleContainer>
                <Image
                  src={post.image ? getImageUrl(post.image) : postImg}
                  alt="PostAva"
                />
                <PostsTextContainer>
                  <TextTitle>{post.title}</TextTitle>
                  <Text>{post.description}</Text>
                </PostsTextContainer>
              </Item>
            </GridItem>
          ))}
        </GridContainer>
        <PaginatorContainer>
          <Paginator
            skipPosts={postsObj.pagination.skip}
            totalItemsCount={postsObj.pagination.total}
            pageSize={pageSize}
            currentPage={currentPage}
            getPosts={getPosts}
          />
        </PaginatorContainer>
      </ContainerWrapper>
    </Wrapper>
  )
}
