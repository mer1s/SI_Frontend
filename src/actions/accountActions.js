import axios from "axios"
import { USER_LOGIN_FAIL, USER_LOGIN_REQ, USER_LOGIN_SUCCESS, USER_REG_REQ, USER_REG_SUCCESS } from "../constants/accountContstants"

export const login = (username, password) => async (dispatch) =>{
    try{
        dispatch({ type: USER_LOGIN_REQ })

        const { data } = await axios.post('https://localhost:7007/api/accounts/login', { username, password })

        dispatch({
            type: USER_LOGIN_SUCCESS,
            payload: data
        })

        localStorage.setItem('userInfo', JSON.stringify(data));
    }
    catch(err){
        dispatch({
            type: USER_LOGIN_FAIL,
            payload: err
        })
    }
}
export const register = (formData) => async (dispatch) =>{
    try{
        dispatch({
            type: USER_REG_REQ
        })

        const { data } = await axios.post('https://localhost:7007/api/accounts/register', formData)
        
        dispatch({
            type: USER_REG_SUCCESS
        })
    }
    catch(err){
        console.log(err)
    }
}