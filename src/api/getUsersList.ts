import type {User} from '@/types/User'

/** Получаем список пользователей */
export const getUsersList = async (): Promise<User[]> => {
  try {
    const response: Response = await fetch('http://localhost:3000/get')

    if (!response.ok) {
      throw new Error(`Статус ошибки: ${response.status}`)
    }

    return await response.json()
  } catch (error) {
    console.error('Ошибка при получении данных:', error)
    throw error
  }
}
