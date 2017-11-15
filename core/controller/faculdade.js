var Faculdade = require('../models').faculdade;
var models = require('../models');

module.exports= {
    getAll: function(req, res) {
       return Faculdade.findAll({include:[{all:true}, {model: models.curso, as: 'cursos'}]})
                        .then(data => {res.status(200).send(data)})
                        .catch(e => { console.log(e); res.status(400).send(e)});
    }
}