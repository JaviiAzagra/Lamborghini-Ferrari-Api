const express = require('express')
const Car = require('./car.model');
require('dotenv').config();
const upload = require('../../middlewares/file');
const { isAuth } = require('../../middlewares/auth');
const router = express.Router();
const deleteFile = require("../../middlewares/deletefile");


//* Devuelve todas las peliculas
router.get('/', async (req, res, next) => {
    try {
        const allCars = await Car.find();
        return res.status(200).json(allCars);
    } catch (error) {
        return next(error);
    }
});


//* Devuelve las peliculas buscando por su ID
router.get('/:id', async (req, res, next) => {
    try {
        const id = req.params.id;
        const carToFind = await Car.findById(id);
        return res.status(200).json(carToFind);
    } catch (error) {
        return next(error);
    }
});

//* Devuelve las peliculas buscando por el modelo
router.get('/model/:model', async (req, res, next) => {
    try {
        const model = req.params.model;
        const carToFind = await Car.find({model: model});
        return res.status(200).json(carToFind);
    } catch (error) {
        return next(error);
    }
});

router.get('/name/:name', async (req, res, next) => {
    try {
        const name = req.params.name;
        const carToFind = await Car.find({name: name});
        return res.status(200).json(carToFind);
    } catch (error) {
        return next(error);
    }
});



//* Devuelve los coches cuyos caballos sean mayores a los que tu le indiques
router.get('/power_cv/:power_cv', async (req, res, next) => {
    try {
        const power_cv = req.params.power_cv;
        const carToFind = await Car.find({power_cv: {$gte: power_cv}});
        return res.status(200).json(carToFind);
    } catch (error) {
        return next(error);
    }
});

//* POST PUT DELETE

//* Campo del modelo donde la va la imagen en este caso img
router.post('/create', upload.single('img'), async (req, res, next) => {
    try {
        const car = req.body;
        if (req.file){
            car.img = req.file.path;
        }
        const newCar = new Car(car);
        const created = await newCar.save();
        return res.status(201).json({message: 'Se ha creado correctamente', created});
    } catch (error) {
        return next(error)
    }
});
 
router.put('/edit/:id', upload.single("img"), async (req, res, next) => {
    try {
        const id = req.params.id;
        const car = req.body;
        const oldCar = await Car.findById(id);
        if (req.file) {
            if (oldCar.img) {
            deleteFile(oldCar.img);
            }
        car.img = req.file.path;
        }
        const carModify = new Car(car);
        carModify._id = id;
        const carUpdated = await Car.findByIdAndUpdate(id, carModify);
        return res.status(201).json({message: 'Editado correctamente', carUpdated});
    } catch (error) {
        return next(error);
    }
});

router.delete('/delete/:id', async (req, res, next) => {
    try {
      const id = req.params.id;
      const carToDelete = await Car.findByIdAndDelete(id);
      return res.status(201).json({message: 'Eliminado correctamente', carToDelete});  
    } catch (error) {
        return next(error)
    }
});


module.exports = router;
