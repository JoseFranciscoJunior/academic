import axios from 'axios';
import { API_ROOT_URL, CONFIG } from './constants';

export const FETCH_FUNCAO = 'FETCH_FUNCAO';
export const FETCH_FUNCAO_SUCCESS = 'FETCH_FUNCAO_SUCCESS';

export function fetchFuncao() {
  return function (dispatch) {
    dispatch(requestData());
    return axios.get(`${API_ROOT_URL}/api/funcao`, CONFIG)
                .then((response) => {
                  dispatch(receiveData(response.data));
                })
  }
}

function requestData() {
  return {type: FETCH_FUNCAO}
}

function receiveData(data) {
  return { 
    type: FETCH_FUNCAO_SUCCESS,
    payload: data
  }
}