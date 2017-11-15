import {FETCH_FUNCAO, FETCH_FUNCAO_SUCCESS } from './../actions/funcaoAction';

export default function (state ={data: []}, action) {
  switch (action.type) {
    case FETCH_FUNCAO:
        return Object.assign({}, state);
    
    case FETCH_FUNCAO_SUCCESS:
        return Object.assign({}, state, {data: action.payload});
    
    default:
        return state;
  }
}