import WorkIcon from '@mui/icons-material/Work';
import type { OccupationalHealthcareEntry } from '../../types';


type OccupationalHealthcareProps = {
  entry: OccupationalHealthcareEntry
};

const OccupationalHealthcareEntry = ({ entry }: OccupationalHealthcareProps) => {
  return (
    <div>
      <div>{entry.date} <WorkIcon /> {entry.employerName}</div>
      <i>{entry.description}</i>
      <div>Diagnosed by {entry.specialist}</div>
      {entry.sickLeave && (
        <div>
          Sick leave: {entry.sickLeave.startDate} - {entry.sickLeave.endDate}
        </div>
      )}
    </div>
  );
};

export default OccupationalHealthcareEntry;