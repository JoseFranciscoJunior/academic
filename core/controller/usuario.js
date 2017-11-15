var Usuario = require('../models').usuario;
var models = require('../models');
var jwt = require('jwt-simple');
var auth = require('./../auth/auth');
var cfg = require('./../config/secret.js');

module.exports= {
    login: async function(req, res) {
        var user;
        await Usuario.findOne({where: {email: req.body.email, senha: req.body.senha}}).then(data => {user = data});
        if(user) {
            var payload = {id: user.id};
            var token = jwt.encode(payload, cfg.jwtSecret);
            res.json({user:user, token: token});
        } else {

        }
    },
    
    create: async function(req, res) {
        await Usuario.create(req.body).then((user) => user).catch((error) => {res.json(error)});
        Usuario.findAll({where: {fk_id_diretorio: req.body.fk_id_diretorio, status: true}, include: [{all: true},{model: models.funcao, as: 'funcoes'}]}).then((users) => res.json(users))
    },

    getAll: function(req, res) {
        Usuario.findAll({where: {fk_id_diretorio: req.params.diretorio, status: true}, include: [{all: true},{model: models.funcao, as: 'funcoes'}]}).then((user) =>{res.json(user)})
    },

    update: async function(req, res) {
        await Usuario.update(req.body, {where: {id: req.params.id}}).then((user) => {user}).catch((error) => {res.json(error)});
        Usuario.findAll({where: {fk_id_diretorio: req.body.fk_id_diretorio, status: true}, include: [{all: true},{model: models.funcao, as: 'funcoes'}]}).then((users) => res.json(users))
    },

    delete: async function(req, res) {
        var user;
        await Usuario.findOne({where: {id: req.params.id}}).then((data) => {user = data});
        await Usuario.update({status: false}, {where: {id: req.params.id}}).then((user) => {user}).catch((error) => {res.json(error)});
        Usuario.findAll({where: {fk_id_diretorio: user.fk_id_diretorio, status: true}, include: [{all: true},{model: models.funcao, as: 'funcoes'}]}).then((users) => res.json(users))
    },
}