import React from 'react'
import {
  Route,
  Redirect
} from 'react-router-dom';
import { useSelector } from 'react-redux'
import { isLoaded, isEmpty } from 'react-redux-firebase'

const LoginRoute = (props) => {
  const auth = useSelector(state => state.firebase.auth)
  return (
    <>
    { isLoaded(auth) && isEmpty(auth) && <Route {...props} />}
    { isLoaded(auth) && !isEmpty(auth) && <Redirect to="/" />}
    </>
  )
}

export default LoginRoute