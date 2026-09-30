const users = [
  { id: 1, name: 'Matti Luukkainen', username: 'mluukkai' },
  { id: 2, name: 'Arto Hellas', username: 'ahellas' }
]

export default function UsersPage() {
  return (
    <div>
      <h1>Users</h1>
      <ul>
        {users.map((user) => (
          <li key={user.id}>
            {user.name} (@{user.username})
          </li>
        ))}
      </ul>
    </div>
  )
}
