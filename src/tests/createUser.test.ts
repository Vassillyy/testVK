import {createUser} from '@/api/createUser'

global.fetch = jest.fn()

describe('createUser', () => {
  it('должен отправлять POST-запрос и обрабатывать ответ', async () => {
    ;(fetch as jest.Mock).mockResolvedValue({
      ok: true,
      status: 200,
      json: async () => ({message: 'success'})
    })

    const userData = {
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

    await createUser(userData)

    expect(fetch).toHaveBeenCalledWith('http://localhost:3000/get', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(userData)
    })
  })

  it('должен выбрасывать ошибку при неуспешном ответе', async () => {
    ;(fetch as jest.Mock).mockResolvedValue({
      ok: false,
      status: 500
    })

    const userData = {
      lastName: '',
      firstName: '',
      citizenship: '',
      birthDate: '',
      id: '',
      middleName: '',
      address: '',
      city: '',
      education: '',
      email: '',
      experience: '',
      gender: '',
      phone: '',
      profession: '',
      socialNetwork: ''
    }

    await expect(createUser(userData)).rejects.toThrow('Статус ошибки: 500')
  })
})
