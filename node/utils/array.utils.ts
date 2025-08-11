export function sum(array: number[]): number {
  return array.reduce((total, item) => total + item, 0)
}
