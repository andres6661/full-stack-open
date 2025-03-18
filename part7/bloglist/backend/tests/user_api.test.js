const { test, after, beforeEach, describe } = require('node:test')
const assert = require('node:assert')
const bcrypt = require('bcryptjs')
const User = require('../models/user')
const mongoose = require('mongoose')
const supertest = require('supertest')
const helper = require('./test_helper')
const app = require('../app')

const api = supertest(app)

describe('when there is initially one user in db', () => {
    beforeEach(async () => {
        await User.deleteMany({})

        const passwordHash = await bcrypt.hash('sekret', 10)
        const user = new User({ username: 'root', passwordHash })

        await user.save()
    })

    test('creation of a fresh username succeeds', async () => {
        const userAtStart = await helper.usersInDb()

        const newUser = {
            username: 'drstone',
            name: 'senku',
            password: 'senkucola'
        }

        await api
            .post('/api/users')
            .send(newUser)
            .expect(201)
            .expect('Content-Type', /application\/json/)

        const userAtEnd = await helper.usersInDb()
        assert.strictEqual(userAtEnd.length, userAtStart.length + 1)

        const userNames = userAtEnd.map(u => u.username)
        assert(userNames.includes(newUser.username))
    })

    test('creation fails with proper statuscode and message if username already taken', async () => {
        const userAtStart = await helper.usersInDb()

        newUser = {
            username: 'root',
            name: 'Superuser',
            password: 'pass123'
        }

        const result = await api
            .post('/api/users')
            .send(newUser)
            .expect(400)
            .expect('Content-Type', /application\/json/)

        const userAtEnd = await helper.usersInDb()
        assert(result.body.error.includes('expected `username` to be unique'))

        assert.strictEqual(userAtEnd.length, userAtStart.length)
    })

    test('creation fails with proper statuscode and message when username or password is missing', async () => {
        const userAtStart = await helper.usersInDb()

        const newUser = {
            name: 'nousername'
        }

        const result = await api
            .post('/api/users')
            .send(newUser)
            .expect(400)
            .expect('Content-Type', /application\/json/)

        const userAtEnd = await helper.usersInDb()
        assert(result.body.error.includes('you need to provided a username and a password'))

        assert.strictEqual(userAtEnd.length, userAtStart.length)
    })

    test('fails with proper statuscode and message when the username is to short', async () => {
        const userAtStart = await helper.usersInDb()

        const newUser = {
            username: 'ok',
            name: 'rammus',
            password: 'jungle'
        }

        const result = await api
            .post('/api/users')
            .send(newUser)
            .expect(400)
            .expect('Content-Type', /application\/json/)
        
        const userAtEnd = await helper.usersInDb()
        assert(result.body.error.includes('the username and the password needs to be at least 3 characters long'))

        assert.strictEqual(userAtEnd.length, userAtStart.length)
    })

    test('fails with proper statuscode and message when the password is to short', async () => {
        const userAtStart = await helper.usersInDb()

        const newUser = {
            username: 'rammus',
            name: 'jungle',
            password: 'o'
        }

        const result = await api
            .post('/api/users')
            .send(newUser)
            .expect(400)
            .expect('Content-Type', /application\/json/)
        
        const userAtEnd = await helper.usersInDb()
        assert(result.body.error.includes('the username and the password needs to be at least 3 characters long'))

        assert.strictEqual(userAtEnd.length, userAtStart.length)
    })
})

after(async () => {
    await mongoose.connection.close()
})