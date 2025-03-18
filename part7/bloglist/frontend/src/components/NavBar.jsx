import { useState } from 'react'
import { logoutUser } from '../reducers/loginReducer'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import AccountCircleIcon from '@mui/icons-material/AccountCircle'
import {
  AppBar,
  Button,
  IconButton,
  Toolbar,
  Menu,
  MenuItem,
  Container,
  Box,
  Typography,
} from '@mui/material'

const NavBar = () => {
  const [anchorEl, setAnchorEl] = useState(null)
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const loggedUser = useSelector((status) => status.login)

  const handleOpen = (event) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const handleLogout = () => {
    dispatch(logoutUser())
    navigate('/')
  }
  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position='static'>
          <Container maxWidth='xl'>
            <Toolbar disableGutters>
              <Typography
                variant='h6'
                noWrap
                component='a'
                sx={{
                  mr: 2,
                  display: { xs: 'none', md: 'flex' },
                  color: 'inherit',
                }}
              >
                Blog App
              </Typography>
              <Box sx={{ flexGrow: 1, display: { xs: 'flex' } }}>
                <Button component={Link} to='/' sx={{ color: 'white' }}>
                  Blogs
                </Button>
                <Button component={Link} to='/users' sx={{ color: 'white' }}>
                  Users
                </Button>
              </Box>
              <Typography
                variant='body2'
                component='a'
                sx={{ color: 'inherit' }}
              >
                {loggedUser.name} logged in
              </Typography>
              <Box sx={{ flexGrow: 0, display: { xs: 'flex' } }}>
                <IconButton
                  size='large'
                  onClick={handleOpen}
                  aria-controls='account-menu'
                  aria-haspopup='true'
                  aria-label='main menu'
                >
                  <AccountCircleIcon />
                </IconButton>
                <Menu
                  id='account-menu'
                  anchorEl={anchorEl}
                  anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'center',
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'center',
                  }}
                  open={Boolean(anchorEl)}
                  onClose={handleClose}
                >
                  <MenuItem onClick={handleLogout}>Logout</MenuItem>
                </Menu>
              </Box>
            </Toolbar>
          </Container>
        </AppBar>
      </Box>
    </>
  )
}

export default NavBar
