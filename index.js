const express = require('express');
const db = require('./src/utils/database/db');
const carsRoutes = require('./src/api/cars/car.routes');
const ferrarisRoutes = require('./src/api/ferrari/ferrari.routes');
/* const cinemasRoutes = require('./src/api/cinemas/cinema.routes'); */
const indexRoutes = require('./src/api/index/index.routes');
const usersRoutes = require('./src/api/users/user.routes');
require('dotenv').config();
const cors = require('cors');
const cloudinary = require('cloudinary').v2;

db.connectDb();

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET,
});

const server = express();
const PORT = process.env.PORT;


//* Para convertirlo a json en la peticion POST
server.use(express.json());
server.use(express.urlencoded({ extended: false }));


//* Restringir
server.use(cors({
    origin: "*",
    credentials: true
}));

server.use('/', indexRoutes);
server.use('/cars', carsRoutes);
server.use('/ferrari', ferrarisRoutes);
server.use('/users', usersRoutes);


//* Controlador de errores
server.use('*', (req, res) => {
    const error = new Error('Ruta no encontrada! 404 Not Found');
    error.status = 404;
    return res.status(error.status).json(error.message);
});


server.use((error, req, res, next) => {
	return res.status(error.status || 500).json(error.message || 'Unexpected error');
});


//* Iniciamos el servidor
server.listen(PORT, () => {
    console.log(`Servidor encendido http://localhost:${PORT}`);
});


/* npm i cloudinary
npm i multer  
npm i multer-storage-cloudinary   */