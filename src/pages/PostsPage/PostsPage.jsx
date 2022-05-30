import { Preloader } from 'components/layout/Preloader/Preloader'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Navigate } from 'react-router'
import { getPosts } from 'store/posts'
import { Paginator } from 'utils/Paginator/Paginator'
import {
  ContainerWrapper,
  GridContainer,
  GridItem,
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
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getPosts())
  }, [dispatch])

  if (!token) {
    return <Navigate to="/login" />
  }

  if (!postsObj) {
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
            totalItemsCount={postsObj.pagination.total}
            pageSize={pageSize}
          />
        </PaginatorContainer>
      </ContainerWrapper>
    </Wrapper>
  )
}
