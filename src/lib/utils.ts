export function formatDate(dateString: string) {
  const date = new Date(dateString);
  return date.toLocaleDateString("es-DO", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
}

export function formatNumber(num: string | number) {
  return Number(num).toFixed(2);
}
