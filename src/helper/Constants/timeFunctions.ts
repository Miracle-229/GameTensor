/* eslint-disable no-restricted-globals */
function isValidDate(dateString: string) {
  const date = new Date(dateString);
  return !isNaN(date.getTime());
}

export function formatDateLink(isoDateString: string) {
  if (!isValidDate(isoDateString)) {
    console.error('Invalid date string:', isoDateString);
    return 'Invalid Date';
  }

  const date = new Date(isoDateString);

  const formattedDate = new Intl.DateTimeFormat('ru-RU', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  }).format(date);

  return formattedDate.replace(/\//g, '.').replace(/,/, '');
}
