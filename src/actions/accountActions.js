import axios from "axios"
import { ADMIN_DELETE_USER_FAIL, ADMIN_DELETE_USER_REQ, ADMIN_DELETE_USER_SUCCESS, ADMIN_LIST_USERS_FAIL, ADMIN_LIST_USERS_REQ, ADMIN_LIST_USERS_SUCCESS, REPORT_USER_REQ, REPORT_USER_SUCCESS, USER_CHANGE_PIC_REQ, USER_CHANGE_PIC_SUCCESS, USER_CONTACT_REQ, USER_CONTACT_SUCCESS, USER_EDIT_NAME_REQ, USER_EDIT_NAME_SUCCESS, USER_EDIT_PASS_REQ, USER_EDIT_PASS_SUCCESS, USER_EDIT_USERNAME_FAIL, USER_EDIT_USERNAME_REQ, USER_EDIT_USERNAME_SUCCESS, USER_LOGIN_FAIL, USER_LOGIN_REQ, USER_LOGIN_SUCCESS, USER_PASS_RESET_FAIL, USER_PASS_RESET_REQ, USER_PASS_RESET_SUCCESS, USER_REG_FAIL, USER_REG_REQ, USER_REG_SUCCESS, USER_REMOVE_PIC_REQ, USER_REMOVE_PIC_SUCCESS, USER_SET_PIC, USER_VERIFY_FAIL, USER_VERIFY_REQ, USER_VERIFY_SUCCESS } from "../constants/accountContstants"
import { apiUrl } from "../helper"

export const login = (username, password) => async (dispatch) =>{
    try{
        dispatch({ type: USER_LOGIN_REQ })

        const { data } = await axios.post(`${apiUrl}/api/accounts/login`, { username, password })
        
        setTimeout(() => {

            dispatch({
                type: USER_LOGIN_SUCCESS,
                payload: data
            })
        }, 500)
            
        localStorage.setItem('userInfo', JSON.stringify(data));
    }
    catch(err){
        dispatch({
            type: USER_LOGIN_FAIL,
            payload: err.response.data
        })
    }
}

export const register = (formData) => async (dispatch) =>{
    try{
        dispatch({
            type: USER_REG_REQ
        })

        await axios.post(`${apiUrl}/api/accounts/register`, formData)
        
        dispatch({
            type: USER_REG_SUCCESS
        })
    }
    catch(err){
        dispatch({
            type: USER_REG_FAIL,
            payload: err.response.data
        })
    }
}

export const verify = (id, token) => async (dispatch) =>{
    try{
        // console.log(id, token)
        dispatch({
            type: USER_VERIFY_REQ
        })
        
        var newToken = token.replace(/\s/g, '+')
        
        await axios.post(`${apiUrl}/api/accounts/verify`,{
            id: id,
            token: newToken,
        })
        // .then(res => console.log(res.data))
        
        setTimeout(()=>{
            dispatch({
                type: USER_VERIFY_SUCCESS
            })
        },1500)
            
    }
    catch(err){
        dispatch({
            type: USER_VERIFY_FAIL,
            payload: err
        })
    }
}

export const resetPw = (obj) => async (dispatch) =>{
    try{
        // console.log(id, token)
        dispatch({
            type: USER_PASS_RESET_REQ
        })
        
        // console.log(obj.token)
        
        await axios.post(`${apiUrl}/api/accounts/reset-password`, obj)
        // .then(res => console.log(res.data))
        
        setTimeout(()=>{
            dispatch({
                type: USER_PASS_RESET_SUCCESS
            })
        },1500)
            
    }
    catch(err){
        dispatch({
            type: USER_PASS_RESET_FAIL,
            payload: err.response.data
        })
    }
}

export const listUsers = (term, thisId) => async (dispatch) =>{
    try{
        // console.log(term)
        dispatch({
            type: ADMIN_LIST_USERS_REQ,
        })
        
        var token = JSON.parse(localStorage.getItem("userInfo")).token;

        const config = {     
            headers: { 
                // "Content-Type": "multipart/form-data",
                "Authorization": `Bearer ${token}`
            }
        }
        
        const { data } = await axios.get(`${apiUrl}/api/accounts/all-users/term?term=${term}&&thisId=${thisId}`, config)
        // const { data } = await axios.get(`https://localhost:7007/api/Accounts/all-users/term?term=${term}`)
        dispatch({
            type: ADMIN_LIST_USERS_SUCCESS,
            payload: data
        })
    }catch(err){
        dispatch({
            type: ADMIN_LIST_USERS_FAIL,
            payload: err.message
        })
    }
}

export const deleteUserAction = (id) => async (dispatch) =>{
    try{
        dispatch({type: ADMIN_DELETE_USER_REQ})
        
        var token = JSON.parse(localStorage.getItem("userInfo")).token;

        const config = {     
            headers: { 
                // "Content-Type": "multipart/form-data",
                "Authorization": `Bearer ${token}`
            }
        }
        
        await axios.delete(`${apiUrl}/api/accounts/all-users/${id}`, config);
        // console.log(data)
        dispatch({type: ADMIN_DELETE_USER_SUCCESS})
    }catch(err){
        dispatch({
            type: ADMIN_DELETE_USER_FAIL,
            payload: err.response.data.title
        })
    }
}

