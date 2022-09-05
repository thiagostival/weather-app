/**
 * @description
 * - It returns the value of the environment variable that the name is passed as a parameter
 * - Function needed for the tests to run.
 * - In the test environment we don't have access to the external elements of the
 * component, so this function becomes necessary, because we can mock it up in
 * the tests to return something specific;
 *
 * @example getEnvs('VITE_API_URL') -> 'https://api.openweathermap.org'
 */
export function getEnvs(key: string) {
  return import.meta.env[key];
}

/**
 * @description
 * - This function returns the current or parameterized date in the platform's
 * default display format.
 *
 * @example
 * getFormattedDate() -> 12:00 - Sunday, 04 Sep
 * getFormattedDate(1662378153) -> 08:42 - Monday, 05 Sep
 * getFormattedDate('2022-06-28 10:00') -> 10:00 - Thursday, 28 Jun
 */
export function getFormattedDate(value?: string | number) {
  const currentDate = value ? new Date(value) : new Date();
  const dayOfTheWeek = currentDate.toLocaleDateString('en-US', {
    weekday: 'long',
  });
  const month = currentDate.toLocaleDateString('en-US', {
    month: 'short',
  });

  let date: string | number = currentDate.getDate();
  date = date > 9 ? date : `0${date}`;

  let hour: string | number = currentDate.getHours();
  hour = hour > 9 ? hour : `0${hour}`;

  let minutes: string | number = currentDate.getMinutes();
  minutes = minutes > 9 ? minutes : `0${minutes}`;

  const formattedDate = `${hour}:${minutes} - ${dayOfTheWeek}, ${date} ${month}`;

  return formattedDate;
}
