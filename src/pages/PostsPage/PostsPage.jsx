import { Preloader } from 'components/layout/Preloader/Preloader'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Navigate } from 'react-router'
import { useSearchParams } from 'react-router-dom'
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
  const [currentPage, setCurrentPage] = useState(1)
  const isFetching = useSelector((state) => state.auth.isFetching)

  const dispatch = useDispatch()

  const [searchParams, setSearchParam] = useSearchParams()

  const [pageSize, setPageSize] = useState(9)
  const [pageQuerry, setPageQuerry] = useState(searchParams.get('page'))

  const postsQuerry = searchParams.get('posts')

  useEffect(() => {
    if (pageQuerry === '0' || !pageQuerry) {
      setPageQuerry(currentPage)
    }

    setSearchParam({
      posts: postsQuerry !== null ? postsQuerry : pageSize,
      page: pageQuerry !== null ? pageQuerry : currentPage,
    })

    if (postsQuerry || pageQuerry) {
      const skip = (pageQuerry - 1) * Number(pageSize)
      setCurrentPage(Number(pageQuerry))
      setPageSize(postsQuerry)
      dispatch(getPosts(postsQuerry, skip))
    }
  }, [dispatch, setSearchParam, postsQuerry, pageQuerry, pageSize, currentPage])

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
            setPageQuerry={setPageQuerry}
          />
        </PaginatorContainer>
      </ContainerWrapper>
    </Wrapper>
  )
}
