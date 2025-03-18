const _ = require('lodash')

const dummy = (blogs) => {
    return 1
}

const totalLikes = (blogs) => {
    const reducer = (sum, blog) => {
        return sum + blog.likes
    }
    return blogs.length === 0
        ? 0
        : blogs.reduce(reducer, 0)
}

const favoriteBlog = (blogs) => {
    if (blogs.length === 0) return null

    const favBlog = blogs.reduce((finalValue, currentValue) => {
        return finalValue.likes > currentValue.likes ? finalValue : currentValue
    }, {})
    return { title: favBlog.title, author: favBlog.author, likes: favBlog.likes }
}

const mostBlogs = (blogs) => {
    if (blogs.length === 0) return null

    const authorList = _.countBy(blogs, 'author')

    const mostBlogAuthor = Object.keys(authorList).reduce((a, b) => {
        return authorList[a] > authorList[b] ? a : b
    }, {})

    return { author: mostBlogAuthor, blogs: authorList[mostBlogAuthor] }
}

const mostLikes = (blogs) => {
    if (blogs.length === 0) return null

    const authorList = _.groupBy(blogs, 'author')

    const authorLikes = Object.entries(authorList)
        .map(([author, blogs]) => {
            const sumsOfLikes = blogs.reduce((total, blog) => total + blog.likes, 0)

            return { author: author, likes: sumsOfLikes }
        })

    return authorLikes.reduce((finalValue, currentValue) => {
        return finalValue.likes > currentValue.likes ? finalValue : currentValue
    }, {})
}

module.exports = {
    dummy,
    totalLikes,
    favoriteBlog,
    mostBlogs,
    mostLikes
}