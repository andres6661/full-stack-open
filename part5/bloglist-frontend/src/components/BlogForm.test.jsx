import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import BlogForm from './BlogForm'

test('<BlogForm /> calls event handler with right details when a new blog is created', async () => {
    const createBlog = vi.fn()
    const user = userEvent.setup()

    const { container } = render(<BlogForm createBlog={createBlog}/>)

    const inputTitle = container.querySelector('#title')
    const inputAuthor = container.querySelector('#author')
    const inputUrl = container.querySelector('#url')
    const sendButton = screen.getByText('create')

    await user.type(inputTitle, 'testing blog form')
    await user.type(inputAuthor, 'testuser')
    await user.type(inputUrl, 'testblog.com')
    await user.click(sendButton)

    expect(createBlog.mock.calls).toHaveLength(1)
    expect(createBlog.mock.calls[0][0].title).toBe('testing blog form')
    expect(createBlog.mock.calls[0][0].author).toBe('testuser')
    expect(createBlog.mock.calls[0][0].url).toBe('testblog.com')
    
})