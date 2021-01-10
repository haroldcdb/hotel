'use strict';

let express = require('express');
let router = express.Router();
let hotelApi = require('./hotel.api');

router.route('/registrar_hotel').post(function(req, res) {
    res.header("Access-Control-Allow-Origin", "*");
    hotelApi.registrar_hotel(req, res);
});

router.route('/obtener_hotel').post(function(req, res) {
    res.header("Access-Control-Allow-Origin", "*");
    hotelApi.obtener_hotel(req, res);
});

router.route('/obtener_hoteles').get(function(req, res) {
    res.header("Access-Control-Allow-Origin", "*");
    hotelApi.obtener_hoteles(req, res);
});


module.exports = router;