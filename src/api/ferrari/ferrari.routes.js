const express = require('express');
const upload = require('../../middlewares/file');
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

router.get('/:id', async (req, res, next) => {
    try {
        const id = req.params.id;
        const ferrariToFind = await Ferrari.findById(id);
        return res.status(200).json(ferrariToFind);
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

router.post('/create', upload.single('img'), async (req, res, next) => {
    try {
        const ferrari = req.body;
        if (req.file){
            ferrari.img = req.file.path;
        }
        const newFerrari = new Ferrari(ferrari);
        const created = await newFerrari.save();
        return res.status(201).json({message: 'Se ha creado correctamente', created});
    } catch (error) {
        return next(error)
    }
});

router.put('/edit/:id', upload.single("img"), async (req, res, next) => {
    try {
        const id = req.params.id;
        const ferrari = req.body;
        const oldFerrari = await Ferrari.findById(id);
        if (req.file) {
            if (oldFerrari.img) {
            deleteFile(oldFerrari.img);
            }
        ferrari.img = req.file.path;
        }
        const ferrariModify = new Ferrari(ferrari);
        ferrariModify._id = id;
        const ferrariUpdated = await Ferrari.findByIdAndUpdate(id, ferrariModify);
        return res.status(201).json({message: 'Editado correctamente', ferrariUpdated});
    } catch (error) {
        return next(error);
    }
});

router.delete('/delete/:id', async (req, res, next) => {
    try {
      const id = req.params.id;
      const ferrariToDelete = await Ferrari.findByIdAndDelete(id);
      return res.status(201).json({message: 'Eliminado correctamente', ferrariToDelete});  
    } catch (error) {
        return next(error)
    }
});
 

module.exports = router;
