export function shuffle<T>(target: T[]): T[] {
  const array = [...target];

  for (let i = target.length - 1; i > 0; i -= 1) {
    const r = Math.floor(Math.random() * (i + 1));
    const tmp = array[i];
    array[i] = array[r];
    array[r] = tmp;
  }

  return array;
}
