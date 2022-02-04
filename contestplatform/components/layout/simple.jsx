import Navbar from '../navbar/navbar'
import NavbarC from '../navbar/navbar-connected'
import React from 'react'
import { useEffect, useState } from 'react'
import { supabase } from '../../utils/supabaseClient'

/**
 * componant for simple structure
 * @param {*} props 
 * @returns html code for simple structure
 */
export default function SimpleLayout(props) {
  // data hook
  const mylib = require('../../Mylib')
  const [session, setSession] = useState(null)
  useEffect(() => {
    // get session from mylib
    setSession(mylib.getSession())

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
    })
  }, [])
  return (
    <>
      {!session ? <Navbar /> : <NavbarC key={session.user.id} session={session} />}
      <main role="main">
        {props.preContainer && props.preContainer}
        <div className="album py-5 bg-dark">
          <div className="container">
            {props.children}
          </div>
        </div>
      </main>
    </>
  )
}
