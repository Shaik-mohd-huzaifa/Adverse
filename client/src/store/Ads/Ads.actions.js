import { AdsActionTypes } from "./Ads.actionTypes"

export const updateAdsAction = (payload) => {
    return {
        type: AdsActionTypes.UPDATE_ADS,
        payload: payload
    }
}