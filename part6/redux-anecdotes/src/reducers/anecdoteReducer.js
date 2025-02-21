import { createSlice, current } from "@reduxjs/toolkit"
import anecdoteService from '../services/anecdotes'

const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState: [],
  reducers: {
    addVote(state, action) {
      const anecdote = action.payload
      const id = anecdote.id
      return state.map(anec => anec.id !== id ? anec : anecdote)
    },
    appendAnecdotes(state, action){
      state.push(action.payload)
    },
    setAnecdotes(state, action){
      return action.payload
    }
  }
})

export const { addVote, appendAnecdotes, setAnecdotes} = anecdoteSlice.actions

export const initializeAnecdotes = () => {
  return async dispatch => {
      const anecdotes = await anecdoteService.getAll()
      dispatch(setAnecdotes(anecdotes))
  }
}

export const createAnecdote = content => {
  return async dispatch => {
    const newAnecdote = await anecdoteService.createNew(content)
    dispatch(appendAnecdotes(newAnecdote))
  }
}

export const votedAnecdote = (anecdote) => {
  return async dispatch => {
    const changeAnecdote = await anecdoteService.updateVote(anecdote)
    dispatch(addVote(changeAnecdote))
  }
}

export default anecdoteSlice.reducer