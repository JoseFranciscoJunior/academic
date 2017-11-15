import React, { Component } from 'react';
import Page from './../Page/page';
import Paper from 'material-ui/Paper';
import Divider from 'material-ui/Divider';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import ReactModal from 'react-modal';
import { InputCPF } from './../../utils/input';
import { fetchFuncao } from './../../actions/funcaoAction';
import { addPessoa, fetchPessoa, updatePessoa, deletePessoa } from './../../actions/pessoaAction';
import { connect } from "react-redux";

import './pessoa.css';

class Pessoa extends Component {

    constructor () {
        super();
        this.state = {
            showModal: false,
            modalType: '',
            nome: '',
            funcao: '',
            cpf: '',
            email: '',
            senha: '',
            confirmaSenha: '',
            erroNOME: '',
            erroFUNCAO: '',
            erroCPF: '',
            erroEMAIL: '',
            erroSENHA: '',
            erroCONFIMARSENHA: '',
            itemUp: ''
        };
        this.baseState = this.state;
        delete this.baseState.showModal;
        delete this.baseState.modalType;

        this.onSubmit = this.onSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.clearState = this.clearState.bind(this);
        this.contentModal = this.contentModal.bind(this);
        this.form = this.form.bind(this);
        this.deletePessoa = this.deletePessoa.bind(this);
    }

    componentWillMount() {
        this.props.fetchFuncao();
        this.props.fetchPessoa();
    }

    handleModal(type, item) {
        this.setState({
            showModal: !this.state.showModal,
            modalType: type
        })

        if(this.state.showModal) {
            this.contentModal()
        }

        if(type == 'update') {
            this.setState({
                nome: item.nome,
                funcao: item.funcoes.id,
                cpf: item.CPF,
                email: item.email,
                senha: item.senha,
                confirmaSenha: item.confirmaSenha,
                itemUp: item
            })
        } 
        if(type == 'create') {
            this.clearState()
        } 

        if(type == 'delete') {
            this.setState({
                itemUp: item
            })
        } 
    }

    clearState() {
        this.setState(this.baseState);
    }

    handleText(nome, event, value) {
        this.setState({
            [nome]: event.target.value        });
    }

    handleChange (event, index, value) {
        this.setState({funcao: value});
    } 
    
    onSubmit() {
        let erroCampo = false;
        let data = {
            email: this.state.email,
            senha: this.state.senha,
            confirmaSenha: this.state.confirmaSenha,
            nome: this.state.nome,
            CPF: this.state.cpf,
            funcao: this.state.funcao,
        }

        for( var i in data) {
            if(!data[i]) {
            this.setState({
                ['erro' + i.toUpperCase()]: 'Campo Obrigatório'
            })
            erroCampo = true;
            }
        }

        if(data.senha != data.confirmaSenha) {
            this.setState({
                erroCONFIRMASENHA: 'Senha não confere'
            })
            erroCampo = true;
        }

        if (!erroCampo) {
            data.fk_id_diretorio = JSON.parse(localStorage.getItem('user')).diretorio
            data['funcaoID'] = data['funcao'];
            delete data.funcao;

            console.log(data)
            this.state.modalType == 'create' ? this.props.addPessoa(data) : this.props.updatePessoa(data, this.state.itemUp.id);
            this.clearState();
            this.handleModal()
        }
    }

    deletePessoa() {
        this.props.deletePessoa(this.state.itemUp.id);
        this.handleModal();
    }

