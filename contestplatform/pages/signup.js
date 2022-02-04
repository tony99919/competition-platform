import { useState, useEffect } from 'react'
import { supabase } from '../utils/supabaseClient'
import Auth from '../components/Auth'
import Account from '../components/Account'
import SimpleLayout from '../components/layout/simple'

/**
 * componant for sign up.
 * @returns html code
 */
export default function signup() {
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
        {!session ? <Auth /> : <Account key={session.user.id} session={session} />}
      </div>
    </SimpleLayout>

  )
}
