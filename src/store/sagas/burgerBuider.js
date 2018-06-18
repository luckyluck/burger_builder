import { put } from 'redux-saga/effects';

import axios from '../../shared/axios-orders';

import * as actions from '../actions';

export function* initIngredientsSaga() {
    try {
        const response = yield axios.get('ingredients.json');
        yield put(actions.setIngredients(response.data));
    } catch(error) {
        yield put(actions.setIngredientsFailed());
    }
}
