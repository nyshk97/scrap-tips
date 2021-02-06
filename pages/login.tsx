import firebase from 'firebase/app'
import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { atom, useRecoilState } from 'recoil'
import { User } from '../models/User'

const userState = atom<User>({
  key: 'user',
  default: null,
})

export default function Login() {
  const router = useRouter()
  const [user, setUser] = useRecoilState(userState)
  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')

  firebase.auth().onAuthStateChanged(function (firebaseUser) {
    if (firebaseUser) {
      const loginUser: User = {
        uid: firebaseUser.uid,
        name: 'hoge',
      }
      setUser(loginUser)
      router.push('/')
    } else {
      setUser(null)
    }
  })

  const logIn = async (e) => {
    e.preventDefault()
    try {
      await firebase.auth().signInWithEmailAndPassword(email, password)  
    } catch (err) {
      alert(err.message)
    }
  }

  return (
    <div className="wrapper">
      <h1>Login</h1>
      <form className="auth" onSubmit={logIn}>
        <div>
          <label htmlFor="email" className="auth-label">
            Email:{' '}
          </label>
          <input
            id="email"
            className="auth-input"
            type="email"
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="mt-2">
          <label htmlFor="password" className="auth-label">
            Password:{' '}
          </label>
          <input
            id="password"
            className="auth-input"
            type="password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button className="auth-btn" type="submit">
          Login
        </button>
      </form>
      <Link href="/signup">
        <a className="auth-link">signup</a>
      </Link>
    </div>
  )
}
