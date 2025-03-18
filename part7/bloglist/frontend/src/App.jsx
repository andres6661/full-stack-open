import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Routes, Route } from 'react-router-dom'
import { Container, Box } from '@mui/material'
import storageService from './services/storage'
import blogService from './services/blogs'
import Blog from './components/Blog'
import Notification from './components/Notification'
import LoginForm from './components/LoginForm'
import Blogs from './components/Blogs'
import Users from './components/Users'
import User from './components/User'
import NavBar from './components/NavBar'
import { initialBlogs } from './reducers/blogsReducer'
import { initialUsers } from './reducers/usersReducer'
import { login } from './reducers/loginReducer'

const App = () => {
  const dispatch = useDispatch()
  const loggedUser = useSelector((state) => state.login)

  useEffect(() => {
    if (loggedUser) {
      dispatch(initialBlogs())
      dispatch(initialUsers())
    }
  }, [loggedUser, dispatch])

  useEffect(() => {
    const user = storageService.loadUser()
    if (user) {
      blogService.setToken(user.token)
      dispatch(login(user))
    }
  }, [])

  if (!loggedUser) {
    return (
      <Container>
        <Notification />
        <Routes>
          <Route path='/' element={<LoginForm />} />
        </Routes>
      </Container>
    )
  }

  return (
    <Container>
      <NavBar />
      <Notification />
      <Routes>
        <Route path='/' element={<Blogs />} />
        <Route path='/blogs/:id' element={<Blog />} />
        <Route path='/users' element={<Users />} />
        <Route path='/users/:id' element={<User />} />
      </Routes>
    </Container>
  )
}

export default App
