const mongoose = require('mongoose')
mongoose.set('strictQuery', false)

const url =process.env.MONGODB_URI

console.log('connecting to', url)

mongoose.connect(url)
  .then( () => {
    console.log('connected to mongoBD')
  })
  .catch(error => {
    console.log('error connecting to mongoBD:', error.message)

  })

const validatorPhone = (phonenumber) => {
  return /^\d{2,3}-\d+$/.test(phonenumber)
}

const personSchema = new mongoose.Schema({
  name: {
    type: String,
    minLength: [3, 'name its to short'],
    required: true
  },
  number: {
    type: String,
    minLength: [8, 'phone number its to short'],
    validate: [validatorPhone, 'invalid phone number'],
    required: true
  }
})

personSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

module.exports = mongoose.model('Person', personSchema)