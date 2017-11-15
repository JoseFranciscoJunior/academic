var jwt = require('jwt-simple');
var moment = require('moment');
var cfg = require('./config/secret');

module.exports =  {
   check(req, res, next) {
     console.log(req.headers);
    let token = req.headers['x-access-token'];
    if(token) {
      try {
        let decode = jwt.decode(token, cfg.jwtSecret);
        if(decode.exp <= moment().valueOf()) {
          res.status(400).send('Acesso Expirado.')
        } else {
          if(req.url.indexOf('/') >= 0 ) {
            req.user = decode.iss;
            return next();
          } else {
            return res.status(403).send('Não Autorizado');
          }
        }
      } catch (error) {
        return res.status(401).send('token inválido');
      }
    } else {
      res.status(401).send('Token não encontrado ou informado');
    }
  }
}