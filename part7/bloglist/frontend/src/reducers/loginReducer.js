import { createSlice } from '@reduxjs/toolkit'
import loginService from '../services/login'
import blogService from '../services/blogs'
import storageService from '../services/storage'
import { notificationTimeout } from './notificationReducer'

const loginSlice = createSlice({
  name: 'login',
  initialState: null,
  reducers: {
    login(state, action) {
      return action.payload
    },
    logout(state, action) {
      return null
    },
  },
})

export const { login, logout } = loginSlice.actions

export const loginUser = (loginCredentials) => {
  return async (dispatch) => {
    try {
      const user = await loginService.login(loginCredentials)
      storageService.saveUser(user)
      blogService.setToken(user.token)
      dispatch(login(user))
    } catch (exception) {
      dispatch(
        notificationTimeout(
          { message: 'wrong username or password', type: 'info' },
          5
        )
      )
    }
  }
}

export const logoutUser = () => {
  return async (dispatch) => {
    storageService.removeUser()
    blogService.setToken(null)
    dispatch(logout())
  }
}

export default loginSlice.reducer
