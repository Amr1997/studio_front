import { STATE } from './actionTypes'

export const selectedState = (state) => {

    return {
        type: STATE,
        payload: state
    }

}