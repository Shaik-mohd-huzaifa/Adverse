import { AdsActionTypes } from "./Ads.actionTypes"

const Inital_State = {
    generated_images: {}
}

export const AdsReducer = (state = Inital_State, action) => {
    const {type, payload} = action
    
    if(type == AdsActionTypes.UPDATE_ADS){
        return{
            generated_images: payload
        }
    }
    
    return state
}