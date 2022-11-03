const express = require('express')
const Ferrari = require('./ferrari.model');
require('dotenv').config();
/* const upload = require('../../middlewares/file'); */
const router = express.Router();


//* Devuelve todas las peliculas
router.get('/', async (req, res, next) => {
    try {
        const allFerraris = await Ferrari.find();
        return res.status(200).json(allFerraris);
    } catch (error) {
        return next(error);
    }
});

router.get('/name/:name', async (req, res, next) => {
    try {
        const name = req.params.name;
        const ferrariToFind = await Ferrari.find({name: name});
        return res.status(200).json(ferrariToFind);
    } catch (error) {
        return next(error);
    }
});

module.exports = router;