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
  LOGIN_USER_SUCCESS,
} from '../constants/actionTypes';
import { BaseAction } from './typed';
import { UserStateInterface } from './typed';

const initialState: UserStateInterface = {
  currentUser: {},
  users: [],
  isLoading: false,
  error: null,
};

const loginUserReducer = (state = initialState, action: BaseAction) => {
  switch (action.type) {
    case LOGIN_USER:
      return {
        ...state,
        isLoading: true,
      };
      case CURRENT_USER:
        return {
          ...state,
          isLoading: true,
        };
    case LOGIN_USER_SUCCESS:
      return {
        ...state,
        currentUser: action.response,
        isLoading: false,
      };
    case LOGIN_USER_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: action.error,
      };
    default:
      return state;
  }
};

const getUsersReducer = (state = initialState, action: BaseAction) => {
  switch (action.type) {
    case FETCH_USERS:
      return {
        ...state,
        isLoading: true,
        error: null,
      };
    case FETCH_USERS_SUCCESS:
      return {
        ...state,
        users: action.response,
        isLoading: false,
        error: null,
      };
    case FETCH_USERS_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: action.error,
      };
    default:
      return loginUserReducer(state, action);
  }
};

const editUserReducer = (state = initialState, action: BaseAction) => {
  switch (action.type) {
    case EDIT_USERS:
      return {
        ...state,
        isLoading: true,
      };
    case EDIT_USERS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        users: state.users?.map((user: any) =>
          user.userId !== action.response.userId
            ? user
            : { ...user, ...action.response }
        ),
      };
    case EDIT_USERS_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: action.error,
      };
    default:
      return getUsersReducer(state, action);
  }
};

const deleteUserReducer = (state = initialState, action: BaseAction) => {
  switch (action.type) {
    case DELETE_USER:
      return {
        ...state,
        isLoading: true,
      };
    case DELETE_USER_SUCCESS:
      return {
        ...state,
        isLoading: false,
        users: state.users?.filter(
          (user: any) => user.userId !== action.response
        ),
      };
    case DELETE_USER_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: action.error,
      };
    default:
      return editUserReducer(state, action);
  }
};

const addUserReducer = (state = initialState, action: BaseAction) => {
  switch (action.type) {
    case ADD_USER:
      return {
        ...state,
        isLoading: true,
      };
    case ADD_USER_SUCCESS:
      return {
        ...state,
        isLoading: false,
        users: [...state.users, action.response],
      };
    case ADD_USER_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: action.error,
      };
    default:
      return deleteUserReducer(state, action);
  }
};

export default addUserReducer;
