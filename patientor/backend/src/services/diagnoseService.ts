import data from "../data/diagnoses.ts";
import type { DiagnoseEntry } from "../types.ts";

const getDiagnoses = (): DiagnoseEntry[] => {
  return data;
};

const addDiagnose = () => {
  return null;
};

export default {
  getDiagnoses,
  addDiagnose
};
