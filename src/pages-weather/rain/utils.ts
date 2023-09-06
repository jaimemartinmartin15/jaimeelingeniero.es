type DividedDate = { day: number; month: number; year: number };

export function compareDates(dateA: DividedDate, dateB: DividedDate) {
  if (dateA.year < dateB.year) return -1;
  if (dateA.year > dateB.year) return 1;

  if (dateA.month < dateB.month) return -1;
  if (dateA.month > dateB.month) return 1;

  if (dateA.day < dateB.day) return -1;
  if (dateA.day > dateB.day) return 1;

  return 0;
}
