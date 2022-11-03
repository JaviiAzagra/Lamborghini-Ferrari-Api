const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const carSchema = new Schema(
    {
        model: {type: String, required: true, enum: ["aventador", "huracan", "urus", "diablo", "gallardo", "murcielago", "limited series"]},
        name: {type: String, required: true},
        price: {type: String, required: true},
        power_cv: {type: Number, required: true},
        max_speed: {type: String, required: true},
        img: {type: String}
    },
    {
        timestamps: true,
    },
);

//* Creamos la coleccion llamada cars
const Car = mongoose.model('cars', carSchema);

module.exports = Car;