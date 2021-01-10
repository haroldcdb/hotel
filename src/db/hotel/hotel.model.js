'use strict';

let mongoose = require('mongoose');

let hotelSchema = new mongoose.Schema({

    nombre: { type: String, required: true },
    cedulaJuridica: { type: String, required: true, unique: true },
    correo: { type: String, required: true, unique: true },
    cadenaHotel: { type: String },
    imagenes: [
        { src: { type: String, required: true } }
    ],
    resena: { type: String, required: true },
    listaTipoMoneda: [
        { moneda : { type: String, required: true } }
    ],
    calificacionInternacional: { type: Number, required: true },
    calificacionUsuario: [
        { calificacion: { type: Number } }
    ],
    comision: { type: Number, required: true },
    provincia: { type: String, required: true },
    canton: { type: String, required: true },
    distrito: { type: String, required: true },
    direccion: { type: String, required: true },
    lat: { type: Number, required: true },
    lng: { type: Number, required: true },
    categoria: { type: String, required: true },
    listaEtiquetas: [
        { etiqueta: { type: String } }
    ],
    listaTelefonos: [
        { telefono: { type: String, required: true } }
    ],
    estado: { type: String, required: true }
});

module.exports = mongoose.model('Hotel', hotelSchema, 'hoteles');