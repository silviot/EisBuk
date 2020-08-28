import { LOGIN_SUCCESS, LOGIN_ERROR, LOGOUT_SUCCESS, LOGOUT_ERROR, GOOGLE_LOGIN_ERROR, GOOGLE_LOGIN_SUCCESS } from './action-types'

export const signIn = (credentials) => {
    return(dispatch, getState, {getFirebase}) => {
        const firebase = getFirebase()
        firebase.auth().signInWithEmailAndPassword(
            credentials.email,
            credentials.password
        ).then(() => {
            dispatch({ type: LOGIN_SUCCESS })
        }).catch((err) => {
            dispatch({ type: LOGIN_ERROR, err})
        })
    }
}

export const signOut = () => {
    return(dispatch, getState, {getFirebase}) => {
        const firebase = getFirebase()
        firebase.auth().signOut()
        .then(() => {
            console.log('Logout success')
            dispatch({ type: LOGOUT_SUCCESS })
        }).catch((err) => {
            console.log('Logout error')
            dispatch({ type: LOGOUT_ERROR, err})
        })
    }
}

export const signInWithGoogle = () => {
    return(dispatch, getState, {getFirebase}) => {
        const firebase = getFirebase()
        firebase.login({ provider: 'google', type: 'popup' })
        .then(() => {
            console.log('Google login success')
            dispatch({ type: GOOGLE_LOGIN_SUCCESS })
        }).catch((err) => {
            console.log('Google login error')
            dispatch({ type: GOOGLE_LOGIN_ERROR, err})
        })
    }
}