import {useMemo, useState} from 'react'
import {useAppDispatch, useAppSelector} from '@/store/helpers'
import type {ErrorsType, User} from '@/types'
import {createUser} from '@/api'
import {closeModal} from '@/store/modalSlice'
import {generateId} from '../model/generateId'
import styles from '../styles.module.sass'

/** Начальные данные формы */
const initialData: User = {
  lastName: '',
  firstName: '',
  citizenship: '',
  birthDate: '',
  id: generateId(Date.now() % 1000000),
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

/** Начальные данные по ошибкам */
const initialErrors: ErrorsType = {
  lastName: '',
  firstName: '',
  birthDate: '',
  gender: '',
  citizenship: '',
  phone: '',
  email: ''
}

type Props = {
  onSuccess: () => void
}

const Modal = ({onSuccess}: Props) => {
  const [formData, setFormData] = useState<User>(initialData)
  const [errors, setErrors] = useState(initialErrors)

  const isOpen = useAppSelector((state) => state.modal.open)
  const dispatch = useAppDispatch()

  /** Делаем проверку что все обязательные поля заполнены */
  const isButtonActive = useMemo(() => {
    const {lastName, firstName, gender, citizenship, birthDate} = formData
    return (
      lastName.trim() &&
      firstName.trim() &&
      gender.trim() &&
      citizenship.trim() &&
      birthDate.trim()
    )
  }, [formData])

  if (!isOpen) return null

  /** При закрытии модалки удаляем данные */
  const clearData = () => {
    dispatch(closeModal())
    setFormData(initialData)
    setErrors(initialErrors)
  }

  /** Проверяем на наличие ошибок */
  const getFirstError = (): string | null => {
    for (const key in errors) {
      if (errors[key as keyof ErrorsType])
        return errors[key as keyof ErrorsType]
    }

    return null
  }

  /** Первая ошибка в списке */
  const firstErrorMessage: string | null = getFirstError()

  /** Отправляем данные на сервер и делаем очистку */
  const handleSubmit = async () => {
    const newErrors = {...errors}

    if (!formData.lastName) newErrors.lastName = 'Заполните поле "Фамилия"'
    if (!formData.firstName) newErrors.firstName = 'Заполните поле "Имя"'
    if (!formData.gender) newErrors.gender = 'Заполните поле "Пол"'
    if (!formData.citizenship)
      newErrors.citizenship = 'Заполните поле "Гражданство"'
    if (!formData.birthDate)
      newErrors.birthDate = ' Заполните поле "Дата рождения"'
    else {
      const dateRegex = /^(0[1-9]|[12][0-9]|3[01])\.(0[1-9]|1[0-2])\.(\d{4})$/
      if (!dateRegex.test(formData.birthDate))
        newErrors.birthDate = 'Некорректный формат даты'
    }
    if (formData.phone) {
      const phoneRegex = /^[+()\d\s-]{10,20}$/
      if (!phoneRegex.test(formData.phone))
        newErrors.phone = 'Некорректный номер телефона'
    }
    if (formData.email) {
      const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
      if (!emailRegex.test(formData.email))
        newErrors.email = 'Некорректный email'
    }

    setErrors(newErrors)

    const hasErrors: boolean = Object.values(newErrors).some(
      (error) => error !== ''
    )

    if (!hasErrors) {
      await createUser(formData)
      clearData()
      onSuccess()
    }
  }

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <h1 className={styles.modal__title}>Добавление нового пользователя</h1>
        <form className={styles.modal__form}>
          <div className={styles.modal__formRow}>
            <label className={styles.modal__formLabel} htmlFor="lastName">
              Фамилия*
            </label>
            <input
              className={styles.modal__formInput}
              onChange={(e) => {
                setFormData({...formData, lastName: e.target.value})
                setErrors({...errors, lastName: ''})
              }}
              value={formData.lastName}
              name="lastName"
            />
          </div>
          <div className={styles.modal__formRow}>
            <label className={styles.modal__formLabel} htmlFor="firstName">
              Имя*
            </label>
            <input
              className={styles.modal__formInput}
              onChange={(e) => {
                setFormData({...formData, firstName: e.target.value})
                setErrors({...errors, firstName: ''})
              }}
              value={formData.firstName}
              name="firstName"
            />
          </div>
          <div className={styles.modal__formRow}>
            <label className={styles.modal__formLabel} htmlFor="middleName">
              Отчество
            </label>
            <input
              className={styles.modal__formInput}
              onChange={(e) =>
                setFormData({...formData, middleName: e.target.value})
              }
              value={formData.middleName}
              name="middleName"
            />
          </div>
          <div className={styles.modal__formRow}>
            <label className={styles.modal__formLabel} htmlFor="gender">
              Пол*
            </label>
            <input
              className={styles.modal__formInput}
              onChange={(e) => {
                setFormData({...formData, gender: e.target.value})
                setErrors({...errors, gender: ''})
              }}
              value={formData.gender}
              name="gender"
            />
          </div>
          <div className={styles.modal__formRow}>
            <label className={styles.modal__formLabel} htmlFor="birthDate">
              Дата рождения*
            </label>
            <input
              className={styles.modal__formInput}
              placeholder="DD.MM.YYYY"
              onChange={(e) => {
                setFormData({...formData, birthDate: e.target.value})
                setErrors({...errors, birthDate: ''})
              }}
              value={formData.birthDate}
              name="birthDate"
            />
          </div>
          <div className={styles.modal__formRow}>
            <label className={styles.modal__formLabel} htmlFor="citizenship">
              Гражданство*
            </label>
            <input
              className={styles.modal__formInput}
              onChange={(e) => {
                setFormData({...formData, citizenship: e.target.value})
                setErrors({...errors, citizenship: ''})
              }}
              value={formData.citizenship}
              name="citizenship"
            />
          </div>
          <div className={styles.modal__formRow}>
            <label className={styles.modal__formLabel} htmlFor="city">
              Город
            </label>
            <input
              className={styles.modal__formInput}
              onChange={(e) => setFormData({...formData, city: e.target.value})}
              value={formData.city}
              name="city"
            />
          </div>
          <div className={styles.modal__formRow}>
            <label className={styles.modal__formLabel} htmlFor="address">
              Адрес
            </label>
            <input
              className={styles.modal__formInput}
              onChange={(e) =>
                setFormData({...formData, address: e.target.value})
              }
              value={formData.address}
              name="address"
            />
          </div>
          <div className={styles.modal__formRow}>
            <label className={styles.modal__formLabel} htmlFor="education">
              Образование
            </label>
            <input
              className={styles.modal__formInput}
              onChange={(e) =>
                setFormData({...formData, education: e.target.value})
              }
              value={formData.education}
              name="education"
            />
          </div>
          <div className={styles.modal__formRow}>
            <label className={styles.modal__formLabel} htmlFor="profession">
              Профессия
            </label>
            <input
              className={styles.modal__formInput}
              onChange={(e) =>
                setFormData({...formData, profession: e.target.value})
              }
              value={formData.profession}
              name="profession"
            />
          </div>
          <div className={styles.modal__formRow}>
            <label className={styles.modal__formLabel} htmlFor="experience">
              Стаж
            </label>
            <input
              className={styles.modal__formInput}
              onChange={(e) =>
                setFormData({...formData, experience: e.target.value})
              }
              value={formData.experience}
              name="experience"
            />
          </div>
          <div className={styles.modal__formRow}>
            <label className={styles.modal__formLabel} htmlFor="phone">
              Телефон
            </label>
            <input
              className={styles.modal__formInput}
              placeholder="Доступны +, (, ), -, 0-9"
              onChange={(e) => {
                setFormData({...formData, phone: e.target.value})
                setErrors({...errors, phone: ''})
              }}
              value={formData.phone}
              name="phone"
            />
          </div>
          <div className={styles.modal__formRow}>
            <label className={styles.modal__formLabel} htmlFor="email">
              Email
            </label>
            <input
              className={styles.modal__formInput}
              onChange={(e) => {
                setFormData({...formData, email: e.target.value})
                setErrors({...errors, email: ''})
              }}
              value={formData.email}
              name="email"
            />
          </div>
          <div className={styles.modal__formRow}>
            <label className={styles.modal__formLabel} htmlFor="socialNetwork">
              Телеграм
            </label>
            <input
              className={styles.modal__formInput}
              onChange={(e) =>
                setFormData({...formData, socialNetwork: e.target.value})
              }
              value={formData.socialNetwork}
              name="socialNetwork"
            />
          </div>
        </form>
        <div className={styles.modal__blockButton}>
          {firstErrorMessage && (
            <div className={styles.modal__error}>{firstErrorMessage}</div>
          )}
          <button className={styles.modal__buttonBack} onClick={clearData}>
            Назад
          </button>
          <button
            className={styles.modal__buttonAdd}
            onClick={handleSubmit}
            disabled={!isButtonActive}
          >
            Добавить
          </button>
        </div>
      </div>
    </div>
  )
}

export default Modal
