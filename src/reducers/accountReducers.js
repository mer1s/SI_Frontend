import { USER_LOGIN_FAIL, USER_LOGIN_REQ, USER_LOGIN_SUCCESS, USER_LOGOUT, USER_REG_FAIL, USER_REG_REQ, USER_REG_SUCCESS } from '../constants/accountContstants'

export const loginReducer = (state = {}, action) =>{
    switch(action.type){
        case USER_LOGIN_REQ:
            return { loading: true }
        case USER_LOGIN_SUCCESS:
            return { loading: false, userInfo: action.payload }
        case USER_LOGIN_FAIL:
            return { loading: false, error: action.payload }
        case USER_LOGOUT:
            return {}
        default: 
            return state
    }
}

export const registerReducer = (state = {}, action) =>{
    switch(action.type){
        case USER_REG_REQ:
            return { loading: true }
        case USER_REG_SUCCESS:
            return { loading: false, success: true }
        case USER_REG_FAIL:
            return { loading: false, error: action.payload }
        default: 
            return state
    }
}