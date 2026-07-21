import type { ExerciseParams } from "./types.ts";

const isNotNumber = (argument: unknown): boolean =>
  isNaN(Number(argument));

export const parseArgumentsForBmiCalculator = (args: string[]): [number, number] => {
  if (args.length < 4) throw new Error('Not enough arguments');
  if (args.length > 4) throw new Error('Too many arguments');
  if (isNotNumber(args[2]) || isNotNumber(args[3])) throw new Error('Wrong argument type');

  return [Number(args[2]), Number(args[3])];
};

export const parseArgumentsForCalculateExercises = (args: string[]): [number[], number] => {
  if (args.length < 4) throw new Error('Not enough arguments');

  const target = Number(args[2]);
  if (isNotNumber(target)) throw new Error(`First argument "target" must be a number, got "${args[2]}"! `);

  const exercises = args.slice(3).map(Number);
  exercises.forEach((element, index) => {
    if (isNotNumber(element)) {
        throw new Error(`The argument at index ${index} is of wrong type, expected a number! `);
      }
    }
  );

  return [exercises, target];
};

export const validateBmiValues = (height: unknown, weight: unknown): boolean => {
  if (isNotNumber(height) || isNotNumber(weight) || Number(height) <= 0 || Number(weight) <= 0) {
    return false;
  }
  return true;
};

export const validateReqParams = (params: unknown): params is ExerciseParams => {
  if (typeof(params) !== "object" || params === null) {
    return false;
  }

  if (!Object.hasOwn(params, "target") || !Object.hasOwn(params, "daily_exercises")) {
    return false;
  }

  const body = params as {
    target: unknown,
    daily_exercises: unknown
  };

  const target: unknown = body.target;
  const daily_exercises: unknown = body.daily_exercises;

  if (isNotNumber(target)) {
    return false;
  }
  if (!Array.isArray(daily_exercises)) {
    return false;
  } 
  if (daily_exercises.some(exercise => isNotNumber(exercise)) ) {
      return false;
  }
  return true;
};
