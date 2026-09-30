import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import {
  Table,
  TableBody,
  TableCell,
  TableRow,
  TableHead,
  Typography
} from '@mui/material'
import { getPatients } from '../services/patientService'
import { Patient } from '../types'

const PatientListPage = () => {
  const [patients, setPatients] = useState<Patient[]>([])

  useEffect(() => {
    getPatients().then(setPatients)
  }, [])

  return (
    <div>
      <Typography variant="h5" style={{ margin: '0.5em 0' }}>
        Patient list
      </Typography>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Gender</TableCell>
            <TableCell>Occupation</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {patients.map((p) => (
            <TableRow key={p.id}>
              <TableCell>
                <Link to={`/patients/${p.id}`}>{p.name}</Link>
              </TableCell>
              <TableCell>{p.gender}</TableCell>
              <TableCell>{p.occupation}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

export default PatientListPage
