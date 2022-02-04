import { useState, useEffect } from 'react'
import { supabase } from '../utils/supabaseClient'
import AllContestC from '../components/AllContest-connected'
import AllContest from '../components/AllContest'
import SimpleLayout from '../components/layout/simple'

/**
 * componant for start page, all competition.
 * @returns html code
 */
export default function Home() {
  const mylib = require('../Mylib')
  const [session, setSession] = useState(null)


  /**
   * useEffect retrives session.
   */
  useEffect(() => {
    setSession(mylib.getSession())

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
    })
  }, [])

  return (
    <SimpleLayout>
      <div style={{ padding: '50px 0 500px 0' }}>
        {!session ? <AllContest /> : <AllContestC key={session.user.id} session={session} />}
      </div>
    </SimpleLayout>

  )

}


