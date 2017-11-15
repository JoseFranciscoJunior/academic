import React, { Component } from 'react';
import Paper from 'material-ui/Paper';
import MenuItem from 'material-ui/MenuItem';
import RaisedButton from 'material-ui/RaisedButton';
import { Link } from 'react-router-dom'
import Divider from 'material-ui/Divider';

import './page.css';

export default class Page extends Component {

    constructor(props) {
        super(props);
    }

    render() {

        return(
        <div className='page'>
            <div style={{width: '15%', zIndex: 1}}>
                <Paper className='sidebar'>
                <div style={{padding: '1em'}}>
                    <img width = '100%' src='./../../../assets/img/logo_white.png'/>
                </div>
                <Divider style={{height: '3px'}}/>
                <div style={{paddingTop: '3em'}}>
                    <MenuItem className='opMenu'> Atividades </MenuItem>
                    <MenuItem containerElement={<Link to="/pessoa" />} className='opMenu'>Pessoas</MenuItem>
                    <MenuItem containerElement={<Link to="/pessoa" />} className='opMenu'> Diretório Acadêmico</MenuItem>
                    <MenuItem containerElement={<Link to="/documento" />} className='opMenu'> Documentos </MenuItem>
                </div>
                </Paper>
            </div>
            
            <div className='appBar'>
                <h3 className='title'>  {this.props.title} </h3>
            </div>
            <div className='content'>                
                {this.props.children}
            </div>
        </div>
        )
    }
}