import PropTypes from 'prop-types'
import { useState } from 'react'

const Blog = ({ blog, user, updateLikes, removeBlog }) => {
  const [isActive, setIsActive] = useState(false)
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const toggleVisibility = () => {
    setIsActive(!isActive)
  }
  const handleLike = () => {
    updateLikes({ ...blog, likes: blog.likes + 1 })
  }

  const handleDelete = () => {
    if (confirm(`Remove blog ${blog.name} by ${blog.author}`)) {
      removeBlog(blog.id)
    }
  }

  return (
    <div style={blogStyle}>
      <div className='blog-title'>
        {blog.title} {blog.author}
        <button onClick={toggleVisibility}>{isActive ? 'hide' : 'view'}</button>
      </div>
      {isActive && (
      <div className='blog-url-likes'>
        {blog.url}
        <br />{blog.likes}
        <button onClick={(handleLike)}>like</button>
        <br />{blog.user.name}
        {blog.user.username === user.username &&
          <div>
            <button onClick={handleDelete}>delete</button>
          </div>}
      </div>
      )}
    </div>
  )
}

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
  updateLikes: PropTypes.func.isRequired,
  removeBlog: PropTypes.func.isRequired
}

export default Blog