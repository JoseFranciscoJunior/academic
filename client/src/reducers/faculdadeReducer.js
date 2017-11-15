import { FETCH_FACULDADE,
         FETCH_FACULDADE_SUCCESS 
        } from './../actions/faculdadeAction';

export default function (state = {isFetching: false, data: []}, action) {
  switch (action.type) {
    case FETCH_FACULDADE:
        return Object.assign({}, state, {isFetching: true})
    
    case FETCH_FACULDADE_SUCCESS: 
        return Object.assign({}, state, {isFetching: false, data: action.payload})
    default:
        return state;
  }
}