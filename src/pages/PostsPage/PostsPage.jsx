import { Preloader } from 'components/layout/Preloader/Preloader'
import { Search } from 'components/layout/Search/Search'
import { useEffect, useMemo } from 'react'
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
  SearchContainer,
  Text,
  TextTitle,
  Wrapper,
} from './styled'

const defaultPageSize = 9
const defaultPage = 1

export const PostsPage = () => {
  const token = JSON.parse(localStorage.getItem('token'))
  const postsObj = useSelector((state) => state.postsReducer.postsObj)
  const isFetching = useSelector((state) => state.auth.isFetching)

  const dispatch = useDispatch()

  const [searchParams, setSearchParam] = useSearchParams()

  const currentPage = useMemo(() => {
    return Number(searchParams.get('page') ?? defaultPage)
  }, [searchParams])

  const pageSize = useMemo(() => {
    return Number(searchParams.get('perPage') ?? defaultPageSize)
  }, [searchParams])

  const searchQuery = useMemo(() => {
    return searchParams.get('search') ?? ''
  }, [searchParams])

  const handleChangeQuery = ({ search, page, perPage }) => {
    setSearchParam({
      ...Object.fromEntries(searchParams.entries()),
      ...(search ? { search } : {}),
      ...(page ? { page } : {}),
      ...(perPage ? { perPage } : {}),
    })
  }

  const handleSearch = (value) => {
    handleChangeQuery({ search: value })
  }

  const handleChangePagination = (page) => {
    handleChangeQuery({ page })
  }

  useEffect(() => {
    dispatch(getPosts(Object.fromEntries(searchParams.entries())))
  }, [dispatch, searchParams])

  if (!token) {
    return <Navigate to="/login" />
  }

  if (!postsObj || isFetching) {
    return <Preloader />
  }

  return (
    <Wrapper>
      <SearchContainer>
        <Search handleSearch={handleSearch} text={searchQuery} />
      </SearchContainer>
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
            totalItemsCount={postsObj.pagination.total}
            pageSize={pageSize}
            currentPage={currentPage}
            handleChangePage={handleChangePagination}
          />
        </PaginatorContainer>
      </ContainerWrapper>
    </Wrapper>
  )
}
