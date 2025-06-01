import type {User} from '@/types/User'

/** Получаем список пользователей */
export const getUsersList = async (step: number = 0): Promise<User[]> => {
  try {
    const response = await fetch('http://localhost:3000/get')

    if (!response.ok) {
      throw new Error(`Статус ошибки: ${response.status}`)
    }

    const json: User[] = await response.json()

    return await new Promise<User[]>((resolve) => {
      setTimeout(() => {
        resolve(json.slice(step, step + 10))
      }, 2000)
    })
  } catch (error) {
    console.error('Ошибка при получении данных:', error)
    throw error
  }
}
