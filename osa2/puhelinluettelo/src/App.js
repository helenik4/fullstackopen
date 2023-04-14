import { useState, useEffect } from 'react'
import personService from './services/persons'
import Persons from './components/Persons'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import SuccessMessage from './components/SuccessMessage'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFilter, setNewFilter] = useState('')
  const [successMessage, setSuccessMessage] = useState('')

  useEffect(() => {
    personService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
      })
  }, [])

  const personsToShow = persons.filter(person => person.name.toLowerCase().includes(newFilter))

  const addPerson = (event) => {
    event.preventDefault()
    const personObject = {
      name: newName,
      number: newNumber
    }

    if (persons.find(person => person.name === personObject.name)) {
      if (persons.find(person => person.number === personObject.number)) {
        (window.alert(`${personObject.name} is already added to phonebook`))
      } else {
        if (window.confirm(`${personObject.name} is already added to phonebook, replace the old number with a new one?`)) {
          const matchingPersonId = persons.find(person => person.name === personObject.name).id
          personService
            .updatePerson(matchingPersonId, personObject)
            .then(returnedPerson => {
              setPersons(persons.map(person => person.id !== matchingPersonId ? person : returnedPerson))
              setNewName('')
              setNewNumber('')
            })
          setSuccessMessage(
            `Changed number for ${personObject.name} `
          )
          setTimeout(() => {
            setSuccessMessage(null)
          }, 5000)
        }
      }
    } else {
      personService
        .create(personObject)
        .then(returnedPerson => {
          setPersons(persons.concat(returnedPerson))
          setNewName('')
          setNewNumber('')
        })
      setSuccessMessage(
        `Added ${personObject.name} `
      )
      setTimeout(() => {
        setSuccessMessage(null)
      }, 5000)
    }
  }

  const deletePersonById = (id) => {
    const personToDelete = persons.find(person => person.id === id)
    if (window.confirm(`Delete ${personToDelete.name}?`)) {
      personService
        .deleteById(id)
        .then(response => {
          setPersons(persons.filter(person => person.id !== id))
        })
      setSuccessMessage(
        `Deleted ${personToDelete.name} `
      )
      setTimeout(() => {
        setSuccessMessage(null)
      }, 5000)
    }
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleFilterChange = (event) => {
    setNewFilter(event.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      {successMessage &&
        <SuccessMessage message={successMessage} />
      }
      <Filter newFilter={newFilter} handleFilterChange={handleFilterChange} />
      <h3>Add a new</h3>
      <PersonForm handleNameChange={handleNameChange} handleNumberChange={handleNumberChange} addPerson={addPerson} newName={newName} newNumber={newNumber} />
      <h3>Numbers</h3>
      <Persons persons={personsToShow} deletePersonById={deletePersonById} />
    </div>
  )

}

export default App
