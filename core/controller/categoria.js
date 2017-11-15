var Categoria = require('../models').categoria;

module.exports = {
    cadastro: function(req, res){
        Categoria.create({nome: req.body.nome, dt_cadastro : new Date()})
            .then(function (categoria) {
                res.status(200).json(categoria)
            });
    },

    getAll: function(req, res){
        Categoria.findAll({ })
            .then(function(categoria) {
                res.status(200).json(categoria)
            });
    }
}