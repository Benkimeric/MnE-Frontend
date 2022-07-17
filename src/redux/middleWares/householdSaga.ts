import { call, put, takeLatest } from 'redux-saga/effects';
import apiErrorHandler from '../../services/apiErrorHandler';
import HouseholdAPI from '../../services/householdAPI';
import {
  getHouseholdsFailure,
  getHouseholdsSuccess,
} from '../actionCreator/householdActions';
import { GET_HOUSEHOLDS } from '../constants/actionTypes';
import { BaseAction } from '../reducers/typed';

// GET ALL HOUSEHOLDS  SAGA
export function* getAllHouseholdsSaga(action: BaseAction) {
  try {
    const response = yield call(HouseholdAPI.fetchHouseholds);
    const {
      data: { households },
    } = response.data;
    yield put(getHouseholdsSuccess(households));
  } catch (error) {
    const errorMessage = apiErrorHandler(error);
    yield put(getHouseholdsFailure(errorMessage));
  }
}

export function* watchGetAllHouseholdsSaga() {
  yield takeLatest(GET_HOUSEHOLDS, getAllHouseholdsSaga);
}
