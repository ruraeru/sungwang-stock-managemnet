export function formatToTimeAgo(date: string): string {
  const dayInMs = 1000 * 60 * 60 * 24;
  const time = new Date(date).getTime();
  const now = new Date().getTime();
  const diff = Math.round((time - now) / dayInMs);

  const formatter = new Intl.RelativeTimeFormat("ko");

  return formatter.format(diff, "days");
}

// 숫자 형식 변환 유틸리티
export function parseNumber(value: unknown, defaultValue = 0): number {
  if (value === null || value === undefined) return defaultValue;

  if (typeof value === "number") return value;

  if (typeof value === "string") {
    const parsed = parseFloat(value.replace(/[^\d.-]/g, ""));
    return isNaN(parsed) ? defaultValue : parsed;
  }

  return defaultValue;
}

export function formatCurrency(value: number): string {
  return (
    new Intl.NumberFormat("ko-KR", {
      style: "decimal",
      minimumFractionDigits: 0,
    }).format(value) + "원"
  );
}
