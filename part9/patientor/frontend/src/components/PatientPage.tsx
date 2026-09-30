import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { Typography } from '@mui/material'
import { getPatient, getDiagnoses } from '../services/patientService'
import { Patient, Diagnosis, Entry } from '../types'
import EntryDetails from './EntryDetails'
import AddEntryForm from './AddEntryForm'

const PatientPage = () => {
  const { id } = useParams<{ id: string }>()
  const [patient, setPatient] = useState<Patient | null>(null)
  const [diagnoses, setDiagnoses] = useState<Diagnosis[]>([])

  useEffect(() => {
    if (id) {
      getPatient(id).then(setPatient)
    }
    getDiagnoses().then(setDiagnoses)
  }, [id])

  if (!patient) {
    return <Typography>loading...</Typography>
  }

  const handleEntryAdded = (newEntry: Entry) => {
    setPatient({ ...patient, entries: patient.entries.concat(newEntry) })
  }

  return (
    <div>
      <Typography variant="h5" style={{ margin: '0.5em 0' }}>
        {patient.name}
      </Typography>
      <Typography>gender: {patient.gender}</Typography>
      <Typography>ssn: {patient.ssn}</Typography>
      <Typography>occupation: {patient.occupation}</Typography>
      <Typography>date of birth: {patient.dateOfBirth}</Typography>

      <Typography variant="h6" style={{ marginTop: '1em' }}>
        Entries
      </Typography>
      {patient.entries.length === 0 && <Typography>No entries</Typography>}
      {patient.entries.map((entry) => (
        <EntryDetails key={entry.id} entry={entry} diagnoses={diagnoses} />
      ))}

      <AddEntryForm
        patientId={patient.id}
        onEntryAdded={handleEntryAdded}
      />
    </div>
  )
}

export default PatientPage
