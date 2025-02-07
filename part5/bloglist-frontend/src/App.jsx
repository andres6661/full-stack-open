import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import Notification from './components/Notification'
import blogService from './services/blogs'
import loginService from './services/login'
import Togglable from './components/Togglable'
import BlogForm from './components/BlogForm'
import LoginForm from './components/LoginForm'


const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [message, setMessage] = useState(null)

  const blogFormRef = useRef()

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs(blogs.sort((a, b) => a.likes - b.likes))
    )
  }, [])

  const addBlog = async (blogObject) => {
    try{
      blogFormRef.current.toggleVisibility()
      const returnedBlog = await blogService.create(blogObject)
      
      setBlogs(blogs.concat(returnedBlog))
      setMessage({ type: 'success', text: `a new blog ${blogObject.title} by ${blogObject.author}` })
      setTimeout(() => {
        setMessage(null)
      }, 5000)
    }   
      catch(exception) {
        setMessage({ type: 'error', text: `failed to create blog, ${exception.response.data.error}` })
        setTimeout(() => {
          setMessage(null)
        }, 5000);
      }
  }

  const updateLikes = async (blogObject) => {
    try {
      const returnedBlog = await blogService.update(blogObject.id, blogObject)
      setBlogs(blogs.map(blog => blog.id !== blogObject.id ? blog : returnedBlog))
    } catch (error) {
      setMessage({type: 'error', text:` error ${exception.response.data.error}`})
      setTimeout(() => {
        setMessage(null)
      }, 5000);
    }
    
  }

  const removeBlog = async (id) => {
    try {
      await blogService.remove(id)
      setBlogs(blogs.filter(b => b.id !== id))
      setMessage({ type: 'success', text: 'the blog was deleted successfully' })
      setTimeout(() => {
        setMessage(null)
      }, 5000)

    } catch (exception) {
      setMessage({type: 'error', text:` error ${exception.response.data.error}`})
      setTimeout(() => {
        setMessage(null)
      }, 5000);
    }
    
  }

  const handleLogin = async (loginCredentials) => {
    try {
      const user = await loginService.login(loginCredentials)

      window.localStorage.setItem('loggedBlogappUser', JSON.stringify(user))
      blogService.setToken(user.token)
      setUser(user)
    } catch (exception) {
      setMessage({ type: 'error', text: 'wrong username or password' })
      setTimeout(() => {
        setMessage(null)
      }, 5000);
    }
  }

  const handleLogout = () => {
    window.localStorage.removeItem('loggedBlogappUser')
    setUser(null)
  }

  return (
    <div>

      {!user && <div>
        <h2>Log in to application</h2>
        <Notification message={message} />
        <LoginForm login={handleLogin} />
      </div>}

      {user && <div>
        <h2>blogs</h2>
        <Notification message={message} />
        <p>{user.name} logged in <button onClick={handleLogout}>logout</button></p>
        <Togglable buttonLabel='Create new blog' ref={blogFormRef}>
          <BlogForm createBlog={addBlog}/>
        </Togglable>
      
        {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} 
          user={user} 
          updateLikes={updateLikes} 
          removeBlog={removeBlog}/>
        )}
      </div>}
    </div>
  )
}

export default App