export const getDifferenceInDays = (firstDay, secondDay) => {
  const diffInMs = Math.abs(firstDay - secondDay);
  return diffInMs / (1000 * 60 * 60 * 24);
};
