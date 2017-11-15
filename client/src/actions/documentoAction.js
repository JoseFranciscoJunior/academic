import axios from "axios";
import { API_ROOT_URL,  } from './constants';
import FileSaver from 'file-saver';

export const ADD_DOCUMENTO = 'ADD_DOCUMENTO';
export const ADD_DOCUMENTO_SUCCESS = 'ADD_DOCUMENTO_SUCCESS';
export const FETCH_DOCUMENTO = 'FETCH_DOCUMENTO';
export const FETCH_DOCUMENTO_SUCCESS = 'FETCH_DOCUMENTO_SUCCESS';
export const DOWNLOAD_DOCUMENTO = 'DOWNLOAD_DOCUMENTO';
export const DOWNLOAD_DOCUMENTO_SUCCESS = 'DOWNLOAD_DOCUMENTO_SUCCESS';

var CONFIG = {headers: { 'X-Access-Token': localStorage.getItem('token'), 'Content-Type': 'application/json'}}

export function addDocumento(data) {
  return function (dispatch) {
    dispatch(requestData(ADD_DOCUMENTO));
    return axios.post(`${API_ROOT_URL}/api/documento/create`, JSON.stringify(data), CONFIG)
                .then((response) => {
                  dispatch(receiveData(ADD_DOCUMENTO_SUCCESS, response.data));
                })
  }
}

export function fetchDocumento() {
  return function (dispatch) {
    dispatch(requestData(FETCH_DOCUMENTO));
    return axios.get(`${API_ROOT_URL}/api/documento`, CONFIG)
                .then((response) => {
                  dispatch(receiveData(FETCH_DOCUMENTO_SUCCESS, response.data));
                })
  }
}

export function downDocumento(data) {
  return function (dispatch) {
    dispatch(requestData(DOWNLOAD_DOCUMENTO));
    return axios.post(`${API_ROOT_URL}/api/documento/downloadFile`, JSON.stringify(data), CONFIG)
                .then((response) => {
                  var base64str = response.data;
                  // decode base64 string, remove space for IE compatibility
                  var binary = atob(base64str.replace(/\s/g, ''));
                  var len = binary.length;
                  var buffer = new ArrayBuffer(len);
                  var view = new Uint8Array(buffer);
                  for (var i = 0; i < len; i++) {
                      view[i] = binary.charCodeAt(i);
                  }             
                  var blob = new Blob( [view], { type: "application/pdf" });

                  FileSaver.saveAs(blob, "hello world.pdf");
                  //dispatch(receiveData(DOWNLOAD_DOCUMENTO_SUCCESS, response.blob));
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
