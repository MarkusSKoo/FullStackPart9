import MedicalServicesIcon from '@mui/icons-material/MedicalServices';
import FavoriteIcon from '@mui/icons-material/Favorite';
import type { HealthCheckEntry } from "../types";

type HealthCheckProps = {
  entry: HealthCheckEntry
};

const colors: Record<number, string> = {
  0: "green",
  1: "yellow",
  2: "orange",
  3: "red"
};

const HealthCheckEntry = ({ entry }: HealthCheckProps) => {
  return (
    <div>
      <div>{entry.date} <MedicalServicesIcon /></div>
      <i>{entry.description}</i><br />
      <FavoriteIcon sx= {{ color: colors[entry.healthCheckRating]}}/>
      <div>Diagnosed by {entry.specialist}</div>
    </div>
  );
};

export default HealthCheckEntry;