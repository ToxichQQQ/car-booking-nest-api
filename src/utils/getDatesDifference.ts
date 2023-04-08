export const getDatesDifference = (startDate: Date, endDate: Date) => {
  // @ts-ignore
  const diffTime = Math.abs(endDate - startDate);
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  return diffDays;
};
