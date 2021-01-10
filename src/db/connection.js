let express = require('express');
let mongoose = require('mongoose');
let path = require('path');
let bodyParser = require("body-parser");
const port = 4000;

const app = express();

app.use(express.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(express.static(path.join(__dirname, '../views')));

mongoose.connect('mongodb+srv://haroldcdb:23012001@hotel-if7vr.mongodb.net/hotel?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

// Routes import
const usuario = require('./usuario/usuario.route');
const hotel = require('./hotel/hotel.route');

// Route access
app.use('/api', usuario);
app.use('/api', hotel);

// Port listening
app.listen(port, function() {
    console.log('Servidor corriendo en el puerto ' + port)
});

module.exports = app;