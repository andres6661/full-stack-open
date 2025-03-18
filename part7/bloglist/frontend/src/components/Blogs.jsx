import { useSelector } from 'react-redux'
import { useRef } from 'react'
import { Link } from 'react-router-dom'
import {
  Grid2,
  Card,
  CardContent,
  Typography,
  CardActionArea,
  Box,
  Paper,
} from '@mui/material'
import Togglable from './Togglable'
import BlogForm from './BlogForm'

const Blogs = () => {
  const blogs = useSelector((state) => state.blogs)
  const blogFormRef = useRef()
  const toggleFormVisibility = () => {
    blogFormRef.current.toggleVisibility()
  }

  return (
    <div>
      <Box sx={{ pb: 1 }}>
        <Togglable buttonLabel='new blog' ref={blogFormRef}>
          <BlogForm toggleFormVisibility={toggleFormVisibility} />
        </Togglable>
      </Box>
      <Paper sx={{ my: 2 }}>
        <Grid2>
          <Typography variant='h3' sx={{ pl: 1 }}>
            Blogs
          </Typography>
          {blogs.map((blog) => (
            <Card key={blog.id}>
              <CardActionArea>
                <CardContent component={Link} to={`/blogs/${blog.id}`}>
                  <Typography sx={{ pl: 2, color: 'black' }}>
                    {blog.title} by {blog.author}
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          ))}
        </Grid2>
      </Paper>
    </div>
  )
}

export default Blogs
