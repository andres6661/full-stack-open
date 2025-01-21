const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
require('dotenv').config()

const app = express()
const Person = require('./models/person')

app.use(express.static('dist'))
app.use(cors())
morgan.token('content', (req) => {return req.method === 'POST' ? JSON.stringify(req.body) : ' '})
app.use(express.json())
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :content'))

const errorHandler = (error, req, res, next) => {
  console.log(error.message)
  if (error.name === 'CastError') {
    return res.status(400).send({ error: 'malformatted id' })
  }else if(error.name === 'ValidationError'){
    return res.status(400).send({ error: error.message })
  }
  next(error)
}

const unknownEndpoint = (req, res) => {
  res.status(404).send({ error: 'unkown endpoint' })
}

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
  Person.findById(req.params.id).then(person => {
    if (person) {
      res.json(person)
    } else {
      res.status(404).end()
    }
  })
    .catch(error => {
      console.log(error)
      res.status(500).end()
    })
})


app.post('/api/persons', (req, res, next) => {
  const { name, number } = req.body


  if (!name && !number){
    return res.status(400).json({
      error: 'name or number missing'
    })
  }
  if (!name) {
    return res.status(400).json({
      error: 'name missing'
    })
  }
  if (!number) {
    return res.status(400).json({
      error: 'number missing'
    })
  }
  const person = new Person ({
    name,
    number
  })
  person.save().then(savePerson => {
    res.json(savePerson)
  })
    .catch(error => next(error))
})

app.delete('/api/persons/:id', (req, res, next) => {
  Person.findByIdAndDelete(req.params.id)
    .then( () => {
      res.status(204).end()
    })
    .catch(error => next(error))
})

app.put('/api/persons/:id', (req, res, next) => {
  const { name, number } = req.body

  Person.findByIdAndUpdate(req.params.id, { name, number }, { new: true, runValidators:true })
    .then(updatePerson => {
      res.json(updatePerson)
    })
    .catch(error => next(error))
})

app.use(unknownEndpoint)
app.use(errorHandler)

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)

})