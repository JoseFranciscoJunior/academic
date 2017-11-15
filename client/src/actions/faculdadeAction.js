import axios from "axios";
import { API_ROOT_URL, CONFIG } from './constants';

export const FETCH_FACULDADE = 'FETCH_FACULDADE';
export const FETCH_FACULDADE_SUCCESS = 'FETCH_FACULDADE_SUCCESS';
export const ADD_DIRETORIO = 'ADD_DIRETORIO';

export function fetchFaculdade() {
  return function (dispatch) {
      dispatch(requestData());
      return axios.get(`${API_ROOT_URL}/api/faculdade`, CONFIG)
                            .then((response) => {
                            dispatch(receiveData(response.data));
                          })
  };
}

function requestData() {
  return {type: FETCH_FACULDADE}
}

function receiveData(data) {
  return { 
    type: FETCH_FACULDADE_SUCCESS,
    payload: data
  }
}
