import type {User} from './User'

export type HeaderItem = {
  key: keyof User
  label: string
}
