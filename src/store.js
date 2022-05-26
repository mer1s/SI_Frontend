import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import { createAdReducer, deleteAdReducer, getAdsReducer, getNewAdsReducer, getSingleReducer, getSOAdsReducer, getSTAdsReducer, getUsersAdsReducer, updateAdReducer } from "./reducers/adReducers";
import { loginReducer, registerReducer } from "./reducers/accountReducers";
import { basketReducer } from "./reducers/basketReducers";

const reducer = combineReducers({
    adList: getAdsReducer,
    singleAd: getSingleReducer,
    createAd: createAdReducer,
    userLogin: loginReducer,
    newAds: getNewAdsReducer,
    userAds: getUsersAdsReducer,
    deleteAd: deleteAdReducer,
    basket: basketReducer,
    sameTypeAds: getSTAdsReducer,
    sameOwnerAds: getSOAdsReducer,
    updateAd: updateAdReducer,
    register: registerReducer
})

const userInfoFromStorage = localStorage.getItem('userInfo') 
? JSON.parse(localStorage.getItem('userInfo'))
: null

const basketFromStorage = localStorage.getItem('items') 
? JSON.parse(localStorage.getItem('items'))
: null

const initialState = {
    userLogin: { userInfo: userInfoFromStorage },
    basket: { items: basketFromStorage }
}

const middleware = [thunk]

const store = createStore(reducer, initialState, composeWithDevTools(applyMiddleware(...middleware)))

export default store