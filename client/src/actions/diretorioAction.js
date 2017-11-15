import axios from "axios";
export const ADD_DIRETORIO = 'ADD_DIRETORIO';
export const ADD_DIRETORIO_SUCCESS = 'ADD_DIRETORIO_SUCCESS';

const API_ROOT_URL = "http://localhost:3001";


export function addDiretorio(data) {
  return function (dispatch) {
    dispatch(requestPost());
    return axios.post(`${API_ROOT_URL}/api/diretorioAcademico`, data)
                .then((response) => {
                  dispatch(receiveData(response.data));
                })
  }
}

function requestPost() {
  return {type: ADD_DIRETORIO}
}

function receiveData(data) {
  return {
    type: ADD_DIRETORIO_SUCCESS,
    payload: data
  }
}

