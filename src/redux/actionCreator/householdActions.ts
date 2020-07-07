import {
  GET_HOUSEHOLDS,
  GET_HOUSEHOLDS_FAILURE,
  GET_HOUSEHOLDS_SUCCESS,
} from '../constants/actionTypes';

// Get households actions
export const getHouseholds = () => ({
  type: GET_HOUSEHOLDS,
});

export const getHouseholdsSuccess = (response: any) => ({
  type: GET_HOUSEHOLDS_SUCCESS,
  response,
});

export const getHouseholdsFailure = (error?: any) => ({
  type: GET_HOUSEHOLDS_FAILURE,
  error,
});
