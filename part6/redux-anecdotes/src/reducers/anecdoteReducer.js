import { createSlice, current } from "@reduxjs/toolkit"

const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState: [],
  reducers: {
    addAnecdote(state, action) {
      console.log('state now: ', state)
      console.log('action', action)
      state.push(action.payload)
    },
    addVote(state, action) {
      console.log('state now: ', current(state))
      const id = action.payload
      const anecdoteToVote = state.find(a => a.id === id)
      const changeAnec = { ...anecdoteToVote, votes: anecdoteToVote.votes + 1 }
      return state.map(anec => anec.id !== id ? anec : changeAnec)
    },
    setAnecdotes(state, action){
      return action.payload
    }
  }
})

export const { addAnecdote, addVote, setAnecdotes} = anecdoteSlice.actions
export default anecdoteSlice.reducer