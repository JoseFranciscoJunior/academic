import React, { Component } from 'react';
import LoginPage from './components/login/loginPage';
import diretorioAcademicoPage from './components/diretorioAcademico/diretorioAcademicoPage';
import pessoaPage from './components/pessoa/pessoa';
import documento from './components/documento/documento';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { BrowserRouter as Router, Route, Redirect} from 'react-router-dom';
import injectTapEventPlugin from 'react-tap-event-plugin';
import configureStore from './store';
import { Provider } from 'react-redux';

import './App.css';
require('font-awesome/css/font-awesome.min.css');
const store = configureStore();
injectTapEventPlugin();

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route {...rest} render={props => (
    localStorage.getItem('token') ?
         (
         <Component {...props}/>
        )
    : (
      <Redirect to={{
        pathname: '/',
        state: { from: props.location }
      }} />
    )
  )} />
)

class App extends Component {
  render() {
    return (
      <div className="App">
        <Provider store={store}>
          <MuiThemeProvider>
            <Router >
                <div>
                  <Route exact path="/" component={LoginPage}/>
                  <PrivateRoute exact path="/diretorioAcademico" component={diretorioAcademicoPage}/>
                  <PrivateRoute exact path="/pessoa" component={pessoaPage}/>
                  <PrivateRoute exact path="/documento" component={documento}/>
                </div>
              </Router>
          </MuiThemeProvider>
        </Provider>
      </div>
    );
  }
}

export default App;
