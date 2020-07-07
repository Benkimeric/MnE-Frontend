import { all } from 'redux-saga/effects';
import { watchGetAllHouseholdsSaga } from './householdSaga';
import {
  watchAssignRoleSaga,
  watchDeleteAssignedRoleSaga,
  watchGetRoleSaga,
  watchGetRolesSaga
} from './roleSaga';
import {
  watchAddUserSaga,
  watchCurrentUsersSaga,
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
    watchCurrentUsersSaga(),
    watchGetAllHouseholdsSaga(),
  ]);
}
