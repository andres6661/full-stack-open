import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { loginUser } from '../reducers/loginReducer'
import { TextField, Button, Box, Typography } from '@mui/material'

const LoginForm = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const dispatch = useDispatch()
  const login = useSelector((state) => state.login)

  const handleLogin = (event) => {
    event.preventDefault()
    const loginCredentials = { username, password }
    dispatch(loginUser(loginCredentials))
    setUsername('')
    setPassword('')
  }

  return (
    <div>
      <Box
        component='form'
        onSubmit={handleLogin}
        sx={{ alignContent: '', m: 1 }}
      >
        <Typography variant='h5' sx={{ my: 2 }}>
          Log in to application
        </Typography>
        <div>
          <TextField
            id='username'
            label='username'
            value={username}
            name='username'
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          <TextField
            id='password'
            label='password'
            type='password'
            value={password}
            name='password'
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <Button id='login' variant='contained' color='primary' type='submit'>
          login
        </Button>
      </Box>
    </div>
  )
}

export default LoginForm
