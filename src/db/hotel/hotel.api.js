'use strict';

let hotelModel = require('./hotel.model');

module.exports.registrar_hotel = function (req, res) {

    let nuevoHotel = new hotelModel({
        nombre: req.body.nombre,
        cedulaJuridica: req.body.cedulaJuridica,
        correo: req.body.correo,
        cadenaHotel: req.body.cadenaHotel,
        imagenes: req.body.imagenes,
        resena: req.body.resena,
        listaTipoMoneda: req.body.listaTipoMoneda,
        calificacionInternacional: req.body.calificacionInternacional,
        calificacionUsuario: { calificacion: 0 },
        comision: 0,
        provincia: req.body.provincia,
        canton: req.body.canton,
        distrito: req.body.distrito,
        direccion: req.body.direccion,
        lat: req.body.lat,
        lng: req.body.lng,
        categoria: req.body.categoria,
        listaEtiquetas: req.body.listaEtiquetas,
        listaTelefonos: req.body.listaTelefonos,
        estado: req.body.estado,
    });

    nuevoHotel.save(function (error) {
        if (error) {
            res.json({
                estado: false,
                msj: 'No se pudo registrar el hotel, ocurrió el siguiente error ' + error
            });
        } else {
            res.json({
                estado: true,
                msj: 'El hotel se registró con éxito'
            });
        }
    });
};

module.exports.obtener_hotel = function (req, res) {

    hotelModel.findOne({ cedulaJuridica: req.body.cedulaJuridica }).then(
        function (hotel) {
            if (hotel) {
                res.json({
                    estado: true,
                    hotel: hotel
                });
            } else {
                res.json({
                    estado: false,
                    msj: "El hotel al que intenta acceder no existe"
                });
            }
        }
    )
};

module.exports.obtener_hoteles = function (req, res) {
    hotelModel.find().sort({ nombre: 'asc' }).then(
        function (hoteles) {
            if (hoteles) {
                res.json({
                    estado: true,
                    hoteles: hoteles
                });
            } else {
                res.json({
                    estado: false,
                    msj: "No hay hoteles registrados"
                }); 
            }
        }
    )
};