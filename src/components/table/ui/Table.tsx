import {headers} from '../model/headers'
import styles from '../styles.module.sass'

const Table = () => {
  return (
    <table className={styles.table}>
      <thead>
        <tr>
          {headers.map((el, index) => {
            return (
              <th className={styles.table__colHeader} key={index}>
                {el}
              </th>
            )
          })}
        </tr>
      </thead>
      <tbody>
        <tr>
          {headers.map((el) => {
            return <td className={styles.table__col}>123</td>
          })}
        </tr>
      </tbody>
    </table>
  )
}

export default Table
