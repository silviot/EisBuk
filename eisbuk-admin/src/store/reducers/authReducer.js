import { LOGIN_ERROR, LOGIN_SUCCESS, LOGOUT_SUCCESS } from "../actions/action-types";

const initState = {
    auth: false
}

export const authReducer = (state = initState, action) => {
    switch(action.type) {
        case LOGIN_ERROR:
        console.log('Login Error')
        return {
            ...state,
            auth: false
        }
        case LOGIN_SUCCESS:
            console.log('Login Success')
            return {
                ...state,
                auth: true
            }
        case LOGOUT_SUCCESS:
            console.log('Logout Success')
            return {
                ...state,
                auth: false
            }
        default:
            return state
    }
}