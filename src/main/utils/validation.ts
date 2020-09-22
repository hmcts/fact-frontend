export const hasProperty = (actual: {}, expected: string): boolean => {
  return expected in actual;
};

export const isEmpty = (value: string): boolean => {
  return value === undefined || value === '';
};
