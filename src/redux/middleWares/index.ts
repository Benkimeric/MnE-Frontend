import { all } from 'redux-saga/effects';
import {
  watchAssignRoleSaga,
  watchDeleteAssignedRoleSaga,
  watchGetRoleSaga,
  watchGetRolesSaga
} from './roleSaga';
import {
  watchAddUserSaga,
  watchDeleteUserSaga,
  watchEditUserSaga,
  watchGetAllUsersSaga,
  watchLoginUserSaga,
} from './userSaga';

export default function* rootSaga() {
  yield all([
    watchLoginUserSaga(),
    watchGetRoleSaga(),
    watchGetRolesSaga(),
    watchGetAllUsersSaga(),
    watchAssignRoleSaga(),
    watchDeleteAssignedRoleSaga(),
    watchEditUserSaga(),
    watchDeleteUserSaga(),
    watchAddUserSaga(),
  ]);
}
