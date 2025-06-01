import React, {useEffect, useRef, useState} from 'react'
import {startLoading, stopLoading} from '@/store/loadingDataSlice'
import {useAppDispatch, useAppSelector} from '@/store/helpers'
import {headers} from '../model/headers'
import {getUsersList} from '@/api/getUsersList'
import type {User} from '@/types/User'
import styles from '../styles.module.sass'

type Props = {
  reloadTrigger: number
}

const Table = ({reloadTrigger}: Props) => {
  const [users, setUsers] = useState<User[]>([])
  const [page, setPage] = useState<number>(1)
  const tableContainerRef = useRef<HTMLTableElement | null>(null)
  const prevScrollBottomRef = useRef<number>(0)
  const hasMoreData = useRef<boolean>(true)

  const dispatch = useAppDispatch()
  const isLoading = useAppSelector((state) => state.loading.isLoading)

  useEffect(() => {
    const fetchData = async () => {
      if (hasMoreData.current) {
        dispatch(startLoading())
        try {
          const usersList: User[] = await getUsersList(page)

          if (usersList.length) {
            setUsers((prevUsers) => [...prevUsers, ...usersList])
          } else hasMoreData.current = false
        } catch (err) {
          console.error(err)
        } finally {
          dispatch(stopLoading())
        }
      }
    }

    fetchData()
  }, [page])

  useEffect(() => {
    setUsers([])
    setPage(1)
    hasMoreData.current = true
  }, [reloadTrigger])

  const handleScroll = () => {
    if (hasMoreData.current && !isLoading) {
      const container: HTMLTableElement | null = tableContainerRef.current

      if (container) {
        const currentScrollBottom: number = Math.floor(
          container.scrollHeight - container.scrollTop
        )

        if (currentScrollBottom === prevScrollBottomRef.current) return

        prevScrollBottomRef.current = currentScrollBottom
        if (currentScrollBottom <= container.clientHeight + 10) {
          setPage((prev) => prev + 1)
        }
      }
    }
  }

  return (
    <table
      className={styles.table}
      ref={tableContainerRef}
      onScroll={handleScroll}
    >
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
        {users.map((item, rowIndex) => (
          <tr key={rowIndex}>
            {headers.map((header, colIndex) => (
              <td className={styles.table__col} key={colIndex}>
                {item[header.key] || '-'}
              </td>
            ))}
          </tr>
        ))}

        {isLoading
          ? Array.from({length: 3}).map((_, index) => (
              <tr key={index}>
                <td colSpan={100}>
                  <div className={styles.table__skeletonLine}></div>
                </td>
              </tr>
            ))
          : null}
      </tbody>
    </table>
  )
}

export default Table