export const contactUser = (id ,subject, content) => async (dispatch) =>{
    try{
        dispatch({
            type: USER_CONTACT_REQ
        })
        
        var token = JSON.parse(localStorage.getItem("userInfo")).token;

        const config = {     
            headers: { 
                // "Content-Type": "multipart/form-data",
                "Authorization": `Bearer ${token}`
            }
        }

        await axios.post(`${apiUrl}/api/accounts/contact-user`, 
            {
                id,
                subject,
                content
            }, config)
        
        dispatch({
            type: USER_CONTACT_SUCCESS
        })
    }
    catch(err){
        // console.log(err)
    }
}

export const reportUser = (id , report) => async (dispatch) =>{
    try{
        dispatch({
            type: REPORT_USER_REQ
        })
        
        await axios.post(`${apiUrl}/api/accounts/report/${id}`, report)
        
        dispatch({
            type: REPORT_USER_SUCCESS
        })
    }
    catch(err){
        // console.log(err)
    }
}

export const editUsername = (newUsername) => async (dispatch) =>{
    try{
        dispatch({
            type: USER_EDIT_USERNAME_REQ
        })
        
        var token = JSON.parse(localStorage.getItem("userInfo")).token;

        const config = {     
            headers: { 
                // "Content-Type": "multipart/form-data",
                "Authorization": `Bearer ${token}`
            }
        }

        const {data} =await axios.put(`${apiUrl}/api/accounts/edit-username?newUsername=${newUsername}`,{},config)
        
        dispatch({
            type: USER_EDIT_USERNAME_SUCCESS
        })

        var user = JSON.parse(localStorage.getItem("userInfo"));
        user.token = data;
        localStorage.setItem('userInfo', JSON.stringify(user));
    }
    catch(err){
        dispatch({
            type:USER_EDIT_USERNAME_FAIL,
            payload:err.response.data
        })
    }
}

export const editPassword = (newPass, hint) => async (dispatch) =>{
    try{
        dispatch({
            type: USER_EDIT_PASS_REQ
        })
        
        var token = JSON.parse(localStorage.getItem("userInfo")).token;

        const config = {     
            headers: { 
                // "Content-Type": "multipart/form-data",
                "Authorization": `Bearer ${token}`
            }
        }

        const {data} =await axios.put(`${apiUrl}/api/accounts/edit-password?newPass=${newPass}&&hint=${hint}`,{},config)
        
        dispatch({
            type: USER_EDIT_PASS_SUCCESS
        })

        var user = JSON.parse(localStorage.getItem("userInfo"));
        user.token = data;
        localStorage.setItem('userInfo', JSON.stringify(user));
    }
    catch(err){
        // console.log(err)
    }
}

export const editName = (first, last) => async (dispatch) =>{
    try{
        dispatch({
            type: USER_EDIT_NAME_REQ
        })
        
        var token = JSON.parse(localStorage.getItem("userInfo")).token;

        const config = {     
            headers: { 
                // "Content-Type": "multipart/form-data",
                "Authorization": `Bearer ${token}`
            }
        }

        const {data} =await axios.put(`${apiUrl}/api/accounts/edit-name?first=${first}&&last=${last}`,{},config)
        
        dispatch({
            type: USER_EDIT_NAME_SUCCESS
        })

        var user = JSON.parse(localStorage.getItem("userInfo"));
        user.token = data;
        localStorage.setItem('userInfo', JSON.stringify(user));
    }
    catch(err){
        // console.log(err)
    }
}

export const removePic = () => async (dispatch) =>{
    try{
        dispatch({
            type: USER_REMOVE_PIC_REQ
        })
        
        var token = JSON.parse(localStorage.getItem("userInfo")).token;

        const config = {     
            headers: { 
                // "Content-Type": "multipart/form-data",
                "Authorization": `Bearer ${token}`
            }
        }

        await axios.put(`${apiUrl}/api/accounts/remove-pic`,{},config)
        
        dispatch({
            type: USER_REMOVE_PIC_SUCCESS
        })
        dispatch({
            type: USER_SET_PIC,
            payload: 'defaultUser.png'
        });  
    }
    catch(err){
        // console.log(err)
    }
}

export const changePic = (fd) => async (dispatch) =>{
    try{
        dispatch({
            type: USER_CHANGE_PIC_REQ
        })
        
        var token = JSON.parse(localStorage.getItem("userInfo")).token;

        const config = {     
            headers: { 
                // "Content-Type": "multipart/form-data",
                "Authorization": `Bearer ${token}`
            }
        }

        const {data} = await axios.put(`${apiUrl}/api/accounts/change-pic`, fd, config)
        
        dispatch({
            type: USER_CHANGE_PIC_SUCCESS
        }) 
        dispatch({
            type: USER_SET_PIC,
            payload: data
        });  
    }
    catch(err){
        // console.log(err)
    }
}