const { test, after, beforeEach, describe } = require('node:test')
const bcrypt = require('bcryptjs')
const Blog = require('../models/blog')
const User = require('../models/user')
const mongoose = require('mongoose')
const assert = require('node:assert')
const supertest = require('supertest')
const helper = require('./test_helper')
const app = require('../app')


const api = supertest(app)


describe('when there is initially some blogs saved', () => {
    beforeEach(async () => {
        await Blog.deleteMany({})
        await Blog.insertMany(helper.initialBlogs)
        await User.deleteMany({})
        await helper.addLoginUser()
    })

    test('blogs are returned as json', async () => {
        await api
            .get('/api/blogs')
            .expect(200)
            .expect('Content-Type', /application\/json/)
    })

    test('all the blogs are returned', async () => {
        const response = await api.get('/api/blogs')

        assert.strictEqual(response.body.length, helper.initialBlogs.length)
    })

    test('blogs are returned with the right id property', async () => {
        const response = await api.get('/api/blogs')
        response.body.forEach(blog => {
            assert(blog.hasOwnProperty('id'))
        })
    })


    describe('adding a new blogs', () => {

        test('a valid blog can be added', async () => {

            const result = await api
                .post('/api/login')
                .send(helper.loginUser)
                .expect(200)

            const token = result.body.token

            const response = await api
                .post('/api/blogs')
                .set('Authorization', `Bearer ${token}`)
                .send(helper.newBlog)
                .expect(201)
                .expect('Content-Type', /application\/json/)


            const blogAtEnd = await helper.blogsInDb()
            assert.strictEqual(blogAtEnd.length, helper.initialBlogs.length + 1)

            const blogContent = response.body
            assert.strictEqual(blogContent.title, helper.newBlog.title)
            assert.strictEqual(blogContent.author, helper.newBlog.author)
            assert.strictEqual(blogContent.url, helper.newBlog.url)
            assert.strictEqual(blogContent.likes, helper.newBlog.likes)
        })

        test('a blog without likes is added and likes its set to 0', async () => {
            const result = await api
                .post('/api/login')
                .send(helper.loginUser)
                .expect(200)

            const token = result.body.token

            const response = await api
                .post('/api/blogs')
                .set('Authorization', `Bearer ${token}`)
                .send(helper.newBlogNoLikes)
                .expect(201)
                .expect('Content-Type', /application\/json/)

            const blogAtEnd = await helper.blogsInDb()
            assert.strictEqual(blogAtEnd.length, helper.initialBlogs.length + 1)

            const blogContent = response.body
            assert(blogContent.likes === 0)
        })

        test('blog without title or url is not added', async () => {
            const newBlog = {
                author: 'andres',
                likes: 1
            }

            const result = await api
                .post('/api/login')
                .send(helper.loginUser)
                .expect(200)

            const token = result.body.token

            await api
                .post('/api/blogs')
                .set('Authorization', `Bearer ${token}`)
                .send(newBlog)
                .expect(400)

            const blogAtEnd = await helper.blogsInDb()
            assert.strictEqual(blogAtEnd.length, helper.initialBlogs.length)
        })

        test('adding a blog without token fails with proper statuscode', async () => {
            const result = await api
                .post('/api/blogs')
                .send(helper.newBlog)
                .expect(401)
                .expect('Content-Type', /application\/json/)

            assert(result.body.error.includes('token invalid'))
        })
    })

    describe('updating a blog', () => {
        test('updating the likes of a blog', async () => {
            const blogAtStart = await helper.blogsInDb()
            const updatingLikes = { ...blogAtStart[0], likes: 15 }

            await api
                .put(`/api/blogs/${updatingLikes.id}`)
                .send(updatingLikes)
                .expect(200)

            assert.strictEqual(updatingLikes.likes, 15)
        })
    })

    describe('deletion of a blog', () => {
        test('the blog is deleted if id is valid', async () => {
            const result = await api
                .post('/api/login')
                .send(helper.loginUser)
                .expect(200)

            const token = result.body.token

            await api
                .post('/api/blogs')
                .set('Authorization', `Bearer ${token}`)
                .send(helper.newBlog)
                .expect(201)

            const blogAtStart = await helper.blogsInDb()
            const blogToDelete = blogAtStart[3]

            await api
                .delete(`/api/blogs/${blogToDelete.id}`)
                .set('Authorization', `Bearer ${token}`)
                .expect(204)

            const blogAtEnd = await helper.blogsInDb()

            const content = blogAtEnd.map(b => b.title)
            assert(!content.includes(blogToDelete.title))
            assert.strictEqual(blogAtEnd.length, blogAtStart.length - 1)
        })
    })
})

after(async () => {
    await mongoose.connection.close()
})