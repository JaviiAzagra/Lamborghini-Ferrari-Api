const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const Schema = mongoose.Schema;

const userSchema = new Schema(
    {
        email: {type: String, required: true, unique: true, trim: true},
        password: {type: String, required: true, trim: true},
        edad: {type: Number, required: true, trim: true},
        firstName: {type: String, required: true, trim: true},
        lastName: {type: String, required: true, trim: true},
        photo: {type: String, required: false},
    },
    {
        timestamps: true,
    },
);

//* encriptar contraseña

userSchema.pre("save", function (next) {
    this.password = bcrypt.hashSync(this.password, 10);
    next();
});


const User = mongoose.model('users', userSchema);

module.exports = User;