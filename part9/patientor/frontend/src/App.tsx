import { Routes, Route, Link } from 'react-router-dom'
import { Container, AppBar, Toolbar, Button } from '@mui/material'
import PatientListPage from './components/PatientListPage'
import PatientPage from './components/PatientPage'

const App = () => {
  return (
    <Container>
      <AppBar position="static">
        <Toolbar>
          <Button color="inherit" component={Link} to="/">
            Home
          </Button>
        </Toolbar>
      </AppBar>
      <Routes>
        <Route path="/" element={<PatientListPage />} />
        <Route path="/patients/:id" element={<PatientPage />} />
      </Routes>
    </Container>
  )
}

export default App
