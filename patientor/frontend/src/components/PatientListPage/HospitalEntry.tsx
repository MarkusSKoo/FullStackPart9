import type { HospitalEntry } from "../../types";
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';

type HospitalProps = {
  entry: HospitalEntry;
};

const HospitalEntry = ({ entry }: HospitalProps) => {
  return (
    <div>
      <div>{entry.date} <LocalHospitalIcon /></div>
      <i>{entry.description}</i>
      <div>Discharged at: {entry.discharge.date} with criterion: {entry.discharge.criteria}</div>
      <div>Diagnosed by {entry.specialist}</div>
    </div>
  );
};

export default HospitalEntry;