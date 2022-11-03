const express = require('express');
const bcrypt = require('bcrypt');
const User = require('./user.model');
const { generateSign } = require('../../utils/jwt/jwt');
const router = express.Router();



router.get('/', async (req, res) => {
    try {
        const allUser = await User.find();
        return res.status(200).json(allUser);
    } catch (error) {
        return res.status(500).json("Error al leer el usuario");
    }
});

router.post('/create', async (req, res, next) => {
    try {
        const user = req.body;
        const newUser = new User(user);
        const created = await newUser.save();
        return res.status(201).json({message: 'Se ha creado correctamente', created});
    } catch (error) {
        return next(error)
    }
});

//* LOGIN

router.post('/login', async (req, res) => {
    try {
        const userDB = await User.findOne({email: req.body.email}).lean();
        if (!userDB) {
            return res.status(404).json("Usuario no encontrado")
        };
        if (bcrypt.compareSync(req.body.password, userDB.password)) {
            const token = generateSign(userDB._id, userDB.email);
            return res.status(200).json({token, userDB});
        } else {
            return res.status(500).json("La contraseña no es correcta");
        } 
    } catch (error) {
        return res.status(500).json("Error al loguear");
    }
});


//* log out

router.post('/logout', async (req, res) => {
    try {
        const token = null;
        return res.status(200).json(token)
    } catch (error) {
        return res.status(500).json(error)
    }
});


module.exports = router;


