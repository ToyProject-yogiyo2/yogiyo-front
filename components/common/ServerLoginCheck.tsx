'use server'
import { cookies } from 'next/headers';

const ServerLoginCheck = () => {
  const cookieStore = cookies()
  const theme = cookieStore.getAll()
  console.log(theme)
  return theme
}

export default ServerLoginCheck