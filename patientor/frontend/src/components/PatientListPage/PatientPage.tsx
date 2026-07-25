import { useParams } from 'react-router-dom';
import { useEffect, useState } from "react";
import { Patient, DiagnoseEntry } from '../../types';
import { apiBaseUrl } from "../../constants";
import axios from "axios";
import { genderIcons } from '../icons';
import { EntryDetails } from './EntryDetails';
import AddEntryForm from './AddEntryForm';
import { Box } from '@mui/material';


const PatientPage = () => {
  const [patient, setPatient] = useState<Patient | null>(null);
  const [diagnoses, setDiagnoses] = useState<DiagnoseEntry[]>([]);
  const [error, setError] = useState<null | string>(null);
  const id = useParams().id;

  useEffect(() => {
    const fetchPatient = async () => {
      try {
        setError(null);
        const response = await axios.get<Patient>(`${apiBaseUrl}/patients/${id}`);
        setPatient(response.data);
      } catch (error) {
        if (axios.isAxiosError(error)) {
          console.log(error);
          setError(error.message);
        } else {
          console.log(error);
        }
      }
    };
    void fetchPatient();
  }, [id]);

  useEffect(() => {
    const fetchDiagnoses = async () => {
      try {
        const response = await axios.get<DiagnoseEntry[]>(
          `${apiBaseUrl}/diagnoses`
        );

        setDiagnoses(response.data);
      } catch (error) {
        if (axios.isAxiosError(error)) {
          setError(error.message);
        }
      }
    };

    void fetchDiagnoses();
  }, []);
  
  if (!patient) {
    return(<div>...loading</div>);
  }

  const PersonIcon = genderIcons[patient.gender];

  return (
    <div>
      {error && 
      <div>{error}</div>}
        <h2>{patient.name} <PersonIcon /></h2>
        <p>ssn: {patient.ssn}</p>
        <p>Occupation: {patient.occupation}</p>
        <p>Date of birth: {patient.dateOfBirth}</p>
        <h4>Entries</h4>
          {patient.entries.map(entry =>
            <Box key={entry.id} sx={{
              border: 2,
              borderRadius: 3,
              p: 2,
              mb: 2,
            }}>
              <EntryDetails entry={entry} />
            </Box>
          )}
          <AddEntryForm
            patientId={id}
            setPatient={setPatient}
            diagnoses={diagnoses}
          />
    </div>
  );
};

export default PatientPage;