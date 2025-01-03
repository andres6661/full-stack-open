import { useState } from 'react'

const Button = ({ onClick, text }) => {
  return (
    <button onClick={onClick}>
      {text}
    </button>
  )
}

const StatisticksLine = ({text, result}) => {
  return(
      <tbody>
        <tr>
          <td>{text}</td>
          <td>{result}</td>
        </tr>
      </tbody>
  )
}

const Statisticks = ({good, neutral, bad}) => {
  const total =  good + neutral + bad
  const avg = ((good - bad) / total).toFixed(1)
  const positive = ((good / total) * 100).toFixed(1)

  if (total == 0)
    {
      return <p>No feedback given</p>
    }
  return (
    <table>
      <StatisticksLine text='good' result={good}/>
      <StatisticksLine text='neutral' result={neutral} />
      <StatisticksLine text='bad' result={bad} />
      <StatisticksLine text='all' result={total} />
      <StatisticksLine text='average' result={avg} />
      <StatisticksLine text='positive' result={positive + ' %'} />
    </table>
  )
}

function App() {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const handleGood = () => {
    setGood(good + 1)
  }

  const handleNeutral = () => {
    setNeutral(neutral + 1)
  }

  const hadnleBad = () => {
    setBad(bad + 1)
  }
  const all = good + bad + neutral

  return (
    <div>
      <h1>give feedback</h1>
      <Button onClick={handleGood} text='Good' />
      <Button onClick={handleNeutral} text='Neutral' />
      <Button onClick={hadnleBad} text='Bad' />
      <h1>statisticks</h1>
      <Statisticks good={good} neutral={neutral} bad={bad} />
    </div>

  )
}

export default App
