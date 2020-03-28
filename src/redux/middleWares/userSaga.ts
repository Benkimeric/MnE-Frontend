import axios from 'axios';
import { call, put, takeLatest } from 'redux-saga/effects';
import toast from 'toastr';
import AuthenticationHelper from '../../helpers/authentication';
import apiErrorHandler from '../../services/apiErrorHandler';
import UserAPI from '../../services/userAPI';
import {
  closeModalAction,
} from '../actionCreator/modalActions';
import {
  addUserFailure,
  addUserSuccess,
  deleteUserFailure,
  deleteUserSuccess,
  editUsersFailure,
  editUsersSuccess,
  fetchUsersFailure,
  fetchUsersSuccess,
  loginUserFailure,
  loginUserSuccess,
} from '../actionCreator/userActions';
import {
  ADD_USER,
  DELETE_USER,
  EDIT_USERS,
  FETCH_USERS,
  LOGIN_USER,
} from '../constants/actionTypes';
import { BaseAction } from '../reducers/typed';

// LOGIN USER SAGA
export function* loginUserSaga(action: BaseAction) {
  try {
    const { history, ...loginData } = action.data;
    const response = yield call(UserAPI.loginUser, loginData);
    const { data, message } = response.data;
    localStorage.setItem('jwt-token', data.token);
    axios.defaults.headers.common.Authorization = data.token;
    const decoded = yield call(AuthenticationHelper.decodeToken);
    const { userInfo } = decoded;
    yield put(loginUserSuccess(userInfo));
    const url = localStorage.getItem('url');
    toast.success(message);
    setTimeout(() => {
      history.push(url || '/dashboard');
      localStorage.removeItem('url');
    }, 2000);
  } catch (error) {
    const errorMessage = apiErrorHandler(error);
    toast.error(errorMessage);
    yield put(loginUserFailure(errorMessage));
  }
}

export function* watchLoginUserSaga() {
  yield takeLatest(LOGIN_USER, loginUserSaga);
}

// GET ALL USERS
export function* getAllUsersSaga(action: BaseAction) {
  try {
    const response = yield call(UserAPI.fetchUsers);
    const { data } = response.data;
    yield put(fetchUsersSuccess(data.users));
  } catch (error) {
    const errorMessage = apiErrorHandler(error);
    toast.error(errorMessage);
    yield put(fetchUsersFailure(errorMessage));
  }
}

export function* watchGetAllUsersSaga() {
  yield takeLatest(FETCH_USERS, getAllUsersSaga);
}

export function* editUsersSaga(action: any) {
  try {
    const { data, userId } = action;
    const response = yield call(UserAPI.editUser, data, userId);
    const { user } = response.data.data;
    toast.success(response.data.message);

    yield put(editUsersSuccess(user)); // TO DO.. ADD CORRECT RESPONSE
    yield put(closeModalAction())
  } catch (error) {
    const errorMessage = apiErrorHandler(error);
    toast.error(errorMessage);
    yield put(editUsersFailure(errorMessage));
  }
}

export function* watchEditUserSaga() {
  yield takeLatest(EDIT_USERS, editUsersSaga);
}

export function* deleteUserSaga(action: any) {
  try {
    const { userId } = action;
    const response = yield call(UserAPI.deleteUser, userId);
    toast.success(response.data.message);
    const { userId: deletedUserId } = response.data.data.user;

    yield put(deleteUserSuccess(deletedUserId));
  } catch (error) {
    const errorMessage = apiErrorHandler(error);
    toast.error(errorMessage);
    yield put(deleteUserFailure(errorMessage));
  }
}

export function* watchDeleteUserSaga() {
  yield takeLatest(DELETE_USER, deleteUserSaga);
}

export function* addUsersSaga(action: any) {
  try {
    const response = yield call(UserAPI.addUser, action.data);
    const { data, message } = response.data;
    const { user } = data;
    yield put(addUserSuccess(user));
    yield put(closeModalAction())
    toast.success(message);
  } catch (error) {
    const errorMessage = apiErrorHandler(error);
    toast.error(errorMessage);
    yield put(addUserFailure(errorMessage));
  }
}

export function* watchAddUserSaga() {
  yield takeLatest(ADD_USER, addUsersSaga);
}
