import { BrandActionTypes } from "./Brands.actionTypes"

export const updateBrands = (payload) => {
    return {
        type: BrandActionTypes.UPDATE_ACTION,
        payload
    }
}