import { ADD_DOCUMENTO,
  ADD_DOCUMENTO_SUCCESS,
  FETCH_DOCUMENTO,
  FETCH_DOCUMENTO_SUCCESS,
  DOWNLOAD_DOCUMENTO,
  DOWNLOAD_DOCUMENTO_SUCCESS
 } from './../actions/documentoAction';

export default function (state = {isFetching: false, data: []}, action) {
  switch (action.type) {
    case ADD_DOCUMENTO:
        return Object.assign({}, state, {isFetching: true})

  case ADD_DOCUMENTO_SUCCESS: 
      return Object.assign({}, state, {isFetching: false, data: action.payload})
  
  case FETCH_DOCUMENTO:
      return Object.assign({}, state, {isFetching: true})

  case FETCH_DOCUMENTO_SUCCESS: 
      return Object.assign({}, state, {isFetching: false, data: action.payload})

  case ADD_DOCUMENTO:
      return Object.assign({}, state, {isFetching: true})

  case ADD_DOCUMENTO_SUCCESS: 
      return Object.assign({}, state, {isFetching: false, data: action.payload})
  default:
    return state;
  }
}