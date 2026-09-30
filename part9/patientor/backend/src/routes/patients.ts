import express from 'express'
import { z } from 'zod'
import patientService from '../services/patientService'
import { newPatientSchema, newEntrySchema } from '../utils'

const router = express.Router()

router.get('/', (_req, res) => {
  res.json(patientService.getNonSensitivePatients())
})

router.get('/:id', (req, res) => {
  const patient = patientService.getPatient(req.params.id)
  if (patient) {
    res.json(patient)
  } else {
    res.status(404).send({ error: 'patient not found' })
  }
})

router.post('/', (req, res) => {
  try {
    const newPatient = newPatientSchema.parse(req.body)
    const added = patientService.addPatient(newPatient)
    res.status(201).json(added)
  } catch (error) {
    if (error instanceof z.ZodError) {
      res.status(400).json({ error: error.issues })
    } else {
      res.status(400).json({ error: 'unknown error' })
    }
  }
})

router.post('/:id/entries', (req, res) => {
  try {
    const newEntry = newEntrySchema.parse(req.body)
    const added = patientService.addEntry(req.params.id, newEntry)
    if (added) {
      res.status(201).json(added)
    } else {
      res.status(404).send({ error: 'patient not found' })
    }
  } catch (error) {
    if (error instanceof z.ZodError) {
      res.status(400).json({ error: error.issues })
    } else {
      res.status(400).json({ error: 'unknown error' })
    }
  }
})

export default router
