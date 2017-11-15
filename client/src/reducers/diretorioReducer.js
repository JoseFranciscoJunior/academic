import { ADD_DIRETORIO, ADD_DIRETORIO_SUCCESS } from './../actions/diretorioAction';

export default function (state = {isFetching: false, data: []}, action) {
  switch (action.type) {
    case ADD_DIRETORIO:
        return Object.assign({}, state, {isFetching: true})
    
    case ADD_DIRETORIO_SUCCESS:
        return Object.assign({}, state, {isFetching: false, data: action.payload})
    default:
        return state;
  }
}