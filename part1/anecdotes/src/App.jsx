import { useState } from 'react'

const Button = ({ onClick, text }) => {
  return (
    <div>
      <button onClick={onClick}>
        {text}
      </button>
    </div>
  )
}


const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ]

  const [selected, setSelected] = useState(0)
  const [votes, setVotes] = useState(new Array(anecdotes.length).fill(0))


  const handleAnecdote = () => {
    console.log(selected)
    return (
      setSelected(Math.floor(Math.random() * anecdotes.length))
    )
  }

  const handleVotes = () => {
    const copyVotes = [...votes]
    copyVotes[selected] += 1
    setVotes(copyVotes)
  }

  const mostVoted = () => {
    return votes.indexOf(Math.max(...votes))
  }

  return (
    <div>
      <h1>Anecdote of the day</h1>
      <div>{anecdotes[selected]}</div>
      <div>has {votes[selected]} votes</div>
      <Button onClick={handleVotes} text='vote' /> 
      <Button onClick={handleAnecdote} text='next anecdote' />
      <h1>Anecdote with most votes</h1> 
      <div>{anecdotes[mostVoted()]}</div>
      <div>has {votes[mostVoted()]} votes</div>
    </div>
  )
}

export default App