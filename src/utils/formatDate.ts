export function formatDate(isoString: string): string {
  return new Date(isoString).toLocaleDateString("tr-TR", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}