import axios from 'axios'
import { Patient, Diagnosis, Entry, NewEntry } from '../types'

const baseUrl = '/api'

export const getPatients = async (): Promise<Patient[]> => {
  const { data } = await axios.get<Patient[]>(`${baseUrl}/patients`)
  return data
}

export const getPatient = async (id: string): Promise<Patient> => {
  const { data } = await axios.get<Patient>(`${baseUrl}/patients/${id}`)
  return data
}

export const getDiagnoses = async (): Promise<Diagnosis[]> => {
  const { data } = await axios.get<Diagnosis[]>(`${baseUrl}/diagnoses`)
  return data
}

export const addEntry = async (
  patientId: string,
  entry: NewEntry
): Promise<Entry> => {
  const { data } = await axios.post<Entry>(
    `${baseUrl}/patients/${patientId}/entries`,
    entry
  )
  return data
}
