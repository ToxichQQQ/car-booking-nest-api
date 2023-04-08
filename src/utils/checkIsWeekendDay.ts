export const checkIsWeekendDay = (day) => {
  const date = new Date(day);

  return date.getDay() === 6 || date.getDay() === 7;
};
