const User = require('../api/users/user.model');
const {verifyJwt} = require('../utils/jwt/jwt');

const isAuth = async (req, res, next) => {
    try {
        const token = req.headers.authorization;
    if (!token) {
        return next ("No autorizado");
    }
    const parsedToken = token.replace("Bearer ", ""); //* bearer siempre con espacio 
    const validToken = verifyJwt(parsedToken);
    const userLogued = await  User.findById(validToken.id);
    userLogued.password = null;
    req.user = userLogued
    next()
    } catch (error) {
        return next("No puedes pasar")
    }
    
};

module.exports = {isAuth}



