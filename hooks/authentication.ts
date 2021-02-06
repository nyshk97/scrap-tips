import { useEffect } from 'react'
import { atom, useRecoilState } from 'recoil'
import { useRouter } from 'next/router'
import { User } from '../models/User'

const userState = atom<User>({
  key: 'user',
  default: null,
})

export function useAuthentication() {
  const [user, setUser] = useRecoilState(userState)
  const router = useRouter()
  useEffect(() => {
    if (user == null) {
      router.push('/login')
    }
  }, [])

  return user
}