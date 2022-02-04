import { useState, useEffect } from 'react'
import { supabase } from '../utils/supabaseClient'
import Signin from '../components/Signin'
import AllContestC from '../components/AllContest-connected'
import SimpleLayout from '../components/layout/simple'


/**
 * componant for start page, all competition.
 * @returns html code
 */
export default function Home() {
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
        {!session ? <Signin /> : <AllContestC key={session.user.id} session={session} />}
      </div>
    </SimpleLayout>

  )
}
