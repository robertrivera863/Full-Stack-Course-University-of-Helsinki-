import { useState } from 'react'
import PropTypes from 'prop-types'
import { Form, Input, Label, Button } from '../styled/components'

const LoginForm = ({ handleLogin }) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = (event) => {
    event.preventDefault()
    handleLogin({ username, password })
    setUsername('')
    setPassword('')
  }

  return (
    <Form onSubmit={handleSubmit}>
      <Label>
        Username
        <Input
          type="text"
          value={username}
          placeholder="username"
          onChange={({ target }) => setUsername(target.value)}
        />
      </Label>
      <Label>
        Password
        <Input
          type="password"
          value={password}
          placeholder="password"
          onChange={({ target }) => setPassword(target.value)}
        />
      </Label>
      <Button type="submit">Login</Button>
    </Form>
  )
}

LoginForm.propTypes = {
  handleLogin: PropTypes.func.isRequired
}

export default LoginForm
