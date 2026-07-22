import { v1 as uuid } from 'uuid';
import data from "../data/patients.ts";
import type { NonSensitivePatientEntry, PatientEntry, NewPatientEntry } from "../types.ts";

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

const addPatient = ( entry: NewPatientEntry): PatientEntry => {
  const newPatientEntry = {
    ...entry,
    id: uuid()
  };

  data.push(newPatientEntry);
  return newPatientEntry;
};

export default {
  getPatients,
  getNonSensitivePatients,
  addPatient
};
