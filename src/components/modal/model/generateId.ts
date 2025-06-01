/** Генерим случайный id */
export const generateId = (num: number): string => {
  return `#${num.toString().padStart(6, '0')}`
}
