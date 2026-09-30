import { Entry, Diagnosis } from '../types'
import { HealthCheckRating } from '../types'

const assertNever = (value: never): never => {
  throw new Error(`Unhandled entry type: ${JSON.stringify(value)}`)
}

const EntryDetails = ({
  entry,
  diagnoses
}: {
  entry: Entry
  diagnoses: Diagnosis[]
}) => {
  const base = (
    <div>
      <p>
        {entry.date} <em>{entry.description}</em>
      </p>
      <p>specialist: {entry.specialist}</p>
      {entry.diagnosisCodes && (
        <ul>
          {entry.diagnosisCodes.map((code) => {
            const diagnosis = diagnoses.find((d) => d.code === code)
            return (
              <li key={code}>
                {code} {diagnosis ? diagnosis.name : ''}
              </li>
            )
          })}
        </ul>
      )}
    </div>
  )

  const style = {
    border: '1px solid #ccc',
    borderRadius: 4,
    padding: '0.5em',
    margin: '0.5em 0'
  }

  switch (entry.type) {
    case 'Hospital':
      return (
        <div style={style}>
          <b>Hospital</b>
          {base}
          <p>
            discharge: {entry.discharge.date} — {entry.discharge.criteria}
          </p>
        </div>
      )
    case 'OccupationalHealthcare':
      return (
        <div style={style}>
          <b>Occupational Healthcare</b>
          {base}
          <p>employer: {entry.employerName}</p>
          {entry.sickLeave && (
            <p>
              sick leave: {entry.sickLeave.startDate} — {entry.sickLeave.endDate}
            </p>
          )}
        </div>
      )
    case 'HealthCheck':
      return (
        <div style={style}>
          <b>Health Check</b>
          {base}
          <p>rating: {HealthCheckRating[entry.healthCheckRating]}</p>
        </div>
      )
    default:
      return assertNever(entry)
  }
}

export default EntryDetails
