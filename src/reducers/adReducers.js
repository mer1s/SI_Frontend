import { AD_CREATE_FAIL, AD_CREATE_REQ, AD_CREATE_RESET, AD_CREATE_SUCCESS, AD_DELETE_FAIL, AD_DELETE_REQ, AD_DELETE_RESET, AD_DELETE_SUCCESS, AD_UPDATE_FAIL, AD_UPDATE_REQ, AD_UPDATE_RESET, AD_UPDATE_SELECT, AD_UPDATE_SUCCESS, AD_UPDATE_UNSELECT, GET_ADS_FAIL, GET_ADS_REQUEST, GET_ADS_SUCCESS, GET_NEW_ADS_FAIL, GET_NEW_ADS_REQUEST, GET_NEW_ADS_SUCCESS, GET_SINGLE_AD_FAIL, GET_SINGLE_AD_REQUEST, GET_SINGLE_AD_RESET, GET_SINGLE_AD_SUCCESS, GET_ST_ADS_FAIL, GET_ST_ADS_REQUEST, GET_ST_ADS_SUCCESS, GET_USERS_ADS_FAIL, GET_USERS_ADS_REQUEST, GET_USERS_ADS_SUCCESS } from "../constants/addConstants";
import { GET_SO_ADS_FAIL, GET_SO_ADS_REQUEST, GET_SO_ADS_SUCCESS} from '../constants/addConstants'

export const getAdsReducer = (state = { loading: true, ads : [] }, action) =>{
    switch(action.type){
        case GET_ADS_REQUEST:
            return {...state, loading: true}
        case GET_ADS_SUCCESS:
            return {loading : false, ads : action.payload.list, total : action.payload.count, succes : true}
        case GET_ADS_FAIL:
            return {loading : false, error : action.payload}
        default:
            return state
    }
}

export const getNewAdsReducer = (state = { loading: true, ads : [] }, action) =>{
    switch(action.type){
        case GET_NEW_ADS_REQUEST:
            return {...state, loading: true}
        case GET_NEW_ADS_SUCCESS:
            return {loading : false, ads : action.payload, succes : true}
        case GET_NEW_ADS_FAIL:
            return {loading : false, error : action.payload}
        default:
            return state
    }
}

export const getSTAdsReducer = (state = { loading: true, ads : [] }, action) =>{
    switch(action.type){
        case GET_ST_ADS_REQUEST:
            return {...state, loading: true}
        case GET_ST_ADS_SUCCESS:
            return {loading : false, ads : action.payload, succes : true}
        case GET_ST_ADS_FAIL:
            return {loading : false, error : action.payload}
        default:
            return state
    }
}

export const getSOAdsReducer = (state = { loading: true, ads : [] }, action) =>{
    switch(action.type){
        case GET_SO_ADS_REQUEST:
            return {...state, loading: true}
        case GET_SO_ADS_SUCCESS:
            return {loading : false, ads : action.payload.list, user : action.payload.user, succes : true}
        case GET_SO_ADS_FAIL:
            return {loading : false, error : action.payload}
        default:
            return state
    }
}

export const getUsersAdsReducer = (state = { loading: true, ads : []}, action) =>{
    switch(action.type){
        case GET_USERS_ADS_REQUEST:
            return {...state, loading: true}
        case GET_USERS_ADS_SUCCESS:
            return {loading : false, ads : action.payload, succes : true}
        case GET_USERS_ADS_FAIL:
            return {loading : false, error : action.payload}
        default:
            return state
    }
}

export const getSingleReducer = (state = { loading: true, error:'',  ad : { images : [] }}, action)=>{
    switch(action.type){
        case GET_SINGLE_AD_REQUEST:
            return {...state, loading: true}
        case GET_SINGLE_AD_SUCCESS:
            return {loading: false, ad: action.payload}
        case GET_SINGLE_AD_FAIL:
            return {loading: false, error: action.payload}
        case GET_SINGLE_AD_RESET:
            return {loading: false, error: ''}
        default:
            return state;
    }
} 

export const createAdReducer = (state = { loading: true, }, action) => {
    switch(action.type){
        case AD_CREATE_REQ:
            return {loading: true};
        case AD_CREATE_SUCCESS:
            return {loading: false, success: true, id: action.payload};
        case AD_CREATE_FAIL:
            return {loading: false, error: action.payload};
        case AD_CREATE_RESET:
            return {};
        default:
            return state;
    }
}

export const deleteAdReducer = (state = { loading: false, }, action) => {
    switch(action.type){
        case AD_DELETE_REQ:
            return {loading: true};
        case AD_DELETE_SUCCESS:
            return {loading: false, success: true};
        case AD_DELETE_FAIL:
            return {loading: false, error: action.payload};
        case AD_DELETE_RESET:
            return {};
        default:
            return state;
    }
}

export const updateAdReducer = (state = { loading: true, }, action) => {
    switch(action.type){
        case AD_UPDATE_REQ:
            return {loading: true};
        case AD_UPDATE_SUCCESS:
            return {loading: false, success: true, id: action.payload};
        case AD_UPDATE_FAIL:
            return {loading: false, error: action.payload};
        case AD_UPDATE_RESET:
            return {};
        default:
            return state;
    }
}

export const selectAdReducer = (state = { }, action) => {
    switch(action.type){
        case AD_UPDATE_SELECT:
            return {ad: action.payload};
        case AD_UPDATE_UNSELECT:
            return {};
        default:
            return state;
    }
}