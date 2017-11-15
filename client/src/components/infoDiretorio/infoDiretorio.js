import React, { Component } from 'react';
import Page from './../Page/page';
import Paper from 'material-ui/Paper';
import Divider from 'material-ui/Divider';

class InfoPessoa extends Component {

    constructor () {
        super();
    }

    render() {
        
        let pessoa = this.props.pessoa.data;

        return (
            <Page >
                <RaisedButton backgroundColor='#337AB7' labelColor='#fff' onClick={this.handleModal.bind(this, 'create')} style={{left: 0 ,position: 'sticky'}} label="Novo"/>
                    {this.state.showModal ? this.contentModal() : null}
                <Paper zDepth={2} style={{marginTop: '2em', width: '100%'}}>
                    <h3 style={{paddingLeft: '2em'}} > Documentos </h3>
                    <Divider/>
                    <div style={{padding: '1em', height: '65vh', overflow: 'auto'}}>
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
        funcao: state.funcao
    }
}

export default connect(mapStateToProps, { fetchDiretorio })(InfoPessoa);