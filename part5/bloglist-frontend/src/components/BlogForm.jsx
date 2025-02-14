import { useState } from 'react'

const BlogForm = ({ createBlog }) => {
    const [newBlog, setNewBlog] = useState({ title: '', author: '', url: '' })

    const addBlog = (event) => {
        event.preventDefault()
        createBlog({
            title: newBlog.title,
            author: newBlog.author,
            url: newBlog.url,
        })
        setNewBlog({ title: '', author: '', url: '' })
    }

    return (
        <div>
            <h2>create new</h2>
            <form onSubmit={addBlog}>
                <div>
                    title: <input
                        data-testid='title'
                        id='title'
                        type='text'
                        value={newBlog.title}
                        name='Title'
                        onChange={({ target }) => setNewBlog({ ...newBlog, title: target.value })}
                    />
                </div>
                <div>
                    author: <input
                        data-testid='author'
                        id='author'
                        type='text'
                        value={newBlog.author}
                        name='Author'
                        onChange={({ target }) => setNewBlog({ ...newBlog, author: target.value })}
                    />
                </div>
                <div>
                    url: <input
                        data-testid='url'
                        id='url'
                        type='text'
                        value={newBlog.url}
                        name='Url'
                        onChange={({ target }) => setNewBlog({ ...newBlog, url: target.value })}
                    />
                </div>
                <button type='submit'>create</button>
            </form>
        </div>
    )
}

export default BlogForm