    form() {
        let funcao = this.props.funcao.data;

        return(
            <ReactModal overlayClassName="Overlay" className='modal' isOpen={this.state.showModal} >
                <div className='formUser'>
                    <div style={{display: 'flex', justifyContent:'space-between', width: '100%', flexDirection: 'row'}}>
                        <TextField underlineFocusStyle={{borderColor: '#000000'}} errorText={this.state.erroNOME}
                                floatingLabelStyle={{color: '#5B5B5B'}} value={this.state.nome} 
                                onChange={this.handleText.bind(this, 'nome')} fullWidth={true} 
                                floatingLabelText="Nome do integrante"/>

                        <SelectField onChange={this.handleChange}
                                    floatingLabelStyle={{color: '#5B5B5B'}}
                                    underlineFocusStyle={{borderColor: '#000000'}}
                                    floatingLabelText="Função"
                                    value={this.state.funcao}
                                    fullWidth={true} errorText = {this.state.erroFUNCAO}
                                    style={{marginLeft: '2em'}}>
                                {
                                    funcao.map(f => {
                                        return (<MenuItem key={f.id} value={f.id} primaryText={f.nome} />)
                                    })
                                }
                        </SelectField>
                    </div>

                    <div style={{display: 'flex', justifyContent:'space-between', width: '100%', flexDirection: 'row'}}>
                        <InputCPF label='CPF' id='cpf' 
                                value={this.state.cpf} errorText={this.state.erroCPF}
                                onChange={this.handleText.bind(this, 'cpf')}/>

                        <TextField underlineFocusStyle={{borderColor: '#000000'}} errorText={this.state.erroEMAIL}
                                floatingLabelStyle={{color: '#5B5B5B'}} value={this.state.email} 
                                onChange={this.handleText.bind(this, 'email')} fullWidth={true} 
                                style={{marginLeft: '2em'}} floatingLabelText="Email"/>
                    </div>

                    <div style={{display: 'flex', justifyContent:'space-between', width: '100%', flexDirection: 'row'}}>
                        <TextField underlineFocusStyle={{borderColor: '#000000'}} errorText={this.state.erroSENHA}
                                floatingLabelStyle={{color: '#5B5B5B'}} type='password' 
                                value={this.state.senha} onChange={this.handleText.bind(this, 'senha')} 
                                fullWidth={true} floatingLabelText="Senha"/>

                        <TextField underlineFocusStyle={{borderColor: '#000000'}} 
                                floatingLabelStyle={{color: '#5B5B5B'}} type='password' errorText={this.state.erroCONFIRMASENHA}
                                value={this.state.confirmaSenha} onChange={this.handleText.bind(this, 'confirmaSenha')} 
                                fullWidth={true} style={{marginLeft: '2em'}} floatingLabelText="Confirmar Senha"/>
                    </div>
                </div>

                <div className='group-button'>
                    <RaisedButton onClick={this.onSubmit} label="Salvar" backgroundColor='#5CB85C' labelColor='#fff' />
                    <RaisedButton label="Cancelar" onClick={this.handleModal.bind(this)} backgroundColor='#fff' labelColor='#000'/>
                </div>
            </ReactModal>
        )
    }

    contentModal() {
        switch(this.state.modalType) {
            case 'create':
                return this.form()
            case 'update': 
                let item = this.state.itemUp
                return this.form()

            case 'delete':
                return <ReactModal overlayClassName="Overlay" className='modal' isOpen={this.state.showModal} >
                            <div className='modalDelete' >
                                <h3> Tem certeza que deseja excluir esse usuário?</h3>
                                <h4> {this.state.itemUp.nome} </h4>
                                <RaisedButton onClick={this.deletePessoa} label="Sim" backgroundColor='#5CB85C' labelColor='#fff' />
                                <RaisedButton label="Não" onClick={this.handleModal.bind(this)} style={{marginLeft: '2em'}} backgroundColor='#fff' labelColor='#000'/>
                            </div>
                       </ReactModal>
        }
    }

    render() {
        
        let pessoa = this.props.pessoa.data;

        return (
            <Page title = 'Pessoa'>
                <RaisedButton backgroundColor='#337AB7' labelColor='#fff' onClick={this.handleModal.bind(this, 'create')} style={{left: 0 ,position: 'sticky'}} label="Novo"/>
                    {this.state.showModal ? this.contentModal() : null}
                <Paper style={{marginTop: '2em', width: '100%'}}>
                    <h3 style={{paddingLeft: '2em'}} > Pessoa </h3>
                    <Divider/>
                    <div style={{padding: '1em', maxHeight: '65vh', overflow: 'auto'}}>
                    <table className="mui-table">
                        <thead>
                            <tr>
                            <th>#</th>
                            <th>Nome</th>
                            <th>CPF</th>
                            <th>Função</th>
                            <th>Ações</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                pessoa.map((p ,i) => {
                                    return <tr>
                                    <td>{i + 1}</td>
                                    <td>{p.nome}</td>
                                    <td>{p.CPF}</td>
                                    <td>{p.funcoes.nome}</td>
                                    <td>
                                        <i onClick={this.handleModal.bind(this, 'update', p)} style={{cursor: 'pointer'}} className="fa fa-pencil fa-2x"></i>
                                        <i onClick={this.handleModal.bind(this, 'delete', p)} style={{cursor: 'pointer', marginLeft: '1em'}} className="fa fa-trash fa-2x" aria-hidden="true"></i>
                                     </td>
                                    </tr>
                                })
                            }
                        </tbody>
                        </table>
                    </div>
                </Paper>
            </Page>
        )
    }
}

function mapStateToProps (state) {
    return {
        funcao: state.funcao,
        pessoa: state.pessoa
    }
}

export default connect(mapStateToProps, { fetchFuncao, addPessoa, fetchPessoa, updatePessoa, deletePessoa })(Pessoa);