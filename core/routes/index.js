var express = require('express');
var router = express.Router();
var controllers = require('../controller');
const multer = require('multer');

/* GET home page. */
router.post('/login', controllers.usuario.login);
router.post('/api/pessoa/create', controllers.usuario.create);
router.get('/api/pessoa/:diretorio', controllers.usuario.getAll);
router.put('/api/pessoa/update/:id', controllers.usuario.update);
router.delete('/api/pessoa/delete/:id', controllers.usuario.delete);
router.post('/api/diretorioAcademico', controllers.diretorioAcademicoController.create);
router.get('/api/diretorioAcademico', controllers.diretorioAcademicoController.getAll);
router.get('/api/faculdade', controllers.faculdade.getAll);
router.get('/api/funcao', controllers.funcao.getAll);
// router.post('/api/documento/create', controllers.documento.create);
// router.get('/api/documento', controllers.documento.getAll);
// router.post('/api/documento/downloadFile', controllers.documento.downloadFile);

module.exports = router;
