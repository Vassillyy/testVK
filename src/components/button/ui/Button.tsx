import {useAppDispatch} from '@/store/helpers'
import {openModal} from '@/store/modalSlice'
import styles from '../styles.module.sass'

const Button = () => {
  const dispatch = useAppDispatch()

  return (
    <button className={styles.addButton} onClick={() => dispatch(openModal())}>
      Добавить
    </button>
  )
}

export default Button
