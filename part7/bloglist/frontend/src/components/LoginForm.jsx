import { useField } from '../hooks'
import { Form, Input, Button } from '../styled/components'

const LoginForm = ({ handleLogin }) => {
  const { reset: resetUsername, ...username } = useField('text')
  const { reset: resetPassword, ...password } = useField('password')

  const handleSubmit = (event) => {
    event.preventDefault()
    handleLogin({ username: username.value, password: password.value })
    resetUsername()
    resetPassword()
  }

  return (
    <Form onSubmit={handleSubmit}>
      <Input {...username} placeholder="username" />
      <Input {...password} placeholder="password" />
      <Button type="submit">Login</Button>
    </Form>
  )
}

export default LoginForm
