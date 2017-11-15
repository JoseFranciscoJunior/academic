import axios from 'axios';
import { API_ROOT_URL } from './constants';

export const AUTH = 'AUTH';
export const AUTH_SUCCESS = 'AUTH_SUCCESS';

export function authenticate(data) {
  return function (dispatch) {
    dispatch(requestData());
    return axios.post(`${API_ROOT_URL}/login`, data)
                .then((response) => {
                  dispatch(receiveData(response.data));
                })
  }
}

function requestData() {
  return {type: AUTH}
}

function receiveData(data) {
  return {
    type: AUTH_SUCCESS,
    payload: data
  }
}

