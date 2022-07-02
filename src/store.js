import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import { createAdReducer, deleteAdReducer, getAdsReducer, getNewAdsReducer, getSingleReducer, getSOAdsReducer, getSTAdsReducer, getUsersAdsReducer, selectAdReducer, updateAdReducer } from "./reducers/adReducers";
import { changePicReducer, contactUserReducer, deleteUserReducer, editNameReducer, editPassReducer, editUsernameReducer, getUsersReducer, loginReducer, registerReducer, removePicReducer, reportUserReducer, resetPassReducer, verificationReducer } from "./reducers/accountReducers";
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
    register: registerReducer,
    verify: verificationReducer,
    passwordReset: resetPassReducer,
    allUsers: getUsersReducer,
    userDelete: deleteUserReducer,
    userContact: contactUserReducer,
    selectedAd: selectAdReducer,
    userReport: reportUserReducer,
    usernameEdit: editUsernameReducer,
    passEdit: editPassReducer,
    nameEdit: editNameReducer,
    picRemove: removePicReducer,
    picChange: changePicReducer
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