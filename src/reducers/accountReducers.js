import { ADMIN_DELETE_USER_FAIL, ADMIN_DELETE_USER_REQ, ADMIN_DELETE_USER_RESET, ADMIN_DELETE_USER_SUCCESS, ADMIN_LIST_USERS_FAIL, ADMIN_LIST_USERS_REQ, ADMIN_LIST_USERS_SUCCESS, REPORT_USER_FAIL, REPORT_USER_REQ, REPORT_USER_RESET, REPORT_USER_SUCCESS, USER_CHANGE_PIC_FAIL, USER_CHANGE_PIC_REQ, USER_CHANGE_PIC_RESET, USER_CHANGE_PIC_SUCCESS, USER_CONTACT_FAIL, USER_CONTACT_REQ, USER_CONTACT_RESET, USER_CONTACT_SUCCESS, USER_EDIT_NAME_FAIL, USER_EDIT_NAME_REQ, USER_EDIT_NAME_RESET, USER_EDIT_NAME_SUCCESS, USER_EDIT_PASS_FAIL, USER_EDIT_PASS_REQ, USER_EDIT_PASS_RESET, USER_EDIT_PASS_SUCCESS, USER_EDIT_USERNAME_FAIL, USER_EDIT_USERNAME_REQ, USER_EDIT_USERNAME_RESET, USER_EDIT_USERNAME_SUCCESS, USER_LOGIN_FAIL, USER_LOGIN_REQ, USER_LOGIN_SUCCESS, USER_LOGOUT, USER_PASS_RESET_FAIL, USER_PASS_RESET_REQ, USER_PASS_RESET_RESET_SUCCESS, USER_PASS_RESET_SUCCESS, USER_REG_FAIL, USER_REG_REQ, USER_REG_RESET, USER_REG_SUCCESS, USER_REMOVE_PIC_FAIL, USER_REMOVE_PIC_REQ, USER_REMOVE_PIC_RESET, USER_REMOVE_PIC_SUCCESS, USER_SET_FIRST, USER_SET_LAST, USER_SET_PIC, USER_SET_TOKEN, USER_SET_USERNAME, USER_VERIFY_FAIL, USER_VERIFY_REQ, USER_VERIFY_SUCCESS } from '../constants/accountContstants'

export const loginReducer = (state = {loading: false}, action) =>{
    switch(action.type){
        case USER_LOGIN_REQ:
            return { loading: true }
        case USER_LOGIN_SUCCESS:
            return { loading: false, userInfo: action.payload }
        case USER_LOGIN_FAIL:
            return { loading: false, error: action.payload }
        case USER_SET_USERNAME:
            return { ...state, userInfo: {...state.userInfo, username: action.payload} }
        case USER_SET_FIRST:
            return { ...state, userInfo: {...state.userInfo, firstName: action.payload} }
        case USER_SET_LAST:
            return { ...state, userInfo: {...state.userInfo, lastName: action.payload} }
        case USER_SET_TOKEN:
            return { ...state, userInfo: {...state.userInfo, token: action.payload} }
        case USER_SET_PIC:
            return { ...state, userInfo: {...state.userInfo, profilePic: action.payload} }
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
        case USER_REG_RESET:
            return {}
        default: 
            return state
    }
}

export const verificationReducer = (state = {
    loading:true
}, action) =>{
    switch(action.type){
        case USER_VERIFY_REQ:
            return { loading: true }
        case USER_VERIFY_SUCCESS:
            return { loading: false, success: true }
        case USER_VERIFY_FAIL:
            return { loading: false, error: action.payload }
        default: 
            return state
    }
}

export const resetPassReducer = (state = {
    loading:false,
    success:false
}, action) =>{
    switch(action.type){
        case USER_PASS_RESET_REQ:
            return { loading: true }
        case USER_PASS_RESET_SUCCESS:
            return { loading: false, success: true }
        case USER_PASS_RESET_FAIL:
            return { loading: false, error: action.payload }
        case USER_PASS_RESET_RESET_SUCCESS:
            return { ...state, success: false, loading:false }
        default: 
            return state
    }
}

