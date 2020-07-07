import { GET_HOUSEHOLDS } from '../constants/actionTypes';
import { BaseAction, HouseHoldStateInterface } from './typed.d';

const initialState: HouseHoldStateInterface = {
  households: [],
  isLoading: false,
  error: null,
};

const getAllHouseholdsReducer = (state = initialState, action: BaseAction) => {
  switch (action.type) {
    case GET_HOUSEHOLDS:
      return {
        ...state,
        isLoading: true,
        error: null,
      };
    case `${GET_HOUSEHOLDS}_SUCCESS`:
      return {
        ...state,
        households: action.response,
        isLoading: false,
        error: null,
      };
    case `${GET_HOUSEHOLDS}_FAILURE`:
      return {
        ...state,
        isLoading: false,
        error: action.error,
      };
    default:
      return state;
  }
};

export default getAllHouseholdsReducer;
