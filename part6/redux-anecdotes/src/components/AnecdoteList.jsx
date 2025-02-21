import { useDispatch, useSelector } from "react-redux"
import { votedAnecdote } from "../reducers/anecdoteReducer"
import { notificationWithTimeout } from "../reducers/notificationReducer"

const AnecdoteList = () => {
    const anecdotes = useSelector(({filter, anecdotes}) =>{
        return filter === '' 
        ? anecdotes
        : anecdotes.filter((anecdotes) => 
            anecdotes.content.toLowerCase().includes(filter))
    })

    const sortedAnecdotes = [...anecdotes].sort((a, b) => b.votes - a.votes)

    const dispatch = useDispatch()
    
    const vote = (anecdote) => {
        dispatch(votedAnecdote(anecdote))
        dispatch(notificationWithTimeout(`you voted for '${anecdote.content}'`, 5))
    }

    return (
        <div>
            {sortedAnecdotes.map(anecdote =>
                <div key={anecdote.id}>
                    <div>
                        {anecdote.content}
                    </div>
                    <div>
                        has {anecdote.votes}
                        <button onClick={() => vote(anecdote)}>vote</button>
                    </div>
                </div>
            )}
        </div>
    )
}

export default AnecdoteList