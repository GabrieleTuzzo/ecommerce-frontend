// Input: "2025-12-01T11:18:03.329737"
// Output: "01/12/2025"
export const formatDate = (dateString) => {
  if (!dateString) return "";

  // Normalize fractional seconds (keep only 3 digits for milliseconds)
  const [dateAndTime, fractional] = dateString.split(".");
  const ms = fractional ? fractional.slice(0, 3) : "000";
  const normalized = `${dateAndTime}.${ms}`;

  const dateObj = new Date(normalized);
  if (isNaN(dateObj.getTime())) return dateString; // fallback if invalid

  return dateObj.toLocaleDateString("it-IT", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
};
