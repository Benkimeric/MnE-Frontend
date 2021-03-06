import {
  ADD_USER,
  ADD_USER_FAILURE,
  ADD_USER_SUCCESS,
  CURRENT_USER,
  DELETE_USER,
  DELETE_USER_FAILURE,
  DELETE_USER_SUCCESS,
  EDIT_USERS,
  EDIT_USERS_FAILURE,
  EDIT_USERS_SUCCESS,
  FETCH_USERS,
  FETCH_USERS_FAILURE,
  FETCH_USERS_SUCCESS,
  LOGIN_USER,
  LOGIN_USER_FAILURE,
  LOGIN_USER_SUCCESS
} from '../constants/actionTypes';

// Login user actions
export const loginUser = (data: any) => ({
  type: LOGIN_USER,
  data,
});

export const loginUserSuccess = (response: any) => ({
  type: LOGIN_USER_SUCCESS,
  response,
});

export const loginUserFailure = (error?: any) => ({
  type: LOGIN_USER_FAILURE,
  error,
});

// Current user actions
export const fetchUserData = (data: any) => ({
  type: CURRENT_USER,
  data,
});

// Fetch users actions
export const fetchUsers = () => ({
  type: FETCH_USERS,
});

export const fetchUsersSuccess = (response: any) => ({
  type: FETCH_USERS_SUCCESS,
  response,
});

export const fetchUsersFailure = (error?: any) => ({
  type: FETCH_USERS_FAILURE,
  error,
});

// Edit user actions
export const editUsers = (data: any, userId: string) => ({
  type: EDIT_USERS,
  data,
  userId,
});

export const editUsersSuccess = (response: any) => ({
  type: EDIT_USERS_SUCCESS,
  response,
});

export const editUsersFailure = (error: any) => ({
  type: EDIT_USERS_FAILURE,
  error,
});

// Delete user actions
export const deleteUser = (userId: string) => ({
  type: DELETE_USER,
  userId,
});

export const deleteUserSuccess = (response: any) => ({
  type: DELETE_USER_SUCCESS,
  response,
});

export const deleteUserFailure = (error: any) => ({
  type: DELETE_USER_FAILURE,
  error,
});

// Add user actions
export const addUser = (data: any) => ({
  type: ADD_USER,
  data,
});

export const addUserSuccess = (response: any) => ({
  type: ADD_USER_SUCCESS,
  response,
});

export const addUserFailure = (error: any) => ({
  type: ADD_USER_FAILURE,
  error,
});
