import { BrandActionTypes } from "./Brands.actionTypes";

const Inital_State = {
    brands: []
}

export const BrandReducer = (state = Inital_State, action) => {
    const {type, payload} = action;

    if(type == BrandActionTypes.UPDATE_ACTION){
        return {
            brands: payload
        }
    }

    return state
}