import React from 'react'
import { Nav } from 'react-bootstrap';
import Link from 'next/link'
import { useState, useEffect } from 'react'

/**
 * componant for navbar, user connected.
 * @param {*} session 
 * @returns html code
 */
export default function Navbar({ session }) {
  const mylib = require('../../Mylib')
  const [username, setUsername] = useState(null)

  useEffect(() => {
    getProfile()
  }, [session])

  // get profile from supabase
  async function getProfile() {
    try {
      let { data, error } = await mylib.getUsername(session.user.id)
      if (error) {
        throw error
      }
      setUsername(data.username)
    } catch (error) {
      console.log(error);
    } finally {
    }
  }

  // refresh page 
  function refreshPage() {
    mylib.logout()
    window.location.reload(false);
  }

  return (
    <Nav className="navbar navbar-expand-lg navbar-right navbar-dark bg-dark">
      <div className="container-xl">
        <Link href="/">
          <a className="navbar-brand">CryptoTrading Competition Platform</a>
        </Link>
        <button className="navbar-toggler" type="button" data-toggle="collapse"
          data-target="#dataNavBar" aria-controls="dataNavBar"
          aria-expanded="true" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="dataNavBar">
          <ul className="navbar-nav">
            <li className="nav-item active">
              <Link href="/">
                <a className="nav-link">Home</a>
              </Link>
            </li>
            <li className="nav-item">
              <Link href="/">
                <a className="nav-link">All competition </a>
              </Link>
            </li>
            <li className="nav-item">
              <Link href="/ranking">
                <a className="nav-link">General ranking </a>
              </Link>
            </li>
          </ul>
          <ul className="navbar-nav px-3">
            <li className="nav-item text-nowrap">
              <Link href="/signin">
                <a className="nav-link">
                  {username == null ? "My account" : username}
                </a>
              </Link>
            </li>
            <Link href="/">
              <a className="signout" onClick={refreshPage}>
                Sign Out
              </a>
            </Link>
          </ul>
        </div>
      </div>
    </Nav>
  )
}
