const express = require('express');
const bcrypt = require('bcrypt');
const User = require('./user.model');
const { generateSign } = require('../../utils/jwt/jwt');
const { isAdmin, isAuth } = require('../../middlewares/auth');
const router = express.Router();
const upload = require("../../middlewares/file");


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

router.delete("/delete/:id", [isAdmin], async (req, res, next) =>  {
    try {
      const id = req.params.id;
      const userToDelete = await User.findByIdAndDelete(id);
      deleteFile(userToDelete.photo);
      return res.status(200).json({message: "The user has been deleted succesfully", userDeleted: userToDelete});
    } catch (error) {
     next(error);
    }
  });

router.put("/edit/:id", [isAuth], upload.single("photo"), async (req, res, next) => {
    try {
      const id = req.params.id
      const user = req.body;
      const userOld = await User.findById(id);
      if (req.file) {
        if (userOld.photo) {
          deleteFile(userOld.photo);
        }
        user.photo = req.file.path;
      }
      const userModify = new User(user);
      userModify._id = id;
      const userUpdated = await User.findByIdAndUpdate(id, userModify);
      return res.status(200).json({message: "The user has been updated succesfully", userModified: userUpdated});
    } catch (error) {
      next(error)
    }
});

router.post("/checksession", [isAuth], async (req, res, next) => {
  console.log(req.headers.authorization);
  try {
    const getUser = await User.findById(req.user._id);
    return res.status(200).json(getUser);
  } catch (error) {
    return res.status(500).json(error);
  }
});

module.exports = router;


