/* eslint-disable import/no-anonymous-default-export */
import { STATE } from "../actions/actionTypes";
const initialState = {
  selectedState : ''
};

export default function (state = initialState, action) {
  //  (action.payload);
  switch (action.type) {
    case STATE:
      return {
        ...state,
        selectedState : action.payload
      };

    
    default:
      return state;
  }
}