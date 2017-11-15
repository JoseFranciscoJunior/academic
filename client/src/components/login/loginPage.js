import React, { Component } from 'react';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import { withRouter } from 'react-router-dom';
import AlertContainer from 'react-alert'

import { connect } from 'react-redux';
import { authenticate } from './../../actions/loginAction';

import './login.css';

class LoginPage extends Component {
    constructor() {
        super();
        this.state = {
            email: '',
            senha: '',
            erroEMAIL: '',
            erroSENHA: '' 
        }

        this.authenticate = this.authenticate.bind(this);
       // this.showAlert = this.showAlert.bind(this);
    }

    handleText(nome, evento, value) {
        this.setState({
            [nome]: value
        });
    }

    alertOptions = {
        offset: 14,
        position: 'bottom left',
        theme: 'dark',
        time: 5000,
        transition: 'scale'
      }
    
      showAlert() {
        this.msg.show('Some text or component', {
          time: 2000,
          type: 'success',
          icon: <img src="path/to/some/img/32x32.png" />
        })
      }

    componentWillReceiveProps (nextProps) {
    }
    
    authenticate() {
        let erroCampo = false; 
        let data = {
            email: this.state.email,
            senha: this.state.senha
        }
        
        for(var a in data) {
            if(!data[a]) {
                this.setState({
                    ['erro' + a.toUpperCase()]: 'Campo Obrigatório'
                });
                erroCampo = true;
            }
        }
        
        if(!erroCampo) {
            this.props.authenticate(data);
        }
    }
    
    render() {
        let auth = this.props.auth;

        if(auth && auth.token) {
            localStorage.setItem('token', auth.token);
            localStorage.setItem('user', JSON.stringify({'nome': auth.user.nome, 'diretorio': auth.user.fk_id_diretorio}))   
            this.props.history.push('/pessoa')
        } else {
        }
        
        return (
            <div className='pageLogin'>
                <div className='containerLogo'>
                    <img width='100%' src='./../../../assets/img/logo_white.png' />
                </div>
                <div className='containerForm'>
                    <div className='containerInput'>
                    <TextField underlineFocusStyle={{borderColor: '#000000'}} errorText={this.state.erroEMAIL} floatingLabelStyle={{color: '#5B5B5B'}} value={this.state.email} onChange={this.handleText.bind(this, 'email')} fullWidth={true} floatingLabelText="Email"/>                      
                    <TextField underlineFocusStyle={{borderColor: '#000000'}} errorText={this.state.erroSENHA} floatingLabelStyle={{color: '#5B5B5B'}} value={this.state.senha} onChange={this.handleText.bind(this, 'senha')} fullWidth={true} floatingLabelText="Senha" type="password"/>                      

                        <AlertContainer msg='teste' {...this.alertOptions} />

                    <RaisedButton onClick={this.authenticate} label="Entrar" style={{marginTop: '2em'}} primary={true}/>
                    </div>
                </div>
            </div>
        );
    }
}

function mapStateToProps (state) {
    return {
        auth: state.auth.data,
        token: state.auth.token
    }
}

export default withRouter(connect(mapStateToProps, {authenticate})(LoginPage));