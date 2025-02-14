const { test, expect, describe, beforeEach } = require('@playwright/test')
const { loginWith, createBlog } = require('./helper')

describe('Blog app', () => {
    beforeEach(async ({ page, request }) => {
        await request.post('/api/testing/reset')
        await request.post('api/users', {
            data: {
                name: 'playwrighttest',
                username: 'testing',
                password: 'testblog'
            }
        })

        await request.post('api/users', {
            data: {
                name: 'other usertest',
                username: 'testuser',
                password: 'testdelete'
            }
        })


        await page.goto('/')
    })

    test('Login form is shown', async ({ page }) => {
        await expect(page.getByText('Log in to application')).toBeVisible()
        await expect(page.getByTestId('username')).toBeVisible()
        await expect(page.getByTestId('password')).toBeVisible()
        await expect(page.getByTestId('login')).toBeVisible()
    })

    describe('Login', () => {
        test('succeeds with correct credentials', async ({ page }) => {
            await loginWith(page, 'testing', 'testblog')
            await expect(page.getByText('playwrighttest logged in')).toBeVisible()
        })

        test('fails with wrong credentials', async ({ page }) => {
            await loginWith(page, 'testing', 'wrong')

            const msgDiv = page.getByTestId('notification')
            await expect(msgDiv).toContainText('wrong username or password')
            await expect(msgDiv).toHaveCSS('color', 'rgb(255, 0, 0)')
            await expect(page.getByText('playwrighttest logged in')).not.toBeVisible()
        })

        describe('when loged in', () => {
            beforeEach(async ({ page }) => {
                await loginWith(page, 'testing', 'testblog')

            })

            test('a new blog can be created', async ({ page }) => {
                await createBlog(page, 'testing with playwright', 'playwright', 'testblog.com')

                const msgDiv = page.getByTestId('notification')
                await expect(msgDiv).toContainText('a new blog testing with playwright by author playwright was added')
                await expect(msgDiv).toHaveCSS('color', 'rgb(0, 128, 0)')
                await expect(page.getByText('testing with playwright by playwright')).toBeVisible()

            })

            test('adding a like to the blog', async ({ page }) => {
                await createBlog(page, 'testing with playwright', 'playwright', 'testblog.com')

                await page.getByRole('button', { name: 'view' }).click()
                await expect(page.getByText(0)).toBeVisible()

                await page.getByRole('button', { name: 'like' }).click()
                await expect(page.getByText(1)).toBeVisible()
            })

            test('the user who creates a new blog can deleted it', async ({ page }) => {
                await createBlog(page, 'testing with playwright', 'playwright', 'testblog.com')
                await page.getByTestId('notification').waitFor({ state: 'hidden' })

                await page.getByRole('button', { name: 'view' }).click()
                await expect(page.getByRole('button', { name: 'delete' })).toBeVisible()

                page.on('dialog', dialog => dialog.accept())
                await page.getByRole('button', { name: 'delete' }).click()

                const msgDiv = page.getByTestId('notification')
                await expect(msgDiv).toContainText('the blog was deleted successfully')
                await expect(msgDiv).toHaveCSS('color', 'rgb(0, 128, 0)')
                await expect(page.getByText('testing with playwright by playwright')).not.toBeVisible()
            })

            test('delete button only appears if you create the blog', async ({ page }) => {
                await createBlog(page, 'testing with playwright', 'playwright', 'testblog.com')
                await page.getByTestId('notification').waitFor({ state: 'hidden' })

                await page.getByRole('button', { name: 'view' }).click()
                await expect(page.getByRole('button', { name: 'delete' })).toBeVisible()

                await page.getByRole('button', { name: 'logout' }).click()
                await loginWith(page, 'testuser', 'testdelete')
                await page.getByRole('button', { name: 'view' }).click()

                await expect(page.getByRole('button', { name: 'delete' })).not.toBeVisible()
            })

            test('likes testing', async ({ page }) => {
                const blogs = [
                    { title: 'blog one', author: 'blogone', url: 'blogone.com', likes: 1 },
                    { title: 'blog two', author: 'blogtwo', url: 'blogone.com', likes: 4 },
                    { title: 'blog three', author: 'blogthree', url: 'blogthree.com', likes: 2 }
                ]

                for (const blog of blogs) {
                    await createBlog(page, blog.title, blog.author, blog.url)
                }

                //adding likes to the blog
                for (const blog of blogs) {
                    const viewBotton = page.locator('div').filter({ hasText: `${blog.title} by ${blog.author}` }).nth(3)
                        await viewBotton.getByRole('button', { name: 'view' }).click()
                    for (let index = 0; index < blog.likes; index++) {
                        
                        const addLike = page.waitForEvent('response')
                        await page.getByRole('button', { name: 'like' }).click()
                        const response = await addLike
                    }
                    await viewBotton.getByRole('button', {name: 'hide'}).click()
                }

                await page.reload()
                await page.locator('div').filter({ hasText: 'blog two by blogtwoview' }).nth(3).waitFor()

                const blogElements = await page.locator('.blog-title').all()
                const blogTitles = await Promise.all(blogElements.map(async (element) => {
                    return await element.textContent();
                    }))

                expect(blogTitles[0]).toEqual(expect.stringContaining(`${blogs[1].title}`))
                expect(blogTitles[1]).toEqual(expect.stringContaining(`${blogs[2].title}`))
                expect(blogTitles[2]).toEqual(expect.stringContaining(`${blogs[0].title}`))
            })
        })
    })
})