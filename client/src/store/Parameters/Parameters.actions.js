import { ParameterActionTypes } from "./Parameters.actionTypes"

export const UPDATE_PARAMETER_TOOGLE = () => {
    return {
        type: ParameterActionTypes.UPDATE_TOGGLE
    }
}

export const UPDATE_PARAMETERS = (payload) => {
    return {
        type: ParameterActionTypes.UPDATE_PARAMETERS,
        payload: payload
    }
}