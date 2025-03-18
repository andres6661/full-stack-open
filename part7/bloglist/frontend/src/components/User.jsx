import { useSelector } from 'react-redux'
import { useParams, Link } from 'react-router-dom'
import {
  List,
  ListItem,
  ListItemText,
  Typography,
  Paper,
  Divider,
} from '@mui/material'
const User = () => {
  const { id } = useParams()
  const user = useSelector((state) => state.users.find((u) => u.id === id))

  if (!user) return null

  return (
    <div>
      <Paper sx={{ my: 2 }}>
        <Typography variant='h4' sx={{ pl: 1 }}>
          {user.name}
        </Typography>
        <Typography variant='h6' component='h3' sx={{ pt: 2, pl: 2 }}>
          {user.blogs.length > 0 ? 'added blogs' : 'no blogs added'}
        </Typography>
        <List>
          {user.blogs.map((blog) => (
            <div key={blog.id}>
              <ListItem component={Link} to={`/blogs/${blog.id}`}>
                <ListItemText primary={blog.title}></ListItemText>
              </ListItem>
              <Divider variant='middle' />
            </div>
          ))}
        </List>
      </Paper>
    </div>
  )
}

export default User
