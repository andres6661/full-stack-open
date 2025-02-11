import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'

describe('testing <Blog />', () => {
    let component

    const blog = {
        title: 'testing bloglist with vitest',
        author: 'testuser',
        url: 'testbloglist.com',
        likes: 0,
        user: { id: '123', username: 'testuser' }
    }

    const user = { id: '123', username: 'testuser' }

    const updateLikesMock = vi.fn()
    const deleteBlogMock = vi.fn()

    beforeEach(() => {
       component = render(<Blog blog={blog} user={user} updateLikes={updateLikesMock} removeBlog={deleteBlogMock}/>).container
    })

    test('only shows title and author by default', () => {
        expect(component).toHaveTextContent(blog.title)
        expect(component).toHaveTextContent(blog.author)
        expect(component).not.toHaveTextContent(blog.url)
        expect(component).not.toHaveTextContent(blog.likes)
    })

    test('after clicking the button, url and likes are displayed', async () => {
        const user = userEvent.setup()
        const button = screen.getByText('view')
        await user.click(button)

        expect(component).toHaveTextContent(blog.url)
        expect(component).toHaveTextContent(blog.likes)
    })

    test('clicking the like button twice, adds 2 likes', async () => {
        const user = userEvent.setup()
        const button = screen.getByText('view')
        await user.click(button)
        const likeButton = screen.getByText('like')
        await user.dblClick(likeButton)

        expect(updateLikesMock.mock.calls).toHaveLength(2)
    })
})