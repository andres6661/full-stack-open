import { useState } from 'react'

const LoginForm = ({ loginCredentials }) => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const handleLogin = (event) => {
        event.preventDefault()
        loginCredentials({ username, password })
        setUsername('')
        setPassword('')
    } 

    return(
        <div>
            <form onSubmit={handleLogin}>
          <div>
            username
            <input
              data-testid='username'
              type='text'
              value={username}
              name='Username'
              onChange={({ target }) => setUsername(target.value)}
            />
          </div>
          <div>
            password
            <input
              data-testid='password'
              type='password'
              value={password}
              name='Password'
              onChange={({ target }) => setPassword(target.value)}
            />
          </div>
          <button data-testid='login' type='submit'>login</button>
        </form>
        </div>
    )
}

export default LoginForm