'use strict';

let express = require('express');
let router = express.Router();
let usuarioApi = require('./usuario.api');

router.route('/registrar_usuario').post(function(req, res) {
    res.header("Access-Control-Allow-Origin", "*");
    usuarioApi.registrar_usuario(req, res);
});

router.route('/iniciar_sesion').post(function(req, res) {
    res.header("Access-Control-Allow-Origin", "*");
    usuarioApi.iniciar_sesion(req, res);
});

router.route('/obtner_usuarios').get(function(req, res) {
    res.header("Access-Control-Allow-Origin", "*");
    usuarioApi.obtener_usuarios(req, res);
});


module.exports = router;