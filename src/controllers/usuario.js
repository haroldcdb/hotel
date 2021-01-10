import { _ } from 'core-js';

// Se requiere módulo de NodeJS query-string 
// const queryString = require('query-string');
// let params = queryString.stringify({ correo: _correo, contrasena: _contrasena });
// url: 'http://localhost:4000/api/get_user?${params}',

export default {
    registrarUsuario: function (_identificacion, _nombre, _apellidos, _correo, _contrasena, _fechaNacimiento, _genero, _foto,
        _provincia, _canton, _distrito, _direccion, _lat, _lng, _listaTelefonos, _tipoUsuario, _estado, _listaPermisos) {
        let respuesta = {};
        $.ajax({
            url: 'http://localhost:4000/api/registrar_usuario',
            type: 'POST',
            contentType: 'application/x-www-form-urlencoded; charset=utf-8',
            dataType: 'json',
            async: false,
            data: {
                identificacion: _identificacion,
                nombre: _nombre,
                apellidos: _apellidos,
                correo: _correo,
                contrasena: _contrasena,
                fechaNacimiento: _fechaNacimiento,
                genero: _genero,
                foto: _foto,
                provincia: _provincia,
                canton: _canton,
                distrito: _distrito,
                direccion: _direccion,
                lat: _lat,
                lng: _lng,
                listaTelefonos: _listaTelefonos,
                tipoUsuario: _tipoUsuario,
                estado: _estado,
                listaPermisos: _listaPermisos
            }
        }).done(function (response) {
            respuesta = response;
        }).fail(function (response) {
            respuesta = response;
        });
        
        return respuesta;
    },
    
    iniciarSesion: function (_correo, _contrasena) {
        let usuario = {};
        
        $.ajax({
            url: 'http://localhost:4000/api/iniciar_sesion',
            type: 'POST',
            contentType: "application/x-www-form-urlencoded; charset=UTF-8",
            dataType: 'json',
            data: { correo: _correo, contrasena: _contrasena },
            async: false
        }).done(function (response) {
            if (response.usuario) {
                localStorage.setItem("usuarioEnLinea", JSON.stringify(response.usuario));
            }
            usuario = response;
        }).fail(function() {
            console.log("Hubo un error");
        });

        return usuario;
    },

    obtenerUsuarios: function () {
        let usuarios = [];

        $.ajax({
            url: 'http://localhost:4000/api/obtener_usuarios',
            type: 'GET',
            contentType: 'application/x-www-form-urlencoded; charset=utf-8',
            dataType: 'json',
            async: false
        }).done(function (response) {
            usuarios = response;
        }).fail(function() {
            console.log("Hubo un error");
        });

        return usuarios;

    }

}