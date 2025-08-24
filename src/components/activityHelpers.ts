export function formatDuration(ms: number) {
  const totalSeconds = Math.floor(ms / 1000);
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  if (hours > 0) {
    return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(
      seconds,
    ).padStart(2, '0')}`;
  }

  return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
}

export function calculateProgress(elapsed: number, total: number) {
  if (total <= 0) return 0;
  return Math.min(100, (elapsed / total) * 100);
}

export function calculateSpotifyProgress(start?: Date, end?: Date) {
  if (!start || !end) return 0;
  const now = new Date();
  const elapsed = now.getTime() - start.getTime();
  const total = end.getTime() - start.getTime();
  return Math.min(100, (elapsed / total) * 100);
}
