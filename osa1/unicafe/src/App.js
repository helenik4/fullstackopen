import { useState } from 'react'

const Header = () => {
  return (
    <>
      <h1>give feedback</h1>
    </>
  )
}

const StatisticsHeader = () => {
  return (
    <>
      <h1>statistics</h1>
    </>
  )
}

const Button = ({ handleClick, text }) => (
  <button onClick={handleClick}>
    {text}
  </button>
)

const StatisticLine = (props) => {
  if (props.text === 'positive')
    return (
      <tr>
        <td>{props.text}</td>
        <td>{props.value} %</td>
      </tr>
    )
  return (
    <tr>
      <td>{props.text}</td>
      <td>{props.value}</td>
    </tr>
  )
}

const Statistics = (props) => {
  if (props.good + props.neutral + props.bad === 0)
    return (
      <>
        <StatisticsHeader />
        <p>No feedback given</p>
      </>
    )
  return (
    <>
      <StatisticsHeader />
      <table>
        <tbody>
          <StatisticLine value={props.good} text='good'/>
          <StatisticLine value={props.neutral} text='neutral'/>
          <StatisticLine value={props.bad} text='bad'/>
          <StatisticLine value={props.good + props.neutral + props.bad} text='all'/>
          <StatisticLine value={props.countAverage} text='average'/>
          <StatisticLine value={props.countPositive} text='positive'/>
        </tbody>
      </table>
    </>
  )
}

const App = () => {
  // tallenna napit omaan tilaansa
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const handleGoodFeedbackClick = () => {
    setGood(good + 1)
  }

  const handleNeutralFeedbackClick = () => {
    setNeutral(neutral + 1)
  }

  const handleBadFeedbackClick = () => {
    setBad(bad + 1)
  }

  const countAverage = () => {
    if (good + neutral + bad === 0) return 0
    return (good * 1 + neutral * 0 + bad * -1) / (good + neutral + bad)
  }

  const countPositive = () => {
    if (good + neutral + bad === 0) return 0
    return good / (good + neutral + bad) * 100
  }

  return (
    <div>
      <Header />
      <Button handleClick={handleGoodFeedbackClick} text='good' />
      <Button handleClick={handleNeutralFeedbackClick} text='neutral' />
      <Button handleClick={handleBadFeedbackClick} text='bad' />
      <Statistics good={good} neutral={neutral} bad={bad} countAverage={countAverage()} countPositive={countPositive()}/>
    </div>
  )
}

export default App
