import { AUTH, AUTH_SUCCESS } from './../actions/loginAction';

const initialState = {
  token: null,
  diretorio: null,
  userName: null,
  isAuthenticated: false,
  isAuthenticating: false
}
export default function(state = initialState, action) {
  switch (action.type) {
    case AUTH:
      return Object.assign({}, state, {isAuthenticating: true})

    case AUTH_SUCCESS: 
      return Object.assign({}, state, {isAuthenticating: false, 
                                      isAuthenticated: true,
                                      token: action.payload.token,
                                      data: action.payload})
    default:
      return state;
  }
}