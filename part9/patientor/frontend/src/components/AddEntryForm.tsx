import { useState, FormEvent } from 'react'
import {
  Button,
  TextField,
  MenuItem,
  Box
} from '@mui/material'
import { addEntry } from '../services/patientService'
import { NewEntry, Entry, HealthCheckRating } from '../types'

interface Props {
  patientId: string
  onEntryAdded: (entry: Entry) => void
}

const AddEntryForm = ({ patientId, onEntryAdded }: Props) => {
  const [type, setType] = useState<string>('HealthCheck')
  const [description, setDescription] = useState('')
  const [date, setDate] = useState('')
  const [specialist, setSpecialist] = useState('')
  const [diagnosisCodes, setDiagnosisCodes] = useState('')

  const [healthCheckRating, setHealthCheckRating] = useState(
    HealthCheckRating.Healthy
  )
  const [employerName, setEmployerName] = useState('')
  const [dischargeDate, setDischargeDate] = useState('')
  const [dischargeCriteria, setDischargeCriteria] = useState('')

  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const base = {
      description,
      date,
      specialist,
      diagnosisCodes: diagnosisCodes
        ? diagnosisCodes.split(',').map((s) => s.trim())
        : undefined
    }

    let newEntry: NewEntry

    if (type === 'HealthCheck') {
      newEntry = { ...base, type: 'HealthCheck', healthCheckRating }
    } else if (type === 'OccupationalHealthcare') {
      newEntry = { ...base, type: 'OccupationalHealthcare', employerName }
    } else {
      newEntry = {
        ...base,
        type: 'Hospital',
        discharge: { date: dischargeDate, criteria: dischargeCriteria }
      }
    }

    const added = await addEntry(patientId, newEntry)
    onEntryAdded(added)

    setDescription('')
    setDate('')
    setSpecialist('')
    setDiagnosisCodes('')
  }

  return (
    <Box
      component="form"
      onSubmit={submit}
      sx={{ border: '1px solid #ccc', borderRadius: 1, padding: 2, marginTop: 2 }}
    >
      <h3>Add entry</h3>

      <TextField
        select
        fullWidth
        label="Type"
        value={type}
        onChange={({ target }) => setType(target.value)}
        margin="dense"
      >
        <MenuItem value="HealthCheck">Health Check</MenuItem>
        <MenuItem value="OccupationalHealthcare">Occupational Healthcare</MenuItem>
        <MenuItem value="Hospital">Hospital</MenuItem>
      </TextField>

      <TextField
        fullWidth
        label="Description"
        value={description}
        onChange={({ target }) => setDescription(target.value)}
        margin="dense"
      />
      <TextField
        fullWidth
        type="date"
        label="Date"
        InputLabelProps={{ shrink: true }}
        value={date}
        onChange={({ target }) => setDate(target.value)}
        margin="dense"
      />
      <TextField
        fullWidth
        label="Specialist"
        value={specialist}
        onChange={({ target }) => setSpecialist(target.value)}
        margin="dense"
      />
      <TextField
        fullWidth
        label="Diagnosis codes (comma separated)"
        value={diagnosisCodes}
        onChange={({ target }) => setDiagnosisCodes(target.value)}
        margin="dense"
      />

      {type === 'HealthCheck' && (
        <TextField
          select
          fullWidth
          label="Health check rating"
          value={healthCheckRating}
          onChange={({ target }) =>
            setHealthCheckRating(Number(target.value) as HealthCheckRating)
          }
          margin="dense"
        >
          <MenuItem value={HealthCheckRating.Healthy}>Healthy</MenuItem>
          <MenuItem value={HealthCheckRating.LowRisk}>Low risk</MenuItem>
          <MenuItem value={HealthCheckRating.HighRisk}>High risk</MenuItem>
          <MenuItem value={HealthCheckRating.CriticalRisk}>Critical risk</MenuItem>
        </TextField>
      )}

      {type === 'OccupationalHealthcare' && (
        <TextField
          fullWidth
          label="Employer name"
          value={employerName}
          onChange={({ target }) => setEmployerName(target.value)}
          margin="dense"
        />
      )}

      {type === 'Hospital' && (
        <>
          <TextField
            fullWidth
            type="date"
            label="Discharge date"
            InputLabelProps={{ shrink: true }}
            value={dischargeDate}
            onChange={({ target }) => setDischargeDate(target.value)}
            margin="dense"
          />
          <TextField
            fullWidth
            label="Discharge criteria"
            value={dischargeCriteria}
            onChange={({ target }) => setDischargeCriteria(target.value)}
            margin="dense"
          />
        </>
      )}

      <Button type="submit" variant="contained" sx={{ marginTop: 1 }}>
        add entry
      </Button>
    </Box>
  )
}

export default AddEntryForm
