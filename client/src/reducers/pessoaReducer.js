import {ADD_PESSOA, 
        ADD_PESSOA_SUCCESS, 
        FETCH_PESSOA, 
        FETCH_PESSOA_SUCCESS,
        UPDATE_PESSOA,
        UPDATE_PESSOA_SUCCESS,
        DELETE_PESSOA,
        DELETE_PESSOA_SUCCESS
} from './../actions/pessoaAction';

export default function (state ={data: []}, action) {
  switch (action.type) {
    case ADD_PESSOA:
        return Object.assign({}, state);
    
    case ADD_PESSOA_SUCCESS:
        return Object.assign({}, state, {data: action.payload});
    
    case FETCH_PESSOA:
        return Object.assign({}, state);
    
    case FETCH_PESSOA_SUCCESS:
        return Object.assign({}, state, {data: action.payload});
    
    case UPDATE_PESSOA:
        return Object.assign({}, state);
    
    case UPDATE_PESSOA_SUCCESS:
        return Object.assign({}, state, {data: action.payload});
    
    case DELETE_PESSOA:
        return Object.assign({}, state);
    
    case DELETE_PESSOA_SUCCESS:
        return Object.assign({}, state, {data: action.payload});

    default:
        return state;
  }
}