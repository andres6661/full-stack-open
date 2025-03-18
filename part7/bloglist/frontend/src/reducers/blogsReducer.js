import { createSlice, current } from '@reduxjs/toolkit'
import blogService from '../services/blogs'
import { notificationTimeout } from './notificationReducer'

const blogSlice = createSlice({
  name: 'blogs',
  initialState: [],
  reducers: {
    setBlogs(state, action) {
      return action.payload
    },
    appendBlog(state, action) {
      state.push(action.payload)
    },
    updateBlog(state, action) {
      const updatedBlog = action.payload
      const id = updatedBlog.id
      return state.map((blog) => (blog.id !== id ? blog : updatedBlog))
    },
    deleteBlog(state, action) {
      return state.filter((blog) => blog.id !== action.payload)
    },
  },
})

export const { setBlogs, appendBlog, updateBlog, deleteBlog } =
  blogSlice.actions

export const initialBlogs = () => {
  return async (dispatch) => {
    const blogs = await blogService.getAll()
    dispatch(setBlogs(blogs.sort((a, b) => b.likes - a.likes)))
  }
}

export const createBlog = (content) => {
  return async (dispatch) => {
    try {
      const newBlog = await blogService.create(content)
      dispatch(appendBlog(newBlog))
      dispatch(
        notificationTimeout(
          {
            message: `a new blog ${content.title} by author ${content.author} was added`,
            type: 'success',
          },
          5
        )
      )
    } catch (exception) {
      dispatch(
        notificationTimeout(
          {
            message: `failed to create blog, ${exception.response.data.error}`,
            type: 'error',
          },
          5
        )
      )
    }
  }
}

export const likeToBlog = (id, blog) => {
  return async (dispatch) => {
    try {
      const updatedBlog = await blogService.update(id, blog)
      dispatch(updateBlog(updatedBlog))
      dispatch(
        notificationTimeout(
          { message: 'added like successfully', type: 'info' },
          5
        )
      )
    } catch (exception) {
      dispatch(
        notificationTimeout(
          { message: `error ${exception.response.data.error}`, type: 'error' },
          5
        )
      )
    }
  }
}

export const removeBlog = (blog) => {
  return async (dispatch) => {
    try {
      await blogService.remove(blog.id)
      dispatch(deleteBlog(blog.id))
      dispatch(
        notificationTimeout(
          { message: 'the blog was deleted successfully', type: 'success' },
          5
        )
      )
    } catch (exception) {
      dispatch(
        notificationTimeout(
          { message: ` error ${exception.response.data.error}`, type: 'error' },
          5
        )
      )
    }
  }
}

export const addCommentToBlog = (id, content) => {
  return async (dispatch) => {
    try {
      const updatedComments = await blogService.addComment(id, content)
      dispatch(updateBlog(updatedComments))
      dispatch(
        notificationTimeout(
          { message: 'comment added successfully', type: 'success' },
          5
        )
      )
    } catch (exception) {
      dispatch(
        notificationTimeout(
          { message: ` error ${exception.response.data.error}`, type: 'error' },
          5
        )
      )
    }
  }
}

export default blogSlice.reducer
