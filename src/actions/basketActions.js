import axios from "axios";
import { BASKET_ADD, BASKET_REMOVE } from "../constants/basketConstants";
import { apiUrl } from "../helper";

export const addItem = (ad) => async (dispatch, getState) =>{
    try{
        dispatch({
            type: BASKET_ADD,
            payload: {
                ad: {
                  id: ad.id,
                  location: ad.location,
                  name: ad.name,
                  titlePath: ad.titlePath,
                  type: ad.type
                }
            }
        })
    
        var token = JSON.parse(localStorage.getItem("userInfo")).token;

        const config = {     
            headers: { 
                // "Content-Type": "multipart/form-data",
                "Authorization": `Bearer ${token}`
            }
        }
        
        await axios.post(`${apiUrl}/api/accounts/basket/add/${ad.id}`, {}, config);

        const { items } = getState().basket;
        localStorage.setItem('items', JSON.stringify(items)); 

    }catch(err){
        // console.log(err);
    }
}

export const removeItem = (id) => async (dispatch, getState) =>{
    try{
        dispatch({
            type: BASKET_REMOVE,
            payload: id
        })
        
        var token = JSON.parse(localStorage.getItem("userInfo")).token;

        const config = {     
            headers: { 
                // "Content-Type": "multipart/form-data",
                "Authorization": `Bearer ${token}`
            }
        }

        await axios.post(`${apiUrl}/api/accounts/basket/remove/${id}`, {}, config);
        //DISPATCH SUCCESS HERE 

        const { items } = getState().basket;
        localStorage.setItem('items', JSON.stringify(items)); 

        // localStorage.setItem('items', JSON.stringify(data));
    }catch(err){
        // console.log(err);
    }
}
// ne treba mozda
export const setBasket = (id) => async (dispatch, getState) =>{
    try{
        dispatch({
            type: BASKET_REMOVE,
            payload: id
        })
        
        var token = JSON.parse(localStorage.getItem("userInfo")).token;

        const config = {     
            headers: { 
                // "Content-Type": "multipart/form-data",
                "Authorization": `Bearer ${token}`
            }
        }

        await axios.post(`${apiUrl}/api/accounts/basket/remove/${id}`, {}, config);
        //DISPATCH SUCCESS HERE 

        const { items } = getState().basket;
        localStorage.setItem('items', JSON.stringify(items)); 

        // localStorage.setItem('items', JSON.stringify(data));
    }catch(err){
        // console.log(err);
    }
}