const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
require('dotenv').config()

const app = express()
const Person = require('./models/person')

let persons = [
  {
    "id": 1,
    "name": "Arto Hellas",
    "number": "040-123456"
  },
  {
    "id": 2,
    "name": "Ada Lovelace",
    "number": "39-44-5323523"
  },
  {
    "id": 3,
    "name": "Dan Abramov",
    "number": "12-43-234345"
  },
  {
    "id": 4,
    "name": "Mary Poppendieck",
    "number": "39-23-6423122"
  }
]

app.use(express.static('dist'))
app.use(cors())
morgan.token('content', (req) => {return req.method === "POST" ? JSON.stringify(req.body) : ' '})
app.use(express.json())
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :content'))


app.get('/api/persons', (req, res) => {
  Person.find({}).then(per => {
    res.json(per)
  })
})

app.get('/api/info', (req, res) => {
  const time = Date(Date.now())

  res.send(`<p>Phonebook has info for ${Person.length} people </p><p>${time}</p>`)


})

app.get('/api/persons/:id', (req, res) => {
  const id = Number(req.params.id)
  const person = persons.find(p => p.id === id)
  if (person) {
    res.json(person)
  } else {
    res.status(404).end()
  }
})

/*
const generateId = () => {
  const maxId = persons.length > 0 
  ? Math.max(...persons.map(n => n.id))
  : 0
  return maxId + Math.random() * 999
}
*/

app.post('/api/persons', (req, res) => {
  const body = req.body

  
  if (body.name === undefined) {
    return res.status(400).json({
      error: 'name missing'
    })
  }
  if (!body.number === undefined) {
    return res.status(400).json({
      error: 'number missing'
    })
  }
  /*
  if (persons.filter(p => p.name === body.name).length > 0) {
    return res.status(400).json({
      error: 'name must be unique'
    })
  }
  */
  const person = new Person ({
    name: body.name,
    number: body.number,
  })
  person.save().then(savePerson => {
    res.json(savePerson)
  })
})

app.delete('/api/persons/:id', (req, res) => {
  const id = Number(req.params.id)
  persons = persons.filter(p => p.id !== id)
  
  res.status(204).end()
})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)

})