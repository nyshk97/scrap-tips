import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { useAuthentication } from '../hooks/authentication'
import Link from 'next/link'
import firebase from 'firebase/app'

export default function SignUp() {
  const router = useRouter()
  const { user } = useAuthentication()
  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')

  useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      user && router.push('/')
    })
  }, [])

  const createUser = async (e) => {
    e.preventDefault()
    try {
      await firebase.auth().createUserWithEmailAndPassword(email, password)
      router.push('/login')
    } catch (err) {
      alert(err.message)
    }
  }

  return (
    <div className="wrapper">
      <h1>Sign up</h1>
      <form className="auth" onSubmit={createUser}>
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
          SignUp
        </button>
      </form>
      <Link href="/login">
        <a className="auth-link">Login</a>
      </Link>
    </div>
  )
}