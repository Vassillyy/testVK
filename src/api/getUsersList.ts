import type {User} from '@/types'

/** Получаем список пользователей */
export const getUsersList = async (page: number = 1): Promise<User[]> => {
  try {
    const response = await fetch(`http://localhost:3000/get?_page=${page}`)

    if (!response.ok) {
      throw new Error(`Статус ошибки: ${response.status}`)
    }

    const json = await response.json()

    return await new Promise<User[]>((resolve) => {
      setTimeout(() => {
        if (page <= json.pages) resolve(json.data)
        else resolve([])
      }, 2000)
    })
  } catch (error) {
    console.error('Ошибка при получении данных:', error)
    throw error
  }
}
