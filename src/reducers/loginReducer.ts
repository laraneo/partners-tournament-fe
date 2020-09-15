import {  ACTIONS, ActionTypes } from '../interfaces/actionTypes/loginTypes';
import SecureStorage from "../config/SecureStorage";

type LoginInitialState = {
  user: object;
  status: boolean;
  loading: boolean;
}

const initialState: LoginInitialState = {
  user: {},
  status: false,
  loading: false
};

const userReducer = (state = initialState, action: ActionTypes) => {
  switch (action.type) {
    case ACTIONS.SET_USER:
      return {
        ...state,
        user: action.payload,
        status: true
      };
    case ACTIONS.LOGOUT:
      return {
        ...state,
        ...initialState
      };
    case ACTIONS.SET_LOADING:
      return {
        ...state,
        loading: action.payload
      };
    default:
      return state;
  }
};

export default userReducer;
