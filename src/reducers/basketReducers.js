import { BASKET_ADD, BASKET_REMOVE, BASKET_SET } from "../constants/basketConstants"

export const basketReducer = (state = { items:[] }, action)=>{
    switch(action.type){
        case BASKET_ADD:
            return {...state, items: [...state.items, action.payload]}
        case BASKET_REMOVE:
            return {...state, items: state.items.filter(n => n.ad.id !== action.payload)}
        case BASKET_SET:
            return {...state, items: action.payload}
        default:
            return state
    }
} 