import { ParameterActionTypes } from "./Parameters.actionTypes"

const Inital_State = {
    parameters: {},
    toggle: false
}

export const ParameterReducer = (state = Inital_State, action) => {
    const {type, payload} = action

    if(type == ParameterActionTypes.UPDATE_TOGGLE){
        return {
            ...state,
            toggle: !state.toggle
        }
    }else if(type == ParameterActionTypes.UPDATE_PARAMETERS){
        return {
            ...state,
            parameters: payload
        }
    }
    
    return state
}