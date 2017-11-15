var DiretorioAcademico = require('../models').diretorioAcademico;
var models = require('../models');

var fs = require('fs');

module.exports= {
    create: async function (req, res) {
        var diretorio;
        await DiretorioAcademico.create(req.body).then((data) => {diretorio = data; res.status(200).json(data)})
        
        fs.mkdirSync(`./diretorios/${diretorio.id}/logo`);
        return diretorio;
    },

    getAll: function(req, res) {
        console.log('Aqui');
       return DiretorioAcademico.findAll({include: [{all: true},{model: models.cursoFaculdade, as: 'cursofaculdade'}]}).then((DA) =>{res.json(DA)})
    }
}