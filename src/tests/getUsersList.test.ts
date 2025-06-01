import {getUsersList} from '@/api/getUsersList'
import type {User} from '@/types/User'

global.fetch = jest.fn()

describe('getUsersList', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  it('должен отправлять GET-запрос и возвращать список пользователей', async () => {
    const mockUsers: User[] = [
      {
        lastName: 'Иванов',
        firstName: 'Кирилл',
        middleName: 'Иванович',
        gender: 'Мужской',
        birthDate: '01.01.1990',
        citizenship: 'Россия',
        city: 'Москва',
        address: 'ул. Лермонтова, д. 2',
        id: '#54321',
        phone: '+7 (495) 765-43-21',
        email: 'ivanov@example.com',
        profession: 'Дизайнер',
        experience: '',
        education: 'Высшее',
        socialNetwork: '@xxqw'
      }
    ]

    ;(fetch as jest.Mock).mockResolvedValue({
      ok: true,
      status: 200,
      json: async () => ({
        pages: 1,
        data: mockUsers
      })
    })

    const users = await getUsersList(1)

    expect(fetch).toHaveBeenCalledWith('http://localhost:3000/get?_page=1')
    expect(users).toEqual(mockUsers)
  })

  it('должен выбрасывать ошибку при неуспешном ответе', async () => {
    ;(fetch as jest.Mock).mockResolvedValue({
      ok: false,
      status: 500
    })

    await expect(getUsersList(1)).rejects.toThrow('Статус ошибки: 500')
  })

  it('должен возвращать пустой массив, если страница больше доступных страниц', async () => {
    ;(fetch as jest.Mock).mockResolvedValue({
      ok: true,
      status: 200,
      json: async () => ({
        pages: 1,
        data: []
      })
    })

    const users = await getUsersList(2)

    expect(users).toEqual([])
  })
})
