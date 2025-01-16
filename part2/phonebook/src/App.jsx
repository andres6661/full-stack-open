import { useState, useEffect } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import Notification from './components/Notification'
import numbersService from './services/numbers'


const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [findName, setFindName] = useState('')
  const [message, setMessage] = useState(null)

  useEffect(() => {
    numbersService
      .getAll()
      .then(initialNumbers => {
        setPersons(initialNumbers)
      })
  }, [])

  const addPerson = (event) => {
    event.preventDefault()
    const personObject = { name: newName, number: newNumber }
    if (persons.filter((person) => person.name === personObject.name).length > 0) {
      if (confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)) {
        const person = persons.find(p => p.name === newName)
        const updatePerson = { ...person, number: newNumber }
        numbersService
          .update(person.id, updatePerson)
          .then(returnedNumber => {
            setPersons(persons.map(p => p.name !== newName ? p : returnedNumber))
            setMessage({type: 'success',
              text: `${person.name} has succesfully updated`})
            setTimeout(() => {setMessage(null)}, 5000)
            setNewName('')
            setNewNumber('')
          })
          .catch(error =>{
            setMessage({type: 'error',
              text: `the infomation of ${person.name} was already delete from the server`})
            setTimeout(() => {setMessage(null)}, 5000)
            setPersons(persons.filter(per => per.name !== newName))
          })
      }
      setNewName('')
      setNewNumber('')

    } else {

      numbersService
        .create(personObject)
        .then(returnedNumber => {
          setPersons(persons.concat(returnedNumber))
          setNewName('')
          setNewNumber('')
          setMessage({type: 'success',
            text : `Added ${personObject.name} succesfully`})
            setTimeout(() => {setMessage(null)}, 5000)
        })
        .catch(e => {
          setMessage({type: 'error',
              text: `${e.response.data.error}`})
          setTimeout(() => {setMessage(null)}, 5000)
        })
    }
  }

  const handleRemove = (id, name) => {
    if (confirm(`do you want to delete ${name}`)) {
      numbersService.remove(id)
        .then(() => {
          setPersons(persons.filter(per => per.id !== id))
        })
        .catch(error => {
          setMessage({type: 'error',
              text: `the infomation of ${name} was already delete from the server`})
          setTimeout(() => {setMessage(null)}, 5000)
          setPersons(persons.filter(per => per.id !== id))
        })
    }
  }

  const handleNameChange = (event) => setNewName(event.target.value)

  const handleNumberChange = (event) => setNewNumber(event.target.value)

  const handleFindName = (event) => setFindName(event.target.value)

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={message}/>
      <Filter value={findName} handleFindName={handleFindName} />

      <h2>add a new</h2>
      <PersonForm newName={newName}
        newNumber={newNumber}
        handleNameChange={handleNameChange}
        handleNumberChange={handleNumberChange}
        addPerson={addPerson} />
      <h2>Numbers</h2>
      <Persons
        persons={persons}
        findName={findName}
        handleRemove={handleRemove} />
    </div>
  )
}

export default App