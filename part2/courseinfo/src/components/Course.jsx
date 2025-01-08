const Header = ({ title }) => {
    return (
        <div>
            <h2>
                {title.name}
            </h2>
        </div>
    )
}

const Part = ({ part }) => {
    return (
        <div>
            <p>{part.name} {part.exercises}</p>
        </div>
    )
}

const Content = ({ parts }) => {
    console.log(parts);
    
    return (
        <div>
            {parts.map( (part) => 
                <Part key={part.id} part={part}/>
            )}
        </div>
    )
}

const Total = ({parts}) => {
    const total = parts.reduce((sum, part) => sum + part.exercises, 0)
    return (
      <div>
        <strong>Number of Exercise {total} </strong>
      </div>
    )
  }

const Course = ({ course }) => {
    return (
        <div>
            <Header title={course} />
            <Content parts={course.parts}/>
            <Total parts={course.parts}/>
        </div>
    )
}

export default Course