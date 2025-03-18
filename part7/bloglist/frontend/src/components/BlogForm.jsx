import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { createBlog } from '../reducers/blogsReducer'
import { TextField, Stack, Button, Typography, Box } from '@mui/material'

const BlogForm = ({ toggleFormVisibility }) => {
  const [newBlog, setNewBlog] = useState({ title: '', author: '', url: '' })
  const dispatch = useDispatch()

  const addBlog = async (event) => {
    event.preventDefault()
    const blog = {
      title: newBlog.title,
      author: newBlog.author,
      url: newBlog.url,
    }
    dispatch(createBlog(blog))
    setNewBlog({ title: '', author: '', url: '' })
    toggleFormVisibility()
  }

  return (
    <div>
      <Typography variant='h4' sx={{ pt: 2, pl: 1 }}>
        Create new Blog
      </Typography>
      <Stack
        component='form'
        spacing={2}
        sx={{ my: 2, pl: 2, width: '25ch' }}
        onSubmit={addBlog}
        autoComplete='off'
      >
        <div>
          <TextField
            id='title'
            label='Title'
            sx={{ my: 1 }}
            value={newBlog.title}
            name='title'
            onChange={({ target }) =>
              setNewBlog({ ...newBlog, title: target.value })
            }
          />
          <TextField
            id='author'
            label='Author'
            sx={{ my: 1 }}
            value={newBlog.author}
            name='author'
            onChange={({ target }) =>
              setNewBlog({ ...newBlog, author: target.value })
            }
          />
          <TextField
            id='url'
            label='URL'
            sx={{ mt: 1 }}
            value={newBlog.url}
            name='url'
            onChange={({ target }) =>
              setNewBlog({ ...newBlog, url: target.value })
            }
          />
        </div>
        <Box>
          <Button
            id='create-button'
            variant='contained'
            color='primary'
            type='submit'
          >
            Create
          </Button>
        </Box>
      </Stack>
    </div>
  )
}

export default BlogForm
