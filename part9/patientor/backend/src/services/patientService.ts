import { v1 as uuid } from 'uuid'
import patients from '../data/patients'
import {
  Patient,
  NonSensitivePatient,
  NewPatient,
  Entry,
  NewEntry
} from '../types'

const getPatients = (): Patient[] => patients

const getNonSensitivePatients = (): NonSensitivePatient[] =>
  patients.map(({ ssn: _ssn, ...rest }) => rest)

const getPatient = (id: string): Patient | undefined =>
  patients.find((p) => p.id === id)

const addPatient = (patient: NewPatient): Patient => {
  const newPatient = { id: uuid(), ...patient, entries: [] }
  patients.push(newPatient)
  return newPatient
}

const addEntry = (patientId: string, entry: NewEntry): Entry | undefined => {
  const patient = patients.find((p) => p.id === patientId)
  if (!patient) {
    return undefined
  }

  const newEntry = { id: uuid(), ...entry } as Entry
  patient.entries.push(newEntry)
  return newEntry
}

export default {
  getPatients,
  getNonSensitivePatients,
  getPatient,
  addPatient,
  addEntry
}
