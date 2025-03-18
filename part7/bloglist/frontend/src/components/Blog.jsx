import { useDispatch, useSelector } from 'react-redux'
import { likeToBlog, removeBlog } from '../reducers/blogsReducer'
import { useParams, useNavigate } from 'react-router-dom'
import {
  Card,
  CardContent,
  CardActions,
  Button,
  Typography,
  Paper,
  List,
  ListItem,
  ListItemText,
  Divider,
} from '@mui/material'
import CommentsForm from './CommentsForm'

const Blog = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const login = useSelector((state) => state.login)
  const { id } = useParams()
  const blog = useSelector((state) =>
    state.blogs.find((blog) => blog.id === id)
  )

  const handleLike = () => {
    const id = blog.id
    const blogliked = { ...blog, likes: blog.likes + 1 }
    dispatch(likeToBlog(id, blogliked))
  }

  const handleDelete = () => {
    if (confirm(`Remove blog ${blog.title} by ${blog.author}`)) {
      dispatch(removeBlog(blog))
      navigate('/')
    }
  }

  if (!blog) return null

  return (
    <div>
      <Card sx={{ my: 2 }}>
        <CardContent>
          <Typography variant='h4'>{blog.title}</Typography>
          <Typography variant='h5' sx={{ mb: 1 }} color='text.secondary'>
            by {blog.author}
          </Typography>
          <Typography variant='body1' color='info'>
            {blog.url}
          </Typography>
          <Typography variant='body1'>{blog.likes} likes</Typography>
          <Typography variant='body1'>added by {blog.user.name}</Typography>
          <CardActions>
            <Button variant='contained' onClick={handleLike}>
              Like
            </Button>
            {blog.user.username === login.username && (
              <Button variant='contained' onClick={handleDelete}>
                Delete
              </Button>
            )}
          </CardActions>
        </CardContent>
      </Card>
      <Paper sx={{ my: 2 }}>
        <Typography variant='h5' sx={{ pl: 1, pt: 1 }}>
          Comments
        </Typography>
        <CommentsForm blog={blog} />
        <List>
          {blog.comments.map((comment, i) => (
            <div key={i}>
              <ListItem>
                <ListItemText primary={comment}></ListItemText>
              </ListItem>
              <Divider variant='middle' />
            </div>
          ))}
        </List>
      </Paper>
    </div>
  )
}

export default Blog
