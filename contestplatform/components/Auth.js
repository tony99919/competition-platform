import Link from 'next/link';
import { useState } from 'react'

/**
 * show connection page.
 * @returns html code for the authentifaction
 */
export default function Auth() {
  const Swal = require('sweetalert2')
  const mylib = require('../Mylib')
  // data hook
  const [loading, setLoading] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')


  /**
   * handle login after click on the button to connect.
   * @param {string} email 
   * @param {string} password 
   */
  const handleLogin = async (email, password) => {
    try {
      setLoading(true)
      const { error } = await mylib.signUp(email, password)
      if (error) throw error
      Swal.fire("Check your email for confirm your Signup!")
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: error.error_description || error.message,
      })
    } finally {
      setLoading(false)
    }
  }

  /**
   * get magic link for authentification.
   */
  async function getMagicLink() {
    try {
      if (email == '') {
        Swal.fire("Please enter valide email.")
        return
      }
      const { error } = mylib.signUpWithEmail(email)

      if (error) {
        throw error
      }
      Swal.fire("Email sent correctly.")
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: error.message,
      })
    }
  }

  return (
    <div className="row flex flex-center">
      <div className="col-8 form-widget">
        <h1 className="header">Registration page</h1>
        <div>
          <input
            className="inputField"
            type="email"
            placeholder="Your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            className="inputField mt-1"
            type="password"
            placeholder="Your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <a className="resetPassword" onClick={() => getMagicLink()} >
            Get Magic Link (one-time login with email)
          </a>
        </div>
        <div>
          <button
            onClick={(e) => {
              e.preventDefault()
              handleLogin(email, password)
            }}
            className="button block mt-1"
            disabled={loading}
          >
            <span>{loading ? 'Loading' : 'Sign UP'}</span>
          </button>
          <span className="pt-1 text-center text-sm">
            <span className="text-accents-7">Do you have an account?</span>
            {` `}
            <Link href="/signin">
              <a className="text-accent-9 font-bold hover:underline cursor-pointer">
                Sign in.
              </a>
            </Link>
          </span>
        </div>
      </div>
    </div>
  )
}
