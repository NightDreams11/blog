import { useEffect } from 'react'
import Pagination from '@mui/material/Pagination'
import Stack from '@mui/material/Stack'
import { useDispatch } from 'react-redux'
import { setCurrentPageAC, setScrollPositionAC } from 'store/posts'
import { useSearchParams } from 'react-router-dom'

export function Paginator({
  totalItemsCount,
  pageSize,
  getPosts,
  currentPage,
  skipPosts,
}) {
  const pagesCount = Math.ceil(totalItemsCount / pageSize)
  const dispatch = useDispatch()

  const [searchParams, setSearchParam] = useSearchParams()
  const postQuerry = searchParams.get('posts')

  useEffect(() => {
    setSearchParam({ posts: pageSize, skip: skipPosts })
  }, [pageSize, setSearchParam, skipPosts])

  const postsList = (page) => {
    const skip = (page - 1) * postQuerry
    dispatch(setScrollPositionAC(window.pageYOffset))
    dispatch(setCurrentPageAC(page))
    dispatch(getPosts(postQuerry, skip))
  }

  return (
    <Stack spacing={2}>
      <Pagination
        count={pagesCount}
        variant="outlined"
        shape="rounded"
        showFirstButton
        showLastButton
        page={currentPage}
        // onChange так же возвращает текущую страницу
        onChange={(e, page) => postsList(page)}
      />
    </Stack>
  )
}
