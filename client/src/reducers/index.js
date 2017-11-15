import { combineReducers } from 'redux';
import FaculdadeReducer from './faculdadeReducer';
import DiretorioReducer from  './diretorioReducer';
import LoginReducer from './loginReducer';
import FuncaoReducer from './funcaoReducer';
import PessoaReducer from './pessoaReducer';
import DocumentoReducer from './documentoReducer';

const rootReducer = combineReducers({
  faculdade: FaculdadeReducer,
  diretorio: DiretorioReducer,
  auth: LoginReducer,
  funcao: FuncaoReducer,
  pessoa: PessoaReducer,
  documento: DocumentoReducer
})

export default rootReducer;