export const contactUserReducer = (state = {
    loading:false,
    success:false
}, action) =>{
    switch(action.type){
        case USER_CONTACT_REQ:
            return { loading: true }
        case USER_CONTACT_SUCCESS:
            return { loading: false, success: true }
        case USER_CONTACT_FAIL:
            return { loading: false, error: action.payload }
        case USER_CONTACT_RESET:
            return { ...state, success: false, loading:false }
        default: 
            return state
    }
}

export const reportUserReducer = (state = {
    loading:false,
    success:false
}, action) =>{
    switch(action.type){
        case REPORT_USER_REQ:
            return { loading: true }
        case REPORT_USER_SUCCESS:
            return { loading: false, success: true }
        case REPORT_USER_FAIL:
            return { loading: false, error: action.payload }
        case REPORT_USER_RESET:
            return { }
        default: 
            return state
    }
}

export const getUsersReducer = (state = { loading: true, users : [] }, action) =>{
    switch(action.type){
        case ADMIN_LIST_USERS_REQ:
            return {...state, loading: true}
        case ADMIN_LIST_USERS_SUCCESS:
            return {loading : false, users : action.payload, succes : true}
        case ADMIN_LIST_USERS_FAIL:
            return {loading : false, error : action.payload}
        default:
            return state
    }
}

export const deleteUserReducer = (state = { loading: true, }, action) => {
    switch(action.type){
        case ADMIN_DELETE_USER_REQ:
            return {loading: true};
        case ADMIN_DELETE_USER_SUCCESS:
            return {loading: false, success: true};
        case ADMIN_DELETE_USER_FAIL:
            return {loading: false, error: action.payload};
        case ADMIN_DELETE_USER_RESET:
            return { };
        default:
            return state;
    }
}

export const editUsernameReducer = (state = { loading: false, }, action) => {
    switch(action.type){
        case USER_EDIT_USERNAME_REQ:
            return {loading: true};
        case USER_EDIT_USERNAME_SUCCESS:
            return {loading: false, success: true};
        case USER_EDIT_USERNAME_FAIL:
            return {loading: false, error: action.payload};
        case USER_EDIT_USERNAME_RESET:
            return { };
        default:
            return state;
    }
}

export const editPassReducer = (state = { loading: false, }, action) => {
    switch(action.type){
        case USER_EDIT_PASS_REQ:
            return {loading: true};
        case USER_EDIT_PASS_SUCCESS:
            return {loading: false, success: true};
        case USER_EDIT_PASS_FAIL:
            return {loading: false, error: action.payload};
        case USER_EDIT_PASS_RESET:
            return { };
        default:
            return state;
    }
}

export const editNameReducer = (state = { loading: false, }, action) => {
    switch(action.type){
        case USER_EDIT_NAME_REQ:
            return {loading: true};
        case USER_EDIT_NAME_SUCCESS:
            return {loading: false, success: true};
        case USER_EDIT_NAME_FAIL:
            return {loading: false, error: action.payload};
        case USER_EDIT_NAME_RESET:
            return { };
        default:
            return state;
    }
}

export const removePicReducer = (state = { loading: false, }, action) => {
    switch(action.type){
        case USER_REMOVE_PIC_REQ:
            return {loading: true};
        case USER_REMOVE_PIC_SUCCESS:
            return {loading: false, success: true};
        case USER_REMOVE_PIC_FAIL:
            return {loading: false, error: action.payload};
        case USER_REMOVE_PIC_RESET:
            return { };
        default:
            return state;
    }
}

export const changePicReducer = (state = { loading: false, }, action) => {
    switch(action.type){
        case USER_CHANGE_PIC_REQ:
            return {loading: true};
        case USER_CHANGE_PIC_SUCCESS:
            return {loading: false, success: true};
        case USER_CHANGE_PIC_FAIL:
            return {loading: false, error: action.payload};
        case USER_CHANGE_PIC_RESET:
            return { };
        default:
            return state;
    }
}