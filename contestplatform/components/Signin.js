import Link from 'next/link';
import { useState } from 'react'

/**
 * componant for sign in
 * @returns html code for sign in
 */
export default function Signin() {
  const Swal = require('sweetalert2')
  const mylib = require('../Mylib')
  // data hook
  const [loading, setLoading] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  /**
   * handle login after click on the button to connect
   * @param {*} email 
   * @param {*} password 
   */
  const handleLogin = async (email, password) => {
    try {
      setLoading(true)
      const { error } = await mylib.signIn(email, password)
      if (error) throw error
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: "Please enter valide credential",
      })
    } finally {
      setLoading(false)
    }
  }

  /**
   * handle login after click on the button to connect
   * @param {*} provider 
   */
  const handleOAuthSignIn = async (provider) => {
    setLoading(true);
    const { error } = await mylib.signInWithProvider(provider)
    if (error) {
      setMessage({ type: 'error', content: error.message });
    }
    setLoading(false);
  };



  return (
    <div className="row flex flex-center">
      <div className="col-8 form-widget">
        <h1 className="header">Login page</h1>

        <div>
          <input
            className="inputField"
            type="email"
            placeholder="Your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <div>

            <input
              className="inputField mt-1"
              type="password"
              placeholder="Your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button
            onClick={(e) => {
              e.preventDefault()
              handleLogin(email, password)
            }}
            className="button block mt-3"
            disabled={loading}
          >
            <span>{loading ? 'Loading' : 'Sign IN'}</span>
          </button>
          <span className="pt-1 text-center text-sm">
            <br />
            <span className="text-accents-7">Don't have an account?</span>
            {` `}
            <Link href="/signup">
              <a className="text-accent-9 font-bold hover:underline cursor-pointer">
                Sign up.
              </a>
            </Link>
          </span>
          <div className="text-right">
            {/* link for google auth */}
            <a
              type="submit"
              disabled={loading}
              onClick={() => handleOAuthSignIn('google')}
            >
              <div className="text-sm text-google"> OR Continue with Google</div>
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
