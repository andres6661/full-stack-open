import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import Notification from './components/Notification'
import blogService from './services/blogs'
import loginService from './services/login'


const App = () => {
  const [blogs, setBlogs] = useState([])
  const [newBlog, setNewBlog] = useState({ title: '', author: '', url: '' })
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [message, setMessage] = useState(null)

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
      setBlogs(blogs)
    )
  }, [])

  const addBlog = (event) => {
    event.preventDefault()
    const blogObject = {
      title: newBlog.title,
      author: newBlog.author,
      url: newBlog.url,
    }
    console.log('newblog', blogObject)

    blogService.create(blogObject)
      .then(returnedBlog => {
        setBlogs(blogs.concat(returnedBlog))
        setMessage({ type: 'success', text: `a new blog ${blogObject.title} by ${blogObject.author}` })
        setNewBlog({ title: '', author: '', url: '' })
      }).catch(error => {
        setMessage({ type: 'error', text: `failed to create blog, ${error.response.data.error}` })
        setTimeout(() => {
          setMessage(null)
        }, 5000);
      })
  }

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const user = await loginService.login({ username, password })

      window.localStorage.setItem('loggedBlogappUser', JSON.stringify(user))
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
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


  if (user === null) {
    return (
      <div>
        <h2>Log in to application</h2>
        <Notification message={message} />

        <form onSubmit={handleLogin}>
          <div>
            username
            <input
              type='text'
              value={username}
              name='Username'
              onChange={({ target }) => setUsername(target.value)}
            />
          </div>
          <div>
            password
            <input
              type='password'
              value={password}
              name='Password'
              onChange={({ target }) => setPassword(target.value)}
            />
          </div>
          <button type='submit'>login</button>
        </form>
      </div>
    )
  }

  const loginView = () => (
    <div>
      <h2>create new</h2>
      <form onSubmit={addBlog}>
        <div>
          title: <input
            type='text'
            value={newBlog.title}
            name='Title'
            onChange={({ target }) => setNewBlog({ ...newBlog, title: target.value })}
          />
        </div>
        <div>
          author: <input
            type='text'
            value={newBlog.author}
            name='Author'
            onChange={({ target }) => setNewBlog({ ...newBlog, author: target.value })}
          />
        </div>
        <div>
          url: <input
            type='text'
            value={newBlog.url}
            name='Url'
            onChange={({ target }) => setNewBlog({ ...newBlog, url: target.value })}
          />
        </div>
        <button type='submit'>create</button>
      </form>
    </div>
  )

  return (
    <div>
      <h2>blogs</h2>
      <Notification message={message} />

      {!user && loginForm()}
      {user && <div>
        <p>{user.name} logged in <button onClick={handleLogout}>logout</button></p>
        {loginView()}
      </div>}

      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </div>
  )
}

export default App