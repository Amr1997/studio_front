/* eslint-disable import/no-anonymous-default-export */
import { ACCESS_TOKEN } from "../actions/actionTypes";
const initialState = {
  accessToken : ''
};

export default function (state = initialState, action) {
  //  (action.payload);
  switch (action.type) {
    case ACCESS_TOKEN:
      return {
        ...state,
        accessToken : action.payload.access
      };

    
    default:
      return state;
  }
}