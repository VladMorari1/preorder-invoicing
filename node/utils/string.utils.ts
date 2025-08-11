export function getOrderId(id: string): string {
  const regex = /-(\d+)-/
  const match = regex.exec(id)
  return match?.length ? match[1] : ''
}
