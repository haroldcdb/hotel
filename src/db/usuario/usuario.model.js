'use strict';

let mongoose = require('mongoose');

let userSchema = new mongoose.Schema({

    identificacion: { type: String, required: true, unique: true },
    nombre: { type: String, required: true },
    apellidos: { type: String },
    correo: { type: String, required: true, unique: true },
    contrasena: { type: String, required: true },
    fechaNacimiento: { type: String },
    genero: { type: String },
    foto: { type: String, required: true },
    provincia: { type: String, required: true },
    canton: { type: String, required: true },
    distrito: { type: String, required: true },
    direccion: { type: String, required: true },
    lat: { type: String, required: true },
    lng: { type: String, required: true },
    listaTelefonos: [
        { telefono: { type: String } }
    ],
    tipoUsuario: { type: String, required: true },
    estado: { type: String, required: true },
    listaPermisos: [
        { permiso: { type: String, required: true } }
    ],
    hoteles: [
        { cedulaJuridica: { type: String } }
    ]
});

module.exports = mongoose.model('Usuario', userSchema, 'usuarios');