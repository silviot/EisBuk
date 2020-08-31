import { useFirestore } from 'react-redux-firebase'
import { LOGIN_SUCCESS, LOGIN_ERROR, LOGOUT_SUCCESS, LOGOUT_ERROR, GOOGLE_LOGIN_ERROR, GOOGLE_LOGIN_SUCCESS } from './action-types'
import { firestore } from 'firebase'

export const signIn = (credentials) => {
    return(dispatch, getState, {getFirebase}) => {
        const firebase = getFirebase()
        firebase.auth().signInWithEmailAndPassword(
            credentials.email,
            credentials.password
        ).then(() => {
            console.log('Login Success')
        }).catch((err) => {
            console.log('Login Error')
        })
    }
}

export const signOut = () => {
    return(dispatch, getState, {getFirebase}) => {
        const firebase = getFirebase()
        firebase.auth().signOut()
        .then(() => {
            console.log('Logout success')
        }).catch((err) => {
            console.log('Logout error')
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

export const createBookingSlot = ({dateTime, duration}) => {
    return(dispatch, getState, {getFirebase}) => {
        const firebase = getFirebase()
        firebase.firestore()
            .collection('bookings')
            .add({
                date: dateTime,
                duration: duration
            })
    }
}

export const deleteBookingSlot = (id) => {
    return(dispatch, getState, {getFirebase}) => {
        const firebase = getFirebase()
        firebase.firestore()
            .collection('bookings')
            .doc(id)
            .delete()
            .then(() => {
                console.log('Eliminato')
            }).catch((err) => {
                console.log('Error : ' + err)
            })
    }
}