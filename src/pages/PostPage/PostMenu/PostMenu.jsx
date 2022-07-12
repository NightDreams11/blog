import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import MoreHorizIcon from '@mui/icons-material/MoreHoriz'
import IconButton from '@mui/material/IconButton'
import { Box } from '@mui/system'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { deletePost } from 'store/posts'
import { useNavigate } from 'react-router'
import { Link } from 'react-router-dom'

export function PostMenu({ postId }) {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const [anchorEl, setAnchorEl] = useState(null)
  const open = Boolean(anchorEl)
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget)
  }
  const handleClose = () => {
    setAnchorEl(null)
  }

  const handleDeletePost = async () => {
    await dispatch(deletePost(postId))
    navigate('/posts/')
  }

  return (
    <Box sx={{ ml: 'auto' }}>
      <IconButton
        id="demo-positioned-button"
        aria-controls={open ? 'demo-positioned-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
      >
        <MoreHorizIcon />
      </IconButton>
      <Menu
        id="demo-positioned-menu"
        aria-labelledby="demo-positioned-button"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
      >
        <Link
          to="/posts/edit"
          style={{
            textDecoration: 'none',
            color: 'rgba(0, 0, 0, 0.87)',
          }}
        >
          <MenuItem>Edit</MenuItem>
        </Link>

        <MenuItem
          onClick={() => {
            handleClose()
            handleDeletePost()
          }}
        >
          Delete
        </MenuItem>
      </Menu>
    </Box>
  )
}
