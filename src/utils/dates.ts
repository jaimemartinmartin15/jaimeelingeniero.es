/**
 * Takes a date and calculates how many years have passed to today
 *
 * @param birthDate
 * @returns Age in years
 */
export function calculateCurrentAge(birthDate: Date) {
  const today = new Date();
  let age = today.getFullYear() - birthDate.getFullYear();
  const month = today.getMonth() - birthDate.getMonth();
  if (month < 0 || (month === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }
  return age;
}

export const MONTHS = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];

/**
 * @param month Month index: January 0, February 1, ...
 * @param year Year number
 * @returns The number of days in the month of the year
 */
export function getNumberOfDaysInMonth(month: number, year: number): number {
  // by using 0 as the day it will give us the last day of the prior month
  return new Date(year, month + 1, 0).getDate();
}
