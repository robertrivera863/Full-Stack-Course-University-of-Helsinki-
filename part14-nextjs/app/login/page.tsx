export default function LoginPage() {
  return (
    <div>
      <h1>Login</h1>
      <form>
        <div>
          <label>
            username
            <input name="username" />
          </label>
        </div>
        <div>
          <label>
            password
            <input name="password" type="password" />
          </label>
        </div>
        <button type="submit">login</button>
      </form>
    </div>
  )
}
