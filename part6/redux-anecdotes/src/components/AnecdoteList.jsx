import { useDispatch, useSelector } from "react-redux"
import { addVote } from "../reducers/anecdoteReducer"
import { setNotification, removeNotification } from "../reducers/notificationReducer"

const AnecdoteList = () => {
    const anecdotes = useSelector(({filter, anecdotes}) =>{
        return filter === '' 
        ? anecdotes
        : anecdotes.filter((anecdotes) => 
            anecdotes.content.toLowerCase().includes(filter))
    })

    const sortedAnecdotes = [...anecdotes].sort((a, b) => b.votes - a.votes)

    const dispatch = useDispatch()
    
    const vote = (id, content) => {
        dispatch(addVote(id))
        dispatch(setNotification(`you voted for '${content}'`))
        setTimeout(() => { dispatch(removeNotification())}, 5000);
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
                        <button onClick={() => vote(anecdote.id, anecdote.content)}>vote</button>
                    </div>
                </div>
            )}
        </div>
    )
}

export default AnecdoteList