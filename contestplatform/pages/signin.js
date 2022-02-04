import { useState, useEffect } from 'react'
import { supabase } from '../utils/supabaseClient'
import Account from '../components/Account'
import Signin from '../components/Signin'
import SimpleLayout from '../components/layout/simple'

/**
 * componant for sign in.
 * @returns html code
 */
export default function Login() {
  const [session, setSession] = useState(null)

  /**
   * useEffect retrives session.
   */
  useEffect(() => {
    setSession(supabase.auth.session())

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
    })
  }, [])

  return (
    <SimpleLayout>
      <div style={{ padding: '50px 0 500px 0' }}>
        {!session ? <Signin /> : <Account key={session.user.id} session={session} />}
      </div>
    </SimpleLayout>

  )
}
