export const getPrecision = (
  errors: number,
  keyPressCounter: number
): string => {
  return (100 - (errors / keyPressCounter || 0) * 100).toFixed(2);
};

export const getBpm = (keyPressCounter: number, timer: number): number => {
  return Math.round(keyPressCounter / (timer / 60));
};

export const getPoints = (
  errors: number,
  keyPressCounter: number,
  timer: number
) => {
  const pureAccuracy = 1 - (errors / keyPressCounter || 0);
  const malus = calculateMalus(errors);
  return Math.ceil(getBpm(keyPressCounter, timer) * pureAccuracy * malus);
};

const calculateMalus = (x: number): number => {
  if (x === 0) return 1.1;
  if (x === 1) return 0.9;
  if (x === 2) return 0.75;
  return 1 / Math.log2(x);
};
