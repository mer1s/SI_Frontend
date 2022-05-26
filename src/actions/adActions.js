import axios from "axios"
import { AD_CREATE_FAIL, AD_CREATE_REQ, AD_CREATE_SUCCESS, AD_DELETE_FAIL, AD_DELETE_REQ, AD_DELETE_SUCCESS, AD_UPDATE_FAIL, AD_UPDATE_REQ, AD_UPDATE_SUCCESS, GET_ADS_FAIL, GET_ADS_REQUEST, GET_ADS_SUCCESS, GET_NEW_ADS_FAIL, GET_NEW_ADS_REQUEST, GET_NEW_ADS_SUCCESS, GET_SINGLE_AD_FAIL, GET_SINGLE_AD_REQUEST, GET_SINGLE_AD_SUCCESS, GET_SO_ADS_REQUEST, GET_ST_ADS_FAIL, GET_ST_ADS_REQUEST, GET_ST_ADS_SUCCESS, GET_USERS_ADS_FAIL, GET_USERS_ADS_REQUEST, GET_USERS_ADS_SUCCESS } from "../constants/addConstants"
import { apiUrl } from "../helper"

export const getAds = (searcher, page) => async (dispatch) =>{
    try{
        dispatch({
            type: GET_ADS_REQUEST,
        })

        const { data } = await axios.get(`https://localhost:7007/api/ads/searcher?Order=${searcher.order}&Types=${searcher.types}&Locations=${searcher.locations}&MinPrice=${searcher.minPrice}&MaxPrice=${searcher.maxPrice}&PageNum=${page}`)
        
        dispatch({
            type: GET_ADS_SUCCESS,
            payload: data
        })
    }catch(err){
        dispatch({
            type: GET_ADS_FAIL,
            payload: err.response.data
        })
    }
}

export const getNewAds = () => async (dispatch) =>{
    try{
        dispatch({
            type: GET_NEW_ADS_REQUEST,
        })

        const { data } = await axios.get(`${apiUrl}/api/Ads/new-ads`)

        dispatch({
            type: GET_NEW_ADS_SUCCESS,
            payload: data
        })
    }catch(err){
        dispatch({
            type: GET_NEW_ADS_FAIL,
            payload: err.message
        })
    }
}

export const getSameTypeAds = (type) => async (dispatch) =>{
    try{
        dispatch({
            type: GET_ST_ADS_REQUEST,
        })

        const { data } = await axios.get(`${apiUrl}/api/Ads/same-type/${type}`)

        dispatch({
            type: GET_ST_ADS_SUCCESS,
            payload: data
        })
    }catch(err){
        dispatch({
            type: GET_ST_ADS_FAIL,
            payload: err.response
        })
    }
}

export const getSameOwnerAds = (ownerId) => async (dispatch) =>{
    try{
        dispatch({
            type: GET_SO_ADS_REQUEST,
        })

        const { data } = await axios.get(`${apiUrl}/api/Ads/same-owner/${ownerId}`)

        dispatch({
            type: GET_ST_ADS_SUCCESS,
            payload: data
        })
    }catch(err){
        dispatch({
            type: GET_ST_ADS_FAIL,
            payload: err.response
        })
    }
}

export const getAd = (id) => async (dispatch) =>{
    try{
        dispatch({
            type: GET_SINGLE_AD_REQUEST,
        })

        const { data } = await axios.get(`${apiUrl}/api/ads/${id}`)

        dispatch({
            type: GET_SINGLE_AD_SUCCESS,
            payload: data
        })
    }catch(err){
        dispatch({
            type: GET_SINGLE_AD_FAIL,
            payload: err.response
        })
    }
}

export const getUsersAds = () => async (dispatch) =>{
    try{
        dispatch({
            type: GET_USERS_ADS_REQUEST,
        })

        var token = JSON.parse(localStorage.getItem("userInfo")).token;

        const config = {     
            headers: { 
                // "Content-Type": "multipart/form-data",
                "Authorization": `Bearer ${token}`
            }
        }
        
        const { data } = await axios.get(`https://localhost:7007/api/ads/my-ads`, config)

        dispatch({
            type: GET_USERS_ADS_SUCCESS,
            payload: data
        })
    }catch(err){
        dispatch({
            type: GET_USERS_ADS_FAIL,
            payload: err.response
        })
    }
}

export const createNewAd = (formData) => async (dispatch) =>{
    try{
        // console.log(formData);
        dispatch({type: AD_CREATE_REQ})
        
        var token = JSON.parse(localStorage.getItem("userInfo")).token;

        const config = {     
            headers: { 
                // "Content-Type": "multipart/form-data",
                "Authorization": `Bearer ${token}`
            }
        }
        
        const {data} = await axios.post(`${apiUrl}/api/Ads`, formData, config);
        
        dispatch({
            type: AD_CREATE_SUCCESS,
            payload: data
        })
    }catch(err){
        dispatch({
            type: AD_CREATE_FAIL,
            payload: err.response.data.title
        })
    }
}

export const deleteAdAction = (id) => async (dispatch) =>{
    try{
        dispatch({type: AD_DELETE_REQ})
        
        var token = JSON.parse(localStorage.getItem("userInfo")).token;

        const config = {     
            headers: { 
                // "Content-Type": "multipart/form-data",
                "Authorization": `Bearer ${token}`
            }
        }
        
        await axios.delete(`${apiUrl}/api/ads/${id}`, config);
        
        dispatch({type: AD_DELETE_SUCCESS})
    }catch(err){
        dispatch({
            type: AD_DELETE_FAIL,
            payload: err.response.data.title
        })
    }
}

export const updateSingleAd = (id, ad) => async (dispatch) =>{
    try{
        dispatch({type: AD_UPDATE_REQ})
        
        var token = JSON.parse(localStorage.getItem("userInfo")).token;

        const config = {     
            headers: { 
                // "Content-Type": "multipart/form-data",
                "Authorization": `Bearer ${token}`
            }
        }
    
        const {data} = await axios.put(`${apiUrl}/api/ads/${id}`, ad, config);
        
        dispatch({
            type: AD_UPDATE_SUCCESS,
            payload: data
        })
        
    }catch(err){
        dispatch({
            type: AD_UPDATE_FAIL,
            payload: err.response.data.title
        })
        console.log(err)
    }
}