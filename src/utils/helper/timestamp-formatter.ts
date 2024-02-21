export function formatTimestamp(timestamp: number): { monthName: string; fullDate: string } {
  const date = new Date(timestamp);

  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const month = monthNames[date.getMonth()];

  const day = String(date.getDate()).padStart(2, "0");
  const formattedMonth = String(date.getMonth() + 1).padStart(2, "0"); // Month is zero-based
  const year = date.getFullYear();

  const fullDate = `${day}/${formattedMonth}/${year}`;

  return {
    monthName: month,
    fullDate: fullDate,
  };
}
