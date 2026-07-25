import { v1 as uuid } from 'uuid';
import data from "../data/patients.ts";
import type { NonSensitivePatientEntry, PatientEntry, NewPatientEntry, Patient, NewEntry, Entry } from "../types.ts";

const getPatients = (): PatientEntry[] => {
  return data;
};

const getNonSensitivePatients = (): NonSensitivePatientEntry[] => {  
  return data.map(({ id, name, dateOfBirth, gender, occupation }) => ({    
    id,    
    name,
    dateOfBirth,
    gender,
    occupation,
  }));
};

const getPatientById = (id: string): Patient | undefined => {
  const patient = data.find(patient => patient.id === id);
  if (!patient) {
    return undefined;
  }
  return {
    ...patient
  };
};

const addPatient = ( entry: NewPatientEntry): Patient => {
  const newPatientEntry = {
    ...entry,
    id: uuid(),
    entries: []
  };

  data.push(newPatientEntry);
  return newPatientEntry;
};

const addEntry = (id: string, entry: NewEntry): Entry | undefined => {
  const patient = data.find(p => p.id === id);
  if (!patient) {
    return undefined;
  }
  const newEntry: Entry = {
    id: uuid(),
    ...entry,
  };
  patient.entries.push(newEntry);
  return newEntry;
};

export default {
  getPatients,
  getNonSensitivePatients,
  addPatient,
  getPatientById,
  addEntry
};
