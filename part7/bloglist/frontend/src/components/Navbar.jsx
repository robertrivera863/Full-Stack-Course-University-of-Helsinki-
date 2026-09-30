import styled from 'styled-components'
import { Link } from 'react-router-dom'
import { Button } from '../styled/components'

const Nav = styled.nav`
  background: #1a73e8;
  padding: 1rem;
  display: flex;
  align-items: center;
  gap: 1.5rem;
  margin-bottom: 1.5rem;
`

const NavLink = styled(Link)`
  color: white;
  text-decoration: none;
  font-weight: 600;
  font-size: 1rem;

  &:hover {
    text-decoration: underline;
  }
`

const UserInfo = styled.span`
  color: white;
  font-size: 0.9rem;
  margin-left: auto;
  display: flex;
  align-items: center;
  gap: 1rem;
`

const LogoutButton = styled(Button)`
  background: white;
  color: #1a73e8;
  padding: 0.25rem 0.75rem;
  font-size: 0.9rem;

  &:hover {
    background: #f0f0f0;
  }
`

const Navbar = ({ user, handleLogout }) => {
  return (
    <Nav>
      <NavLink to="/">Blogs</NavLink>
      <NavLink to="/users">Users</NavLink>
      {user ? (
        <UserInfo>
          <span>{user.name} logged in</span>
          <LogoutButton onClick={handleLogout}>Logout</LogoutButton>
        </UserInfo>
      ) : (
        <UserInfo>
          <NavLink to="/login">Log in</NavLink>
        </UserInfo>
      )}
    </Nav>
  )
}

export default Navbar
