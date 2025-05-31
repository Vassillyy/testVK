import React, {useEffect, useState} from 'react'
import {headers} from '../model/headers'
import {getUsersList} from '@/api/getUsersList'
import type {User} from '@/types/User'
import styles from '../styles.module.sass'

const Table = () => {
  const [data, setData] = useState<User[]>([])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const usersList: User[] = await getUsersList()
        setData(usersList)
      } catch (err) {
        console.error(err)
      }
    }

    fetchData()
  }, [])

  return (
    <table className={styles.table}>
      <thead>
        <tr>
          {headers.map((header, index) => {
            return (
              <th className={styles.table__colHeader} key={index}>
                {header.label}
              </th>
            )
          })}
        </tr>
      </thead>
      <tbody>
        {data?.length > 0
          ? data.map((item, rowIndex) => (
              <tr key={rowIndex}>
                {headers.map((header, colIndex) => (
                  <td className={styles.table__col} key={colIndex}>
                    {item[header.key] || '-'}
                  </td>
                ))}
              </tr>
            ))
          : null}
      </tbody>
    </table>
  )
}

export default Table
