import { ACCESS_TOKEN } from './actionTypes'

export const userRefresh = (token) => {

    return {
        type: ACCESS_TOKEN,
        payload: token
    }

}