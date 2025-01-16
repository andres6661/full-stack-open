import Person from "./Person"
/* prueba 1
const Person = ({name, number, removeNumber}) => {

    return (
        <div>
            <p>
                {name} {number} 
                <button onClick={removeNumber}>delete</button>
            </p>
            
        </div>
    )
}
*/    


const Persons = ({ persons, findName, handleRemove }) => {
    const namesToShow = findName.length === 0
        ? persons
        : persons.filter(person => person.name.toLowerCase().includes(findName.toLowerCase()))


    return (
        <div>
            {namesToShow.map((person) =>             
            <Person 
            key={person.id}
            name={person.name}
            number={person.number} 
            removeNumber={() => handleRemove(person.id, person.name)}
            />
            
           /* prueba 2
            <p key={person.id}>
                {person.name} {person.number}
                <button onClick={() => handleRemove(person.id)}>
                    delete
                </button>
            </p>
            */
            )}
        </div>
    )
}

export default Persons