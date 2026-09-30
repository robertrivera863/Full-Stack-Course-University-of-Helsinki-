import { z } from 'zod'
import { Gender, HealthCheckRating } from './types'

export const newPatientSchema = z.object({
  name: z.string().min(1),
  dateOfBirth: z.string().date(),
  ssn: z.string().min(1),
  gender: z.nativeEnum(Gender),
  occupation: z.string().min(1)
})

export const newEntrySchema = z.discriminatedUnion('type', [
  z.object({
    type: z.literal('HealthCheck'),
    description: z.string().min(1),
    date: z.string().date(),
    specialist: z.string().min(1),
    diagnosisCodes: z.array(z.string()).optional(),
    healthCheckRating: z.nativeEnum(HealthCheckRating)
  }),
  z.object({
    type: z.literal('OccupationalHealthcare'),
    description: z.string().min(1),
    date: z.string().date(),
    specialist: z.string().min(1),
    diagnosisCodes: z.array(z.string()).optional(),
    employerName: z.string().min(1),
    sickLeave: z
      .object({
        startDate: z.string().date(),
        endDate: z.string().date()
      })
      .optional()
  }),
  z.object({
    type: z.literal('Hospital'),
    description: z.string().min(1),
    date: z.string().date(),
    specialist: z.string().min(1),
    diagnosisCodes: z.array(z.string()).optional(),
    discharge: z.object({
      date: z.string().date(),
      criteria: z.string().min(1)
    })
  })
])
