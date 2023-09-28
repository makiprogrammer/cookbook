export interface TimeSpan {
  seconds?: number;
  minutes?: number;
  hours?: number;
}

export function formatTimeSpan({
  seconds = 0,
  minutes = 0,
  hours = 0,
}: TimeSpan) {
  let totalSeconds = seconds + 60 * minutes + 3600 * hours;
  let final: TimeSpan = {};

  if (totalSeconds > 3600) {
    final.hours = Math.floor(totalSeconds / 3600);
    totalSeconds = totalSeconds % 3600;
  }
  if (totalSeconds > 60) {
    final.minutes = Math.floor(totalSeconds / 60);
    totalSeconds = totalSeconds % 60;
  }
  final.seconds = totalSeconds;

  const ordered: { key: keyof TimeSpan; label: string }[] = [
    { key: "hours", label: "h" },
    { key: "minutes", label: "min" },
    { key: "seconds", label: "s" },
  ];
  return ordered
    .filter(({ key }) => final[key] !== undefined && final[key] !== 0)
    .map(({ key, label }) => `${final[key]} ${label}`)
    .join(" ");
}
