import { useState } from 'react'

const Button = ({ handleClick, text }) => (
  <button onClick={handleClick}>
    {text}
  </button>
)

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when dianosing patients.',
    'The only way to go fast, is to go well.'
  ]
   
  const [selected, setSelected] = useState(0)
  const [points, setPoints] = useState({ 0: 0, 1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0, 7: 0, 8: 0 })

  const handleNextAnecdoteClick = () => {
    const randomNumber = Math.floor(Math.random() * 8);
    setSelected(randomNumber)
  }

  const handleVoteClick = () => {
    const copy = { ...points }
    copy[selected] += 1 
    setPoints(copy)
  }

  const getMostVoted = () => {
    return Object.keys(points).reduce((a, b) => points[a] > points[b] ? a : b);
  }

  return (
    <div>
      <h1>Acnecdote of the day</h1>
      <p>{anecdotes[selected]}</p>
      <p>has {points[selected]} votes</p>
      <Button text='vote' handleClick={handleVoteClick}/>
      <Button text='next anecdote' handleClick={handleNextAnecdoteClick}/>
      <h1>Acnecdote with most votes</h1>
      <p>{anecdotes[getMostVoted()]}</p>
      <p>has {points[getMostVoted()]} votes</p>
    </div>
  )
}

export default App
