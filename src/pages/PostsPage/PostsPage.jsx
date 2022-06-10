import { Grid } from '@mui/material'
import { Box } from '@mui/system'
import { Preloader } from 'components/layout/Preloader/Preloader'
import { Search } from 'components/layout/Search/Search'
import { useEffect, useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Navigate } from 'react-router'
import { useSearchParams, Link } from 'react-router-dom'
import { getPost, getPosts } from 'store/posts'
import { getImageUrl } from 'utils/imageURL/imageURL'
import { Paginator } from 'utils/Paginator/Paginator'
import postImg from '../../images/post.jpg'
import { SelectPostsNumber } from './SelectPostsNumber/SelectPostsNumber'
import {
  ContainerWrapper,
  Image,
  Item,
  PaginatorContainer,
  PostsNumberContainerInner,
  PostsTextContainer,
  PostTitle,
  PostTitleContainer,
  ResetButton,
  SearchContainer,
  Text,
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

  const currentPage = Number(searchParams.get('page') ?? defaultPage)
  const pageSize = Number(searchParams.get('perPage') ?? defaultPageSize)
  const searchQuery = searchParams.get('search') ?? ''

  const isQueries = useMemo(() => {
    return (
      searchParams.get('page') ||
      searchParams.get('perPage') ||
      searchParams.get('search')
    )
  }, [searchParams])

  const handleChangeQuery = ({ search, page, perPage }) => {
    setSearchParam({
      // Данная строка позволяет не терять значения URL, когда query-параметров больше одного
      ...Object.fromEntries(searchParams.entries()),
      ...(search ? { search } : {}),
      ...(page ? { page } : {}),
      ...(perPage ? { perPage } : {}),
    })
  }

  const handleSearch = (value) => {
    handleChangeQuery({ search: value })
  }

  const handleChangePerPage = (perPage) => {
    handleChangeQuery({ perPage })
  }

  const handleChangePagination = (page) => {
    handleChangeQuery({ page })
  }

  const resetQueries = () => {
    setSearchParam({})
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
        <Box>
          <PostsNumberContainerInner>
            <SelectPostsNumber
              handleChangePerPage={handleChangePerPage}
              page={pageSize}
            />
            {isQueries && <ResetButton onClick={resetQueries}>Reset</ResetButton>}
          </PostsNumberContainerInner>
        </Box>
      </SearchContainer>
      <ContainerWrapper>
        <Grid container rowSpacing={2} spacing={2}>
          {postsObj.posts.map((post) => (
            <Grid key={post.id} item xs={4}>
              <Link
                style={{
                  textDecoration: 'none',
                  color: 'rgba(0, 0, 0, 0.87)',
                  cursor: 'pointer',
                }}
                to="/post"
                onClick={() => dispatch(getPost(post.id))}
              >
                <Item>
                  <PostTitleContainer>
                    <PostTitle variant="h5">{post.title}</PostTitle>
                  </PostTitleContainer>
                  <Image
                    src={post.image ? getImageUrl(post.image) : postImg}
                    alt="PostAva"
                  />
                  <PostsTextContainer>
                    <Text>{post.description}</Text>
                  </PostsTextContainer>
                </Item>
              </Link>
            </Grid>
          ))}
        </Grid>
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
