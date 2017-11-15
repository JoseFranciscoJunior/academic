var Funcao = require('../models').funcao;

module.exports = {
  getAll: function(req, res) {
    return Funcao.findAll().then(data => {res.json(data)});
  }
}