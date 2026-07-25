import { useState } from 'react';
import axios from 'axios';
import {
  Box,
  Button,
  TextField,
  MenuItem,
  Alert,
  Select,
  InputLabel,
  FormControl,
} from '@mui/material';

import { apiBaseUrl } from '../../constants';
import type { Patient, DiagnoseEntry } from '../../types';

interface Props {
  patientId: string | undefined;
  setPatient: React.Dispatch<React.SetStateAction<Patient | null>>;
  diagnoses: DiagnoseEntry[];
}

type EntryType = 'HealthCheck' | 'Hospital' | 'OccupationalHealthcare';

const AddEntryForm = ({ patientId, setPatient, diagnoses }: Props) => {

  const [type, setType] = useState<EntryType>('HealthCheck');

  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');
  const [specialist, setSpecialist] = useState('');
  const [diagnosisCodes, setDiagnosisCodes] = useState<string[]>([]);

  const [healthCheckRating, setHealthCheckRating] = useState('');

  const [dischargeDate, setDischargeDate] = useState('');
  const [criteria, setCriteria] = useState('');

  const [employerName, setEmployerName] = useState('');
  const [sickLeaveStart, setSickLeaveStart] = useState('');
  const [sickLeaveEnd, setSickLeaveEnd] = useState('');

  const [error, setError] = useState<string | null>(null);


  const submitEntry = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!patientId) {
      return;
    }

    let newEntry;

    switch (type) {
      case 'HealthCheck':
        newEntry = {
          description,
          date,
          specialist,
          type,
          healthCheckRating: Number(healthCheckRating),
          ...(diagnosisCodes.length > 0 && { diagnosisCodes })
        };
        break;

      case 'Hospital':
        newEntry = {
          description,
          date,
          specialist,
          type,
          discharge: {
            date: dischargeDate,
            criteria
          },
          ...(diagnosisCodes.length > 0 && { diagnosisCodes })
        };
        break;

      case 'OccupationalHealthcare':
        newEntry = {
          description,
          date,
          specialist,
          type,
          employerName,
          ...(sickLeaveStart && sickLeaveEnd && {
            sickLeave: {
              startDate: sickLeaveStart,
              endDate: sickLeaveEnd
            }
          }),
          ...(diagnosisCodes.length > 0 && { diagnosisCodes })
        };
        break;
    }

    try {
      setError(null);

      await axios.post(`${apiBaseUrl}/patients/${patientId}/entries`, newEntry);

      const response = await axios.get<Patient>(`${apiBaseUrl}/patients/${patientId}`);
      setPatient(response.data);

      setDescription('');
      setDate('');
      setSpecialist('');
      setDiagnosisCodes([]);
      setHealthCheckRating('');
      setDischargeDate('');
      setCriteria('');
      setEmployerName('');
      setSickLeaveStart('');
      setSickLeaveEnd('');

    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response?.data?.error) {
          const errors = error.response.data.error;

          setError(
            errors.map((err: { path: string[]; message: string }) =>
              `${err.path.join('.')}: ${err.message}`
            ).join(', ')
          );
        } else {
          setError(error.message);
        }
      } else {
        setError('Unknown error');
      }
    }
  };


  return (
    <Box component="form" onSubmit={submitEntry} sx={{ mt: 3, p: 2, border: 1, borderRadius: 2 }}>
      <h3>Add entry</h3>

      {error && <Alert severity="error">{error}</Alert>}

      <TextField select label="Entry type" value={type} onChange={(event) => setType(event.target.value as EntryType)} fullWidth margin="normal">
        <MenuItem value="HealthCheck">Health Check</MenuItem>
        <MenuItem value="Hospital">Hospital</MenuItem>
        <MenuItem value="OccupationalHealthcare">Occupational Healthcare</MenuItem>
      </TextField>

      <TextField label="Description" value={description} onChange={(event) => setDescription(event.target.value)} fullWidth margin="normal" />

      <TextField label="Date" type="date" value={date} onChange={(event) => setDate(event.target.value)} fullWidth margin="normal" InputLabelProps={{ shrink: true }} />

      <TextField label="Specialist" value={specialist} onChange={(event) => setSpecialist(event.target.value)} fullWidth margin="normal" />

      <FormControl fullWidth margin="normal">
        <InputLabel>Diagnosis codes</InputLabel>
        <Select multiple value={diagnosisCodes} label="Diagnosis codes" onChange={(event) => setDiagnosisCodes(event.target.value as string[])}>
          {diagnoses.map((diagnosis) => (
            <MenuItem key={diagnosis.code} value={diagnosis.code}>
              {diagnosis.code} - {diagnosis.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      {type === 'HealthCheck' && (
        <FormControl fullWidth margin="normal">
          <InputLabel>Health check rating</InputLabel>
          <Select value={healthCheckRating} label="Health check rating" onChange={(event) => setHealthCheckRating(event.target.value)}>
            <MenuItem value="0">Healthy</MenuItem>
            <MenuItem value="1">Low risk</MenuItem>
            <MenuItem value="2">High risk</MenuItem>
            <MenuItem value="3">Critical risk</MenuItem>
          </Select>
        </FormControl>
      )}

      {type === 'Hospital' && (
        <>
          <TextField label="Discharge date" type="date" value={dischargeDate} onChange={(event) => setDischargeDate(event.target.value)} fullWidth margin="normal" InputLabelProps={{ shrink: true }} />
          <TextField label="Discharge criteria" value={criteria} onChange={(event) => setCriteria(event.target.value)} fullWidth margin="normal" />
        </>
      )}

      {type === 'OccupationalHealthcare' && (
        <>
          <TextField label="Employer name" value={employerName} onChange={(event) => setEmployerName(event.target.value)} fullWidth margin="normal" />

          <TextField label="Sick leave start" type="date" value={sickLeaveStart} onChange={(event) => setSickLeaveStart(event.target.value)} fullWidth margin="normal" InputLabelProps={{ shrink: true }} />

          <TextField label="Sick leave end" type="date" value={sickLeaveEnd} onChange={(event) => setSickLeaveEnd(event.target.value)} fullWidth margin="normal" InputLabelProps={{ shrink: true }} />
        </>
      )}

      <Box sx={{ mt: 2, display: 'flex', gap: 2 }}>
        <Button type="submit" variant="contained">
          Add New Entry
        </Button>
      </Box>
    </Box>
  );
};

export default AddEntryForm;