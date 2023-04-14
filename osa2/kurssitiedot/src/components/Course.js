const Header = (props) => {
    return (
      <>
        <h2>{props.coursename}</h2>
      </>
    )
  }
  
  const Part = (props) => {
    return (
      <>
        <p>
          {props.part.name} {props.part.exercises}
        </p>
      </>
    )
  }
  
  const Content = (props) => {
    return (
      <>
      {props.parts.map(part =>
        <Part part={part}/>
      )}
      </>
    )
  }
  
  const Total = (props) => {
    const total = props.parts.reduce( (acc, curr) => acc + curr.exercises, 0 )
    return (
      <>
        <b>Total of {total} exercises</b>
      </>
    )
  }
  
  const Course = (props) => {
    return (
      <>
        <Header coursename={props.course.name} />
        <Content parts={props.course.parts} />
        <Total parts={props.course.parts} />
      </>
    )
  }

export default Course