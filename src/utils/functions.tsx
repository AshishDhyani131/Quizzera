export function shuffle<T>(data: T[]): Array<T> {
  const newData = [...data];
  for (let i = newData.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    const temp = newData[j];
    newData[j] = newData[i];
    newData[i] = temp;
  }
  return newData;
}
