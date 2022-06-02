import Pagination from '@mui/material/Pagination'
import Stack from '@mui/material/Stack'
import { useDispatch } from 'react-redux'
import { setScrollPositionAC } from 'store/posts'

export function Paginator({
  totalItemsCount,
  pageSize,
  currentPage,
  setPageQuerry,
}) {
  const pagesCount = Math.ceil(totalItemsCount / pageSize)
  const dispatch = useDispatch()

  const postsList = (page) => {
    dispatch(setScrollPositionAC(window.pageYOffset))
    setPageQuerry(page)
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
