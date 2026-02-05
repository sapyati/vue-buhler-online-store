export const formatHeaderDate = (date: Date): string => {
  const month = date.toLocaleDateString('en-US', { month: 'short' });
  const day = String(date.getDate()).padStart(2, '0');
  const year = String(date.getFullYear()).slice(-2);

  const time = date.toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: true
  });

  return `${month}/${day}/${year}, ${time}`;
};