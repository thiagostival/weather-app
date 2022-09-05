export function getEnvs(key: string) {
  return import.meta.env[key];
}

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
