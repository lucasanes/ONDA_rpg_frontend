export function capitalizeWord(input: string): string {
  if (!input) return input;
  return input
    .split(' ')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(' ');
}
