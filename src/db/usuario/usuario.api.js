'use strict';

let usuarioModel = require('./usuario.model');
let url = require('url');

module.exports.registrar_usuario = function(req, res) {

    //Se extraen los parámetros que vienen en el URL para ser convertidos en un Objeto JSON
    let params_obj = url.parse(req.url, true).query;

    let nuevoUsuario = new usuarioModel({
        identificacion: req.body.identificacion,
        nombre: req.body.nombre,
        apellidos: req.body.apellidos,
        correo: req.body.correo,
        contrasena: req.body.contrasena,
        fechaNacimiento: req.body.fechaNacimiento,
        genero: req.body.genero,
        foto: req.body.foto,
        provincia: req.body.provincia,
        canton: req.body.canton,
        distrito: req.body.distrito,
        direccion: req.body.direccion,
        lat: req.body.lat,
        lng: req.body.lng,
        listaTelefonos: req.body.listaTelefonos,
        tipoUsuario: req.body.tipoUsuario,
        estado: req.body.estado,
        listaPerimisos: req.body.listaPerimisos
    });

    nuevoUsuario.save(function(error) {
        if (error) {
            res.json({ 
                estado: false, 
                msj: 'No se pudo registrar el usuario, ocurrió el siguiente error: \n' + error 
            });
        } else {
            res.json({ 
                estado: true, 
                msj: 'El usuario se registró con éxito'
            });
        }
    });
};

module.exports.iniciar_sesion = function(req, res) {

    //Se extraen los parámetros que vienen en le URL para ser convertidos en un Objeto JSON
    // let params_obj = url.parse(req.url, true).query;

    usuarioModel.findOne({ correo: req.body.correo }).then(
        function(usuario) {
            if (usuario) {
                if (usuario.contrasena == req.body.contrasena) {
                    res.json({
                        usuario: usuario,
                        msj: "Bienvenido",
                    });
                } else {
                    res.json({
                        error: "contrasena",
                        msj: "La contraseña no coincide"
                    });
                }
            } else {
                res.json({
                    error: "correo",
                    msj: "La cuenta a la que intenta ingresar no existe"
                });
            }
        }
    )
};

module.exports.obtener_usuarios = function(req, res) {
    usuarioModel.find().sort({ correo: 'asc' }).then(
        function(usuarios) {
            if (usuarios) {
                res.json({
                    estado: true,
                    usuarios: usuarios
                });
            } else {
                res.json({
                    estado: false,
                    msj: "No hay usuarios registrados"
                }); 
            }
        }
    )
};