// import firebase from 'firebase/app'
import { useEffect } from 'react'
import { atom, useRecoilState } from 'recoil'
import { useRouter } from 'next/router'
import { User } from '../models/User'

const userState = atom<User>({
  key: 'user',
  default: null,
})

export function useAuthentication() {
  const [user] = useRecoilState(userState)
  const router = useRouter()
  // useEffect(() => {
  //   if (user !== null) {
  //     return
  //   }
    
  //   firebase
  //     .auth()
  //     .signInAnonymously()
  //     .catch(function (error) {
  //       // Handle Errors here.
  //       console.error(error)
  //     })

  //   firebase.auth().onAuthStateChanged(function (firebaseUser) {
  //     if (firebaseUser) {
  //       setUser({
  //         uid: firebaseUser.uid,
  //         name: 'hoge'
  //       })
  //     } else {
  //       // User is signed out.
  //       setUser(null)
  //     }
  //   })
  // }, [])
  useEffect(() => {
    if (user == null) {
      router.push('/login')
    }
  }, [])

  return { user }
}