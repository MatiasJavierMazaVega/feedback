//En este archivo utilizamos la modularización de archivos
//librerías
const express = require('express');
require('dotenv').config();
require('./conexion/conecction')
const PORT = process.env.PORT || 8080;
const userRoutes = require('./routes/userRoutes');
const productRoutes = require('./routes/productRoutes');
const app = express();
const hbs = require('hbs');
const path = require('path');


//middelwares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//configuramos el motor de plantillas de HBS
app.set('view engine', 'hbs');
//configuramos la ubicacion de las plantillas
app.set('views', path.join(__dirname, 'views'));
//configuramos los parciales de los motores de plantillas
hbs.registerPartials(path.join(__dirname, 'views/partials'));


//rutas
app.use('/', userRoutes);
app.use('/productos', productRoutes);


//escucha de la app
app.listen(PORT, () => {
    console.log(`Servidor modularizado corriendo en el Puerto ${PORT}`);
});












