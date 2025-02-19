import { useDispatch, useSelector } from "react-redux"
import { voteFor } from "../reducers/anecdoteReducer"

const AnecdoteList = () => {
    const dispatch = useDispatch()
    const anecdotes = useSelector(({filter, anecdotes}) =>{
        return filter === '' 
        ? anecdotes
        : anecdotes.filter((anecdotes) => 
            anecdotes.content.toLowerCase().includes(filter))
    })
    
    const vote = (id) => {
        dispatch(voteFor(id))
    }

    return (
        <div>
            {anecdotes.sort((a, b) => b.votes -a.votes).map(anecdote =>
                <div key={anecdote.id}>
                    <div>
                        {anecdote.content}
                    </div>
                    <div>
                        has {anecdote.votes}
                        <button onClick={() => vote(anecdote.id)}>vote</button>
                    </div>
                </div>
            )}
        </div>
    )
}

export default AnecdoteList