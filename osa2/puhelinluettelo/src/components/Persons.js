const Person = (props) => {
    return (
        <>
            <p>{props.person.name} {props.person.number}</p>
            <button onClick={() => props.deletePersonById(props.person.id)}>delete</button>
        </>
    )
}

const Persons = (props) => {
    const {persons, deletePersonById} = props;
    return (
        <>
            {persons.map(person =>
                <Person key={person.name} person={person} deletePersonById={deletePersonById}/>
            )}
        </>
    )
}

export default Persons