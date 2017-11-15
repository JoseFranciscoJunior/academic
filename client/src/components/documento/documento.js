import React, { Component } from 'react';
import Page from './../Page/page';
import Paper from 'material-ui/Paper';
import Divider from 'material-ui/Divider';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton'
import { connect } from 'react-redux';
import {Card, CardActions, CardHeader, CardText, CardTitle} from 'material-ui/Card';
import ReactModal from 'react-modal';
import TextField from 'material-ui/TextField';
import { addDocumento, fetchDocumento, downDocumento } from './../../actions/documentoAction';
import ReactTooltip from 'react-tooltip'
import Dialog from 'material-ui/Dialog';
import GooglePicker from 'react-google-picker';

import './documento.css';

const CLIENT_ID = '440387728341-170312p7i9k2f5hpe8t73ek8cv6ro5hm.apps.googleusercontent.com';
const DEVELOPER_KEY = 'AIzaSyBGHKqGWcsvDx7sp9m7WIzqEwCrFC-jrCA';
const SCOPE = ['https://www.googleapis.com/auth/drive.readonly',
               'https://www.googleapis.com/auth/drive',
               'https://www.googleapis.com/auth/drive.file',
               'https://www.googleapis.com/auth/drive.metadata',
               'https://www.googleapis.com/auth/drive.appfolder',
               'https://www.googleapis.com/auth/drive.scripts'];

class Documento extends Component {

    constructor () {
        super();

        this.state = {
          modal: false,
          modalType: '',
          file: '',
          imagePreviewUrl: '',
          fileName: '',
          nome: '',
          erroNOME: '',
          openDiolog: false
        }
        this.baseState = this.state;

        delete this.baseState.modal;
        delete this.baseState.modalType;

        this.handleFile = this.handleFile.bind(this);
        this.contentModal = this.contentModal.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.clearState = this.clearState.bind(this);
        this.handleDialog = this.handleDialog.bind(this);
    }

    componentWillMount() {
      this.props.fetchDocumento()
    }

    handleModal(type) {
      this.setState({
        modal: !this.state.modal,
        modalType: type
      }) 

      if(this.state.modal) {
        this.contentModal()
      }
    }

    handleDialog() {
      this.setState({
        openDiolog: !this.state.openDiolog
      })
    }

    handleText(nome, evento, value) {
      this.setState({
          [nome]: value
      });
    }

    downloadFile(file) {
      let data = {file: file.caminho}
      this.props.downDocumento(data);
    }

    clearState() {
      this.setState(this.baseState);
    }

    onSubmit(e) {
      e.preventDefault();
      let erroCampo = false;

      if (!this.state.nome) {
        this.setState({
          erroNOME: 'Campo Obrigatório'
        });
        erroCampo = true
      }

      if(!this.state.file) {
        this.handleDialog()
        erroCampo = true
      }

      if(!erroCampo) {
        let data = {
            file: this.state.imagePreviewUrl,
            nome: this.state.nome,
            extensao: this.state.fileName.split('.')[1],
            diretorio: JSON.parse(localStorage.getItem('user')).diretorio,
            autor: JSON.parse(localStorage.getItem('user')).nome
          }; 

        this.props.addDocumento(data);
        this.clearState();
        this.handleModal();
      }
    }

    handleFile(e) {
      let reader = new FileReader();
      let file = e.target.files[0];
      e.preventDefault();

      reader.onloadend = () => {
        this.setState({
          file: file,
          imagePreviewUrl: reader.result,
          fileName: file.name,
          nome: file.name.split('.')[0],
        });
      }
  
      reader.readAsDataURL(file)
    }

    form() {
      const actions = [
        <FlatButton
          label="Fechar"
          primary={true}
          onClick={this.handleDialog}
        />,
      ];

      return <ReactModal overlayClassName="Overlay" className='modalDocumento' isOpen={this.state.modal}>
              <div className='form'>
                <TextField style={{paddingLeft: 0}} underlineFocusStyle={{borderColor: '#000000'}} errorText={this.state.erroNOME}
                          floatingLabelStyle={{color: '#5B5B5B'}} value={this.state.nome} 
                          onChange={this.handleText.bind(this, 'nome')}
                          floatingLabelText="Nome do arquivo"/>
                <h3 style={{textOverflow: 'ellipsis', textAlign: 'center', fontSize: '1em', fontWeight: 'bold'}} > {this.state.fileName} </h3>
                
                <Dialog
                title="Arquivo não informado"
                modal={false}
                actions={actions}
                open={this.state.openDiolog}
                onRequestClose={this.handleClose}
              >
                   Por favor escolha um arquivo.
              </Dialog>

                <div style={{display: 'inline-grid', width: '15em'}} >
                  <RaisedButton containerElement='label' backgroundColor='#337AB7' labelColor='#fff' style={{left: 0, position: 'sticky'}} label="Escolha o arquivo">
                    <input type="file" className='btnInputFile' onChange={this.handleFile} />
                  </RaisedButton>
                </div>
                <div className='group-button-documento'>
                  <RaisedButton onClick={this.onSubmit} label="Enviar" backgroundColor='#5CB85C' labelColor='#fff' />
                  <RaisedButton label="Cancelar" onClick={this.handleModal.bind(this)} style={{marginLeft: '1em'}} backgroundColor='#fff' labelColor='#000'/>
                </div>
              </div>
          </ReactModal>
    }

    contentModal() {
      switch(this.state.modalType) {
        case 'create': 
            return this.form()
      }
    }

    render() {
      let documentos = this.props.documento.data;
        return (
            <Page >
              <RaisedButton onClick={this.handleModal.bind(this, 'create')} containerElement='label' backgroundColor='#337AB7' labelColor='#fff' style={{left: 0, position: 'sticky'}} label="Novo"/>
                  {this.contentModal()}
                <Paper zDepth={2} style={{marginTop: '2em', width: '100%'}}>
                  <GooglePicker clientId={CLIENT_ID}
                        developerKey={DEVELOPER_KEY}
                        scope={SCOPE}
                        onChange={data => console.log('on change:', data)}
                        multiselect={true}
                        navHidden={false}
                        authImmediate={false}
                        viewId={'FOLDERS'}
                        createPicker={ (google, oauthToken) => {
                            const googleViewId = google.picker.ViewId.FOLDERS;
                            const docsView = new google.picker.DocsView(googleViewId)
                                .setIncludeFolders(true)
                                .setSelectFolderEnabled(true)
                                .setMimeTypes('application/vnd.google-apps.folder');
                            
                            const uploadView = new google.picker.DocsUploadView();
                            const picker = new google.picker.PickerBuilder()
                                .addView(docsView)
                                .addView(google.picker.ViewId.DOCUMENTS)
                                .addView(google.picker.ViewId.DOCS)
                                .addView(google.picker.ViewId.PDFS)
                                .addView(uploadView)
                                .enableFeature(google.picker.Feature.MULTISELECT_ENABLED)
                                .setOAuthToken(oauthToken)
                                .setDeveloperKey(DEVELOPER_KEY)
                                .setCallback(()=>{
                                  console.log('Custom picker is ready!');
                                });

                            picker.build().setVisible(true);
                        }}>
                      <span>Click to build a picker which shows folders and you can select folders</span>
                  </GooglePicker>
                      <div className="google"></div>
                </Paper>
            </Page>
        )
    }
}

function mapStateToProps (state) {
    return {
      documento: state.documento
   }
}

export default connect(mapStateToProps, { addDocumento, fetchDocumento, downDocumento })(Documento);