import axios from 'axios';
import { API_ROOT_URL, CONFIG } from './constants';

export const ADD_PESSOA = 'ADD_PESSOA';
export const ADD_PESSOA_SUCCESS = 'ADD_PESSOA_SUCCESS';
export const UPDATE_PESSOA = 'UPDATE_PESSOA';
export const UPDATE_PESSOA_SUCCESS = 'UPDATE_PESSOA_SUCCESS';
export const DELETE_PESSOA = 'DELETE_PESSOA';
export const DELETE_PESSOA_SUCCESS = 'DELETE_PESSOA_SUCCESS';
export const FETCH_PESSOA = 'FETCH_PESSOA';
export const FETCH_PESSOA_SUCCESS = 'FETCH_PESSOA_SUCCESS';

export function addPessoa(data) {
  return function (dispatch) {
    dispatch(requestData(ADD_PESSOA));
    return axios.post(`${API_ROOT_URL}/api/pessoa/create`, data, CONFIG)
                .then((response) => {
                  dispatch(receiveData(ADD_PESSOA_SUCCESS, response.data));
                })
  }
}

 export function fetchPessoa() {
  return function (dispatch) {
    dispatch(requestData(FETCH_PESSOA));
    return axios.get(`${API_ROOT_URL}/api/pessoa/${JSON.parse(localStorage.getItem('user')).diretorio}`, CONFIG)
                .then((response) => {
                  dispatch(receiveData(FETCH_PESSOA_SUCCESS, response.data));
                })
  }
 }

 export function updatePessoa(data, id) {
  return function (dispatch) {
    dispatch(requestData(UPDATE_PESSOA));
    return axios.put(`${API_ROOT_URL}/api/pessoa/update/${id}`, data, CONFIG)
                .then((response) => {
                  dispatch(receiveData(UPDATE_PESSOA_SUCCESS, response.data));
                })
  }
 }

 export function deletePessoa(id) {
  return function (dispatch) {
    dispatch(requestData(DELETE_PESSOA));
    return axios.delete(`${API_ROOT_URL}/api/pessoa/delete/${id}`, CONFIG)
                .then((response) => {
                  dispatch(receiveData(DELETE_PESSOA_SUCCESS, response.data));
                })
  }
 }

function requestData(type) {
  return {type: type}
}

function receiveData(type, data) {
  return { 
    type: type,
    payload: data
  }
}