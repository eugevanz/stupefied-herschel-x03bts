import { useState, useEffect } from 'react';
import netlifyIdentity from 'netlify-identity-widget';

const netlifyAuth = {
  isAuthenticated: false,
  user: null,
  initialize(callback) {
    // window.netlifyIdentity = netlifyIdentity
    netlifyIdentity.on('init', (user) => {
      callback(user)
    })
    netlifyIdentity.init()
  },
  authenticate(callback) {
    this.isAuthenticated = true
    netlifyIdentity.open()
    netlifyIdentity.on('login', (user) => {
      this.user = user
      callback(user)
      netlifyIdentity.close()
    })
  },
  signout(callback) {
    this.isAuthenticated = false
    netlifyIdentity.logout()
    netlifyIdentity.on('logout', () => {
      this.user = null
      callback()
    })
  },
}

export default function App() {
  const [loggedIn, setLoggedIn] = useState(netlifyAuth.isAuthenticated);

  useEffect(() => {
    netlifyAuth.initialize((user) => {
      setLoggedIn(!!user)
    })
  }, [loggedIn]);

  return (loggedIn ? (
    <div>
      You are logged in!
    </div>
  ) : (
    <button>
      Log in here.
    </button>
  ));
}
