import { LOGIN_ERROR, LOGIN_SUCCESS, LOGOUT_SUCCESS } from "../actions/action-types";

const initState = {
}

export const authReducer = (state = initState, action) => {
    switch(action.type) {
        case LOGIN_ERROR:
        console.log('Login Error')
        return state
        case LOGIN_SUCCESS:
            console.log('Login Success')
            return state
        case LOGOUT_SUCCESS:
            console.log('Logout Success')
            return state
        default:
            return state
    }
}