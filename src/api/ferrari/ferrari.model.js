const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const ferrariSchema = new Schema(
    {
        model: {type: String, required: true, enum: ["Roma", "296", "sf90", "F8", "Portofino", "812", "limited series"]},
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

//* Creamos la coleccion llamada ferraris
const Ferrari = mongoose.model('ferraris', ferrariSchema);

module.exports = Ferrari;