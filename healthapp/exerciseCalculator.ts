import { parseArgumentsForCalculateExercises } from "./utils.ts";

interface Stats { 
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
}

interface Rating {
  rating: number;
  ratingDescription: string;
}

const calculateRating = (target: number, actual: number): Rating => {
  if (target <= 0) {
    throw new Error("Target too small");
  }

  const difference: number = target - actual;

  if ( difference > 0.5) {
    return {
      rating: 1,
      ratingDescription: 'bad'
    };
  } else if (difference > 0) {
    return {
      rating: 2,
      ratingDescription: 'not too bad but could be better'
    };
  } else {
    return {
      rating: 3,
      ratingDescription: 'you did excellent'
    };
  }
};

export const calculateExercises = (exercises: number[], target: number): Stats => {
  const periodLength = exercises.length;
  const trainingDays = exercises.filter(day => day > 0).length;
  const average = exercises.reduce((prev, curr) => prev + curr, 0) / periodLength;
  const success = average >= target;
  const { rating, ratingDescription } = calculateRating(target, average);
  
  return {
    periodLength,
    trainingDays,
    success,
    rating,
    ratingDescription,
    target,
    average,
  };
};

if (process.argv[1] === import.meta.filename) {
    try { 
    const [exercises, target] = parseArgumentsForCalculateExercises(process.argv);
    console.log(calculateExercises(exercises, target));
    } catch (error: unknown) {
        let errorMessage = 'Something went wrong! ';
        if (error instanceof Error) {
        errorMessage += 'Error: ' + error.message;
        }
        console.log(errorMessage);
    }
}
