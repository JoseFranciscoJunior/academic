import React, {Component} from 'react';
import Page from './../Page/page';
import Paper from 'material-ui/Paper';
import Divider from 'material-ui/Divider';
import AutoComplete from 'material-ui/AutoComplete';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import { connect } from "react-redux";
import { fetchFaculdade } from './../../actions/faculdadeAction';
import { addDiretorio } from './../../actions/diretorioAction';

import './diretorioAcademico.css';

class diretorioAcademicoPage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            instituicao: '',
            curso: '',
            cnpj: '',
            nome: '',
            logo: '',
            data_uri: '',
            fileType: ''
        }

        this.onsubmit = this.onsubmit.bind(this);
    }

    handleComplet(event, value) {
        this.setState({
            [event]: value,
        })
    }

    handleText(event, value) {
        this.setState({
            [event]: value.target.value
        })
    }

    handleFile(e) {

        const reader = new FileReader();
        const file = e.target.files[0];
        
         reader.onload = (upload) => {
             this.setState({
                 data_uri: upload.target.result,
                 fileName: file.name,
                 fileType: file.Type
             });
         }
    }
    onsubmit() {
        var data ={
            fk_id_cursoFaculdade: this.state.curso.value,
            nome: this.state.nome,
            CNPJ: this.state.cnpj,
            caminhoFoto: this.state.logo
        }
        
        this.props.addDiretorio(data)
    }

    componentWillMount() {
        this.props.fetchFaculdade();
    }

    render() {    
        const faculdade = this.props.faculdade;
        var dataFaculdade = faculdade.data.map((f) => {return {value: f.id, text: f.nome}});       
        var dataCurso = this.state.instituicao ? faculdade.data[0].cursos.map(c => {
            (c.cursoFaculdade.fk_id_faculdade == this.state.instituicao.value)
             return {value: c.cursoFaculdade.id, text: c.nome}
            }) : [];

        return (
            <Page>
                <Paper zDepth={2}  style={{width: '96%'}} className='container'>
                    <div
                        style={{
                        padding: '.5em',
                        paddingLeft: '1em',
                    }}>
                        <h3> Diretório Acadêmico</h3>
                    </div>

                    <Divider/>

                    <div className='form'>
                        <div>
                            <AutoComplete
                                floatingLabelText="Instituição"
                                dataSource={dataFaculdade}
                                filter={AutoComplete.fuzzyFilter}
                                openOnFocus={true}
                                onNewRequest={this.handleComplet.bind(this, 'instituicao')}/>

                            <AutoComplete
                                floatingLabelText="Curso"
                                dataSource={dataCurso}
                                filter={AutoComplete.fuzzyFilter}
                                openOnFocus={true}
                                onNewRequest={this.handleComplet.bind(this, 'curso')}/>
                            
                        </div>

                        <div
                            style={{
                            paddingBottom: '1em'
                        }}>
                            <TextField 
                                floatingLabelText="CNPJ"
                                defaultValue={this.state.cnpj}
                                onBlur={this.handleText.bind(this, 'cnpj')}/>

                            <TextField floatingLabelText="Diretório Acadêmico"
                                       defaultValue={this.state.nome}
                                       onBlur={this.handleText.bind(this, 'nome')}/>
                        </div>
                    </div>
                </Paper>
            </Page>
        )
    }
}

function mapStateToProps (state) {
    return { faculdade: state.faculdade,
             diretorio: state.diretorio 
    }
}

export default connect(mapStateToProps, { fetchFaculdade, addDiretorio })(diretorioAcademicoPage);