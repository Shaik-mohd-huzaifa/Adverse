import { combineReducers } from "redux";
import { ParameterReducer } from "./Parameters/Parameters.reducer";
import { BrandReducer } from "./Brands/Brands.reducer";
import { AdsReducer } from "./Ads/Ads.reducer";

export const RootReducer = combineReducers({
    parameters: ParameterReducer,
    Brands: BrandReducer,
    Ads: AdsReducer
})