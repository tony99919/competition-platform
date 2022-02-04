import { useState, useEffect } from 'react'
/**
 * componant for loading and editing account
 * @param {*} session 
 * @returns html code
 */
export default function Account({ session }) {
  const Swal = require('sweetalert2')
  const mylib = require('../Mylib')
  // data hook
  const [loading, setLoading] = useState(true)
  const [name, setName] = useState(null)
  const [firstname, setFirstname] = useState(null)
  const [username, setUsername] = useState(null)


  /**
   * useEffect method for loading profile and save session.
   */
  useEffect(() => {
    getProfile()
  }, [session])

  /**
   * retrives profile.
   */
  async function getProfile() {
    try {
      setLoading(true)
      const user = mylib.getUserConnected()

      let { data, error } = await mylib.getPlayerProfile(user.id)
      console.log(data)
      if (data.length == 0) {
        return
      }

      if (error) {
        //throw error
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: error.error_description || error.message,
        })
      }

      if (data) {
        setUsername(data.at(0).username)
        setName(data.at(0).name)
        setFirstname(data.at(0).firstname)
      }
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: error.message,
      })
    } finally {
      setLoading(false)
    }
  }


  /**
 * update profile from supabase
 */
  async function updateProfile() {
    if (username != "" && name != "" && firstname != "") {
      try {
        setLoading(true)
        const user = mylib.getUserConnected()

        const updates = {
          id: user.id,
          name,
          firstname,
          username,
          updated_at: new Date(),
        }

        let { error } = await mylib.updateUser(updates)

        if (error) {
          throw error
        }
        Swal.fire('Profile updated correctly.')
      } catch (error) {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: error.message,
        })
      } finally {
        setLoading(false)
      }
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Please enter all fields correctly',
      })
    }

  }

  /**
  * delete profile from supabase
  */
  async function deleteProfile() {
    try {
      const user = supabase.auth.user()

      const { data, error: error3 } = await mylib.deleteProfileInContest(user.id)

      if (error3) {
        throw error3
      }
      let { error } = await mylib.deleteProfile(user.id)

      if (error) {
        throw error
      }
      let { error: error2 } = await mylib.deleteUser(user.id)
      if (error2) {
        throw error2
      }

      Swal.fire('Profile deleted correctly.')
      supabase.auth.signOut()
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: error.message,
      })
    } finally {

    }
  }

  //for reset password, not fully implemented
  // async function resetPassword() {
  //   try {

  //     const user = supabase.auth.user()

  //     const { error } = supabase.auth.api
  //       .resetPasswordForEmail(user.email)

  //     if (error) {
  //       throw error
  //     }
  //     Swal.fire('Reset email sent correctly.')
  //     setReset(true)
  //   } catch (error) {
  //     Swal.fire({
  //       icon: 'error',
  //       title: 'Oops...',
  //       text:   error.message,
  //     })
  //   } finally {

  //   }
  // }


  return (
    <div className="form-widget">
      <div>
        <label htmlFor="email">Email</label>
        <input id="email" type="text" value={session.user.email} disabled />
      </div>
      <div>
        <label htmlFor="name">Name</label>
        <input
          id="name"
          type="text"
          value={name || ''}
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="firstname">Firstname</label>
        <input
          id="firstname"
          type="text"
          value={firstname || ''}
          onChange={(e) => setFirstname(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="Username">Username</label>
        <input
          id="Username"
          type="text"
          value={username || ''}
          onChange={(e) => setUsername(e.target.value)}
        />
      </div>
      {/* //for reset password, not fully implemented */}
      {/* <a className="resetPassword" onClick={() => resetPassword()} >
        Reset password
      </a> */}
      {/* 
      <a className="resetPassword" onClick={() => getMagicLink()} >
        Get Magic Link (one-time login with email)
      </a> */}
      <div>
        <button
          className="button block primary"
          onClick={() => updateProfile()}
          disabled={loading}
        >
          {loading ? 'Loading ...' : 'Update'}
        </button>
      </div>

      <div>
        <button className="button block" onClick={() => mylib.logout()}>
          Sign Out
        </button>
      </div>

      <div>
        <button
          className="button  secondary"
          onClick={() => deleteProfile({})}
          disabled={loading}
        >Delete account (sure ?)
        </button>
      </div>
    </div>
  )
}
