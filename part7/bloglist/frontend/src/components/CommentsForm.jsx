import { useDispatch } from 'react-redux'
import { Stack, TextField, Button } from '@mui/material'
import { useState } from 'react'
import { addCommentToBlog } from '../reducers/blogsReducer'

const CommentsForm = ({ blog }) => {
  const [comment, setComment] = useState('')
  const dispatch = useDispatch()

  const handleFormChange = (event) => {
    setComment(event.target.value)
  }
  const addComment = async (event) => {
    event.preventDefault()
    dispatch(addCommentToBlog(blog.id, { comment: event.target.comment.value }))
    setComment('')
  }

  return (
    <div>
      <Stack
        component='form'
        direction='row'
        spacing={1}
        sx={{ my: 2 }}
        onSubmit={addComment}
      >
        <div>
          <TextField
            id='comment'
            variant='standard'
            sx={{ pl: 2 }}
            value={comment}
            onChange={handleFormChange}
          ></TextField>
        </div>
        <div>
          <Button
            id='addcomment-button'
            variant='contained'
            size='small'
            type='submit'
          >
            add comment
          </Button>
        </div>
      </Stack>
    </div>
  )
}

export default CommentsForm
