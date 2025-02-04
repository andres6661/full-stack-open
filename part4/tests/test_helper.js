const bcrypt = require('bcryptjs')
const Blog = require('../models/blog')
const User = require('../models/user')


const initialBlogs = [
    {
        _id: "5a422a851b54a676234d17f7",
        title: "React patterns",
        author: "Michael Chan",
        url: "https://reactpatterns.com/",
        likes: 7,
        __v: 0
    },
    {
        _id: "5a422aa71b54a676234d17f8",
        title: "Go To Statement Considered Harmful",
        author: "Edsger W. Dijkstra",
        url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
        likes: 5,
        __v: 0
    },
    {
        _id: "5a422b891b54a676234d17fa",
        title: "First class tests",
        author: "Robert C. Martin",
        url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll",
        likes: 10,
        __v: 0
    }
]

const newBlog = {
                title: 'learning backend testing',
                author: 'andres',
                url: 'testurl.com',
                likes: 4
            }

const newBlogNoLikes = {
                title: 'learning backend testing',
                author: 'andres',
                url: 'testurl.com',
            }

const loginUser = {
    username: 'drstone',
    password: 'senkucola'
}

const blogsInDb = async () => {
    const blogs = await Blog.find({})
    return blogs.map(blog => blog.toJSON())
}

const usersInDb = async () => {
    const users = await User.find({})
    return users.map(user => user.toJSON())
}

const addLoginUser = async () => {
    const passwordHash = await bcrypt.hash(loginUser.password, 10)
    const user = new User({username: loginUser.username, passwordHash})
    await user.save()
}

module.exports = {
    initialBlogs,
    newBlog,
    newBlogNoLikes, 
    blogsInDb,
    usersInDb,
    loginUser,
    addLoginUser
}