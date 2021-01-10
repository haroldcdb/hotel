import { _ } from 'core-js';

export default {
    registrarHotel: function (_nombre, _cedulaJuridica, _correo, _cadenaHotel, _imagenes, _resena, _listaTipoMoneda, _calificacionInternacional, _provincia, _canton, _distrito,
        _direccion, _lat, _lng, _categoria, _listaEtiquetas, _listaTelefonos) {
        let respuesta = {};
        $.ajax({
            url: 'http://localhost:4000/api/registrar_hotel',
            type: 'POST',
            contentType: 'application/x-www-form-urlencoded; charset=utf-8',
            dataType: 'json',
            async: false,
            data: {
                nombre: _nombre,
                cedulaJuridica: _cedulaJuridica,
                correo: _correo,
                cadenaHotel: _cadenaHotel,
                imagenes: _imagenes,
                resena: _resena,
                listaTipoMoneda: _listaTipoMoneda,
                calificacionInternacional: _calificacionInternacional,
                provincia: _provincia,
                canton: _canton,
                distrito: _distrito,
                direccion: _direccion,
                lat: _lat, 
                lng: _lng,
                categoria: _categoria,
                listaEtiquetas: _listaEtiquetas,
                listaTelefonos: _listaTelefonos,
                estado: "pendiente"
            }
        }).done(function (response) {
            respuesta = response;
        }).fail(function (response) {
            respuesta = response;
        });

        return respuesta;
    },

    obtenerHotel: function (_cedulaJuridica) {
        let hotel = {};

        $.ajax({
            url: 'http://localhost:4000/api/obtener_hotel',
            type: 'POST',
            contentType: "application/x-www-form-urlencoded; charset=UTF-8",
            dataType: 'json',
            data: { cedulaJuridica: _cedulaJuridica },
            async: false
        }).done(function (response) {
            hotel = response;
        }).fail(function () {
            console.log("Hubo un error");
        });;

        return hotel;
    },

    obtenerHoteles: function () {
        let hoteles = [];

        $.ajax({
            url: 'http://localhost:4000/api/obtener_hoteles',
            type: 'GET',
            contentType: 'application/x-www-form-urlencoded; charset=utf-8',
            dataType: 'json',
            async: false
        }).done(function (res) {
            hoteles = res;
        }).fail(function () {
            console.log("Hubo un error");
        });

        return hoteles;
    },

}