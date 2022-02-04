import React from 'react'
import { Nav, Button } from 'react-bootstrap';
import Link from 'next/link'
/**
 * componant for navbar.
 * @returns html code
 */
export default function Navbar() {
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
                  Signup/Signin
                </a>
              </Link>

            </li>
          </ul>
        </div>
      </div>
    </Nav>
  )
}
