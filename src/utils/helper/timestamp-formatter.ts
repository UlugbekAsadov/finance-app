export function formatTimestamp(timestamp: number): string {
  const date = new Date(timestamp);

  const day = date.getDate().toString().padStart(2, "0");
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const year = date.getFullYear();

  // Format the date as dd/mm/yyyy
  return `${day}/${month}/${year}`;
}
