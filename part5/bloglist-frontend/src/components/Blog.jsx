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

  const showWhenVisible = { display: isActive ? '' : 'none' }

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
      <div>
        {blog.title} {blog.author}
        <button onClick={toggleVisibility}>{isActive ? 'hide' : 'more'}</button>
      </div>
      <div style={showWhenVisible}>
        {blog.url}
        <br />{blog.likes}
        <button onClick={(handleLike)}>like</button>
        <br />{blog.user.name}
        {blog.user.username === user.username &&
          <div>
            <button onClick={handleDelete}>delete</button>
          </div>}
      </div>
    </div>

  )
}

export default Blog