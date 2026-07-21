import { parseArgumentsForBmiCalculator } from "./utils.ts";

export const calculateBmi = (height: number, weight: number): string => {
  if (weight <= 0 || height <= 0) {
    throw new Error("Values must be positive numbers");
  }

  const heightInMetres = height / 100;
  const bmi = weight / (heightInMetres ** 2);

  if (bmi < 18.5) {
    return "Underweight range";
  } else if (bmi < 25) {
    return "Normal range";
  } else if (bmi < 30) {
    return "Overweight range";
  } else {
    return "Obese range";
  }
};

if (process.argv[1] === import.meta.filename) {
  try {
  const [height, weight] = parseArgumentsForBmiCalculator(process.argv);
  console.log(calculateBmi(height, weight));
  } catch (error: unknown) {
    let errorMessage = 'Something went wrong! ';
    if (error instanceof Error) {
      errorMessage += 'Error: ' + error.message;
    }
    console.log(errorMessage);
  }
};