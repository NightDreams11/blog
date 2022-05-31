import * as React from 'react'
import Pagination from '@mui/material/Pagination'
import Stack from '@mui/material/Stack'
import { useDispatch } from 'react-redux'
import { setCurrentPageAC, setScrollPositionAC } from 'store/posts'

export function Paginator({
  totalItemsCount,
  pageSize,
  skipPosts,
  getPosts,
  currentPage,
}) {
  const pagesCount = Math.ceil(totalItemsCount / pageSize)

  const dispatch = useDispatch()

  const postsList = (page) => {
    const skip = (page - 1) * skipPosts
    dispatch(setScrollPositionAC(window.pageYOffset))
    dispatch(setCurrentPageAC(page))
    dispatch(getPosts(pageSize, skip))
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
