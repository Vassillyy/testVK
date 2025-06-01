import type {User} from '@/types'

/** Создание пользователя */
export const createUser = async (userData: User) => {
  try {
    const response = await fetch('http://localhost:3000/get', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(userData)
    })

    if (!response.ok) {
      throw new Error(`Статус ошибки: ${response.status}`)
    }

    await response.json()
  } catch (error) {
    console.error('Ошибка при получении данных:', error)
    throw error
  }
}
