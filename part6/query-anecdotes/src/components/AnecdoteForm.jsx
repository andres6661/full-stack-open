import { useMutation, useQueryClient } from "@tanstack/react-query"
import { createAnecdote } from "../request"
import { setNotification } from "../NotificationContext"

const AnecdoteForm = () => {
  const notificationMessage = setNotification()
  const queryClient = useQueryClient()
  
  const newAnecdoteMutation = useMutation({
    mutationFn: createAnecdote,
    onSuccess: (newAnecdote) => {
      const anecdote = queryClient.getQueryData(['anecdotes'])
      queryClient.setQueryData(['anecdotes'], anecdote.concat(newAnecdote))
      notificationMessage(`you added the anecdote '${newAnecdote}'`)
    },
    onError: (error) => {
      notificationMessage(`${error.response.data.error}`)
    }
  })

  const onCreate = (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    newAnecdoteMutation.mutate({ content, votes: 0 })
  }

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={onCreate}>
        <input name='anecdote' />
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